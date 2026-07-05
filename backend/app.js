const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const sanitizeMiddleware = require('./utils/sanitizeMiddleware');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const allUsersRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const productRouter = require('./routes/productRoutes');
const customerRouter = require('./routes/customerRoutes');

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS — must be before body parser so preflight OPTIONS requests are handled
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  }),
);

// Morgan logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again in 5 minutes.',
});
app.use('/api', limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Sanitize req.body against XSS and NoSQL injection
// (express-mongo-sanitize and hpp are not compatible with Express 5 — replaced below)
app.use(sanitizeMiddleware);

// Serve product images and other static assets
app.use(express.static(path.join(__dirname, 'public')));

// Timestamp middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/auth', allUsersRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/customer', customerRouter);

app.all('/{*path}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
