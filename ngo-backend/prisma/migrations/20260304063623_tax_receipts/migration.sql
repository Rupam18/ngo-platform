-- CreateTable
CREATE TABLE "TaxReceipt" (
    "id" TEXT NOT NULL,
    "receiptNumber" TEXT NOT NULL,
    "donationId" TEXT NOT NULL,
    "donorName" TEXT NOT NULL,
    "donorPAN" TEXT,
    "donorAddress" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "donationDate" TIMESTAMP(3) NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pdfUrl" TEXT NOT NULL,

    CONSTRAINT "TaxReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaxReceipt_receiptNumber_key" ON "TaxReceipt"("receiptNumber");

-- CreateIndex
CREATE UNIQUE INDEX "TaxReceipt_donationId_key" ON "TaxReceipt"("donationId");

-- AddForeignKey
ALTER TABLE "TaxReceipt" ADD CONSTRAINT "TaxReceipt_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
