import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`[Error] ${err.message || 'Internal Server Error'}`, err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong on the server";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
