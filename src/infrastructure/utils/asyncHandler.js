// src/infrastructure/utils/asyncHandler.js (Final Production Version)
/**
 * Higher-order function to handle async route handlers
 * Eliminates need for try/catch in controllers
 * Catches both thrown errors and rejected promises
 * @param {Function} requestHandler - async route handler (req, res, next)
 * @returns {Function} Express middleware
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };