// 404 Not Found Middleware
export function notFound(req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // pass to error handler
  }
  
  // Global Error Handler Middleware
  export function errorHandler(err, req, res, next) {
    console.error("🔥 Error:", err.message);
  
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || "Internal Server Error";
  
    // Prisma specific errors
    if (err.code === "P2002") {
      statusCode = 409;
      message = "Duplicate field value entered (unique constraint failed)";
    }
  
    res.status(statusCode).json({
      error: message,
      // production me stack hatana better hai
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
  