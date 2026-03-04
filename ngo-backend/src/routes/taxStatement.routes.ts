import express from "express";
import { getAnnualTaxStatement } from "../controllers/taxStatement.controller";
import { validate } from "../middleware/validate.middleware";
import { getAnnualStatementSchema } from "../validators/taxStatement.validator";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get(
    "/:donorId",
    protect, // Ensure only authorized requests 
    validate(getAnnualStatementSchema),
    getAnnualTaxStatement
);

export default router;
