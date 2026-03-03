"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message || 'Internal Server Error'}`, err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong on the server";
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
