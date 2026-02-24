import { Request, Response, NextFunction } from "express"
import { prisma } from "../config/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler"

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        const error: any = new Error("User already exists")
        error.statusCode = 400
        throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    })
})

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        const error: any = new Error("User not found")
        error.statusCode = 404
        throw error
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        const error: any = new Error("Invalid credentials")
        error.statusCode = 401
        throw error
    }

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    )

    res.json({
        success: true,
        message: "Login successful",
        token
    })
})
