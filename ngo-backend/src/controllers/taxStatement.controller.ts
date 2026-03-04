import { Request, Response, NextFunction } from "express";
import { generateAnnualTaxStatementService } from "../services/taxStatement.service";

export const getAnnualTaxStatement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const donorId = req.params.donorId as string;
        const year = parseInt(req.query.year as string);
        const generatePdf = req.query.pdf === "true"; // Optional PDF generation query flag

        const statement = await generateAnnualTaxStatementService(
            donorId,
            year,
            generatePdf
        );

        res.status(200).json({
            success: true,
            message: "Tax statement retrieved successfully",
            data: statement
        });
    } catch (error: any) {
        if (error.message === 'Donor/User not found') {
            res.status(404).json({ success: false, message: error.message });
            return;
        }
        next(error);
    }
};
