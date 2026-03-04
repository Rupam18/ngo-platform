import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Loader2, CheckCircle2 } from "lucide-react";

interface ManualReceiptModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ManualReceiptModal({ open, onOpenChange }: ManualReceiptModalProps) {
    const [donorId, setDonorId] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CASH");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successData, setSuccessData] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!donorId || !amount) {
            setError("Donor ID and Amount are required.");
            return;
        }

        setIsLoading(true);

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const res = await fetch(`${baseUrl}/receipts/manual`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    donorId,
                    amount: Number(amount),
                    paymentMethod
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to generate receipt");
            }

            setSuccessData(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const resetAndClose = () => {
        setDonorId("");
        setAmount("");
        setPaymentMethod("CASH");
        setError("");
        setSuccessData(null);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={open ? undefined : resetAndClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Generate Manual Receipt</DialogTitle>
                    <DialogDescription>
                        Create a one-off 80G receipt for offline or direct bank transfers.
                    </DialogDescription>
                </DialogHeader>

                {!successData ? (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="donorId">Donor ID (UUID)</Label>
                            <Input
                                id="donorId"
                                value={donorId}
                                onChange={(e) => setDonorId(e.target.value)}
                                placeholder="Enter donor UUID..."
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (₹)</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="e.g. 5000"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Payment Method</Label>
                            <Select disabled={isLoading} value={paymentMethod} onValueChange={setPaymentMethod}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CASH">Cash</SelectItem>
                                    <SelectItem value="BANK_TRANSFER">Bank Transfer (NEFT/RTGS)</SelectItem>
                                    <SelectItem value="CHEQUE">Cheque</SelectItem>
                                    <SelectItem value="UPI">UPI Direct</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {error && (
                            <div className="text-sm border border-red-200 bg-red-50 text-red-600 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="pt-2 flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={resetAndClose} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Generate PDF
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="py-6 flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Receipt Generated!</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Receipt <strong>{successData.donation.receiptNumber}</strong> was successfully created.
                            </p>
                        </div>
                        <div className="pt-4 flex gap-3 w-full">
                            <Button variant="outline" className="flex-1" onClick={resetAndClose}>
                                Done
                            </Button>
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                                onClick={() => {
                                    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
                                    const backendUrl = baseUrl.replace('/api', '');
                                    window.open(`${backendUrl}${successData.receiptUrl}`, '_blank');
                                }}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                View PDF
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
