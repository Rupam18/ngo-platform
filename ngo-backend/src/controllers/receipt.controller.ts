import { Request, Response } from "express";
import { createManualReceiptService } from "../services/receipt.service";

export const createManualReceipt = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await createManualReceiptService(req.body);

        res.status(201).json({
            success: true,
            message: "Manual receipt generated",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
