import { Request, Response, NextFunction } from "express";
import { generate80GReceiptService } from "../services/taxReceipt.service";
import { prisma } from "../config/prisma";

export const generateTaxReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const donationId = req.params.donationId as string;
        const result = await generate80GReceiptService(donationId);

        res.status(201).json({
            success: true,
            message: "80G Tax Receipt generated successfully",
            data: {
                receiptNumber: result.receiptNumber,
                pdfUrl: result.pdfUrl
            }
        });
    } catch (error: any) {
        next(error);
    }
};

export const getTaxReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const receiptId = req.params.receiptId as string;
        const receipt = await prisma.taxReceipt.findUnique({
            where: { id: receiptId }
        });

        if (!receipt) {
            res.status(404).json({ success: false, message: "Tax receipt not found" });
            return;
        }

        res.status(200).json({
            success: true,
            data: receipt
        });
    } catch (error: any) {
        next(error);
    }
};
