import express from "express";
import { createManualReceipt } from "../controllers/receipt.controller";

const router = express.Router();

router.post("/manual", createManualReceipt);

export default router;
