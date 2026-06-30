const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Signup routes
router.post('/signup/send-otp', authController.signupSendOTP);
router.post('/signup/verify-otp', authController.signupVerifyOTP);
router.post('/signup/resend-otp', authController.signupResendOTP);

// Login route
router.post('/login', authController.login);

// Password reset routes
router.post('/forgotPassword', authController.forgotPassword);
router.post('/verifyOTP', authController.verifyOTP);
router.post('/resetPasswordAfterOTP', authController.resetPasswordAfterOTP);

// Health check
router.get('/health', authController.healthCheck);

router.use(authController.protect);

router.post('/logout', authController.logout);
router.get('/status', authController.getCurrentUserStatus);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePasswordFromProfile,
);
router.patch('/reset-password/:token', authController.resetPassword);

// router.patch(
//   '/updateMyPassword',
//   authController.protect,
//   authController.updatePassword,
// );

// router.patch('/updateMe', authController.protect, userController.updateMe);
// router.delete('/deleteMe', authController.protect, userController.deleteMe);

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

module.exports = router;
