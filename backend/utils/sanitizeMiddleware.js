const sanitizeHtml = require('sanitize-html');

// Strip MongoDB operator keys ($...) from an object recursively
const stripMongoOperators = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) {
      delete obj[key];
    } else {
      obj[key] = stripMongoOperators(obj[key]);
    }
  }
  return obj;
};

// Strip HTML tags from strings recursively
const stripXSS = (data) => {
  if (typeof data === 'string') {
    return sanitizeHtml(data, { allowedTags: [], allowedAttributes: {} });
  }
  if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      data[key] = stripXSS(data[key]);
    }
  }
  return data;
};

// Only sanitize req.body — req.query is read-only in Express 5
const sanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    stripMongoOperators(req.body);
    stripXSS(req.body);
  }
  next();
};

module.exports = sanitizeMiddleware;
