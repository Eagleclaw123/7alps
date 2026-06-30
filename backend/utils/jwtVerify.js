const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError'); // Adjust the path based on your project structure

/**
 * Verifies a JWT and extracts the payload ID.
 * @param {string} token - The JWT to verify.
 * @returns {string} - The extracted ID from the token payload.
 * @throws {AppError} - If the token is invalid or missing required fields.
 */
const verifyTokenAndExtractId = (token) => {
  if (!token) {
    throw new AppError('Authorization token is required.', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      throw new AppError('Invalid token: ID not found in payload.', 401);
    }

    return decoded.id; // Return the ID from the payload
  } catch (err) {
    throw new AppError('Invalid or expired token.', 401);
  }
};

module.exports = { verifyTokenAndExtractId };
