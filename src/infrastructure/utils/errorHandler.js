// src/infrastructure/utils/errorHandler.js
import { ApiError } from "./ApiError.js";

/**
 * Global error handler middleware
 * Ensures consistent JSON error responses
 * Hides stack traces in production
 * Handles custom ApiError and unexpected errors
 */
const errorHandler = (err, req, res, next) => {
  // If headers already sent, delegate to default Express handler
  if (res.headersSent) {
    return next(err);
  }

  // Custom ApiError (thrown in controllers/use cases)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || [],
    });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation Error",
      errors,
    });
  }

  // Duplicate key error (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message: `Duplicate field: ${field}`,
    });
  }

  // Unexpected errors — hide details in production
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  console.error("Unhandled Error:", err); // Log full error for debugging

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    // Only show stack in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export { errorHandler };