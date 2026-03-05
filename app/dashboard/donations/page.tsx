"use client";

import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, RotateCcw, Calendar as CalendarIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Donation {
    id: string;
    donorName: string;
    amount: number;
    campaign: string;
    date: string;
    status: "Success" | "Pending" | "Failed" | "Refunded";
}

const mockDonations: Donation[] = [
    { id: "DON1029", donorName: "Anil Kumar", amount: 5000, campaign: "Education for All", date: "2026-02-21", status: "Success" },
    { id: "DON1028", donorName: "Priya Singh", amount: 1500, campaign: "Disaster Relief Fund", date: "2026-02-20", status: "Success" },
    { id: "DON1027", donorName: "Anonymous", amount: 10000, campaign: "Clean Water Initiative", date: "2026-02-19", status: "Success" },
    { id: "DON1026", donorName: "Rahul Sharma", amount: 2000, campaign: "Medical Camp Setup", date: "2026-02-18", status: "Pending" },
    { id: "DON1025", donorName: "Neha Gupta", amount: 500, campaign: "Education for All", date: "2026-02-18", status: "Failed" },
    { id: "DON1024", donorName: "Vikram Reddy", amount: 25000, campaign: "Disaster Relief Fund", date: "2026-02-15", status: "Refunded" },
];

export default function DonationsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [campaignFilter, setCampaignFilter] = useState("All Campaigns");
    const [date, setDate] = useState<Date | undefined>(undefined);

    const filteredDonations = mockDonations.filter(d => {
        const matchSearch = d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCampaign = campaignFilter === "All Campaigns" || d.campaign === campaignFilter;

        let matchDate = true;
        if (date) {
            const formattedFilterDate = format(date, "yyyy-MM-dd");
            matchDate = d.date === formattedFilterDate;
        }

        return matchSearch && matchCampaign && matchDate;
    });

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Donation Management</h1>
                    <p className="text-gray-500 mt-1">Track, manage, and audit all incoming donations securely.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Download size={16} className="mr-2" />
                    Export CSV
                </Button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                            placeholder="Search by Donor Name or ID..."
                            className="pl-9 bg-gray-50 border-gray-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="text-gray-700 min-w-36 justify-start">
                                    <Filter size={16} className="mr-2" />
                                    {campaignFilter}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setCampaignFilter("All Campaigns")}>All Campaigns</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCampaignFilter("Education for All")}>Education for All</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCampaignFilter("Disaster Relief Fund")}>Disaster Relief Fund</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCampaignFilter("Clean Water Initiative")}>Clean Water Initiative</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex items-center gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "min-w-36 justify-start text-left font-normal text-gray-700",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Select Date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 z-50 bg-white" align="end">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {date && (
                                <Button variant="ghost" size="icon" onClick={() => setDate(undefined)} className="h-9 w-9 text-gray-400 hover:text-red-500 rounded-full" title="Clear Date Filter">
                                    <X size={16} />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold text-gray-600">Transaction ID</TableHead>
                                <TableHead className="font-semibold text-gray-600">Donor Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Amount</TableHead>
                                <TableHead className="font-semibold text-gray-600">Campaign</TableHead>
                                <TableHead className="font-semibold text-gray-600">Date</TableHead>
                                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                                <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDonations.map((donation) => (
                                <TableRow key={donation.id} className="hover:bg-gray-50/50">
                                    <TableCell className="font-medium text-gray-900">{donation.id}</TableCell>
                                    <TableCell>{donation.donorName}</TableCell>
                                    <TableCell className="text-emerald-600 font-medium">₹{donation.amount.toLocaleString()}</TableCell>
                                    <TableCell className="text-gray-600">{donation.campaign}</TableCell>
                                    <TableCell className="text-gray-500">{donation.date}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`
                                            ${donation.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                            ${donation.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                            ${donation.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                                            ${donation.status === 'Refunded' ? 'bg-gray-100 text-gray-700 border-gray-300' : ''}
                                        `}>
                                            {donation.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50" title="View Transaction">
                                                <Eye size={16} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-orange-600 hover:bg-orange-50" title="Refund" disabled={donation.status !== 'Success'}>
                                                <RotateCcw size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <span>Showing {filteredDonations.length} entries</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
