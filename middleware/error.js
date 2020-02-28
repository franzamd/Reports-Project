const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Recurso no encontrado`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = {};

    // Load attributes and value in message
    Object.values(err.errors).map(value => {
      // Check if type Number
      if (value.name === "CastError" && value.kind === "Number") {
        return (message[value.path] = "Solo se acepta números");
      }

      // Check if type Boolean
      if (value.name === "CastError" && value.kind === "Boolean") {
        return (message[value.path] = "Solo se acepta una condición válida");
      }

      return (message[value.path] = value.message);
    });

    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
};

module.exports = errorHandler;
