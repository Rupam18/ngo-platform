import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const validate = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const zodError = error as ZodError<any>;
                const extractedErrors = zodError.issues.map((err: any) => ({
                    field: err.path.join("."),
                    message: err.message,
                }));

                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: extractedErrors,
                });
            } else {
                next(error);
            }
        }
    };
};
