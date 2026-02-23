import express from "express"
import { getDashboardStats } from "../controllers/dashboard.controller"
import { protect } from "../middleware/auth.middleware"
import { adminOnly } from "../middleware/role.middleware"

const router = express.Router()

router.get("/", protect, adminOnly, getDashboardStats)

export default router
