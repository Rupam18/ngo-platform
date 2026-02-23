import express from "express"
import { createOrder, verifyPayment } from "../controllers/donation.controller"
import { protect } from "../middleware/auth.middleware"

const router = express.Router()

router.post("/create-order", protect, createOrder)
router.post("/verify", protect, verifyPayment)

export default router
