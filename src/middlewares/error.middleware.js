const { stack } = require("../app");

function errorMiddleware(err, req, res, next) {
  //console.error(err);
  const statusCode = err.statusCode || 500;

  //In development, we want to see the full error details in the response for easier debugging

  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      //status: err.status || "error",
      stack: err.stack,
      message: err.message || "Internal Server Error",
    });
  }

  // In production, you might want to log the error to an external service instead of the console

  return res.status(statusCode).json({
    success: false,
    message: err.isOperational ? err.message : "Something went wrong",
  });
}

module.exports = errorMiddleware;
