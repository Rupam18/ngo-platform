import { Request, Response, NextFunction } from "express"

export const adminOnly = (req: any, res: Response, next: NextFunction): any => {
    if (req.user && req.user.role === "ADMIN") {
        next()
    } else {
        return res.status(403).json({ message: "Not authorized as an admin" })
    }
}
