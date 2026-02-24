import express from "express"
import { register, login } from "../controllers/auth.controller"
import { loginLimiter } from "../middleware/rateLimit.middleware"

const router = express.Router()

router.post("/register", register)
router.post("/login", loginLimiter, login)

export default router
