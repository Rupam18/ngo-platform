"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Edit, Trash2, Archive, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

interface CampaignData {
    id: string;
    title: string;
    raised: number;
    goal: number;
    status: "Active" | "Completed" | "Draft";
}

const mockCampaigns: CampaignData[] = [
    { id: "1", title: "Education for All 2026", raised: 85000, goal: 100000, status: "Active" },
    { id: "2", title: "Clean Water Initiative", raised: 120000, goal: 120000, status: "Completed" },
    { id: "3", title: "Disaster Relief Fund", raised: 45000, goal: 200000, status: "Active" },
    { id: "4", title: "Women Empowerment", raised: 0, goal: 50000, status: "Draft" },
    { id: "5", title: "Medical Camp Setup", raised: 90000, goal: 150000, status: "Active" },
];

export function CampaignTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");

    const filteredCampaigns = mockCampaigns.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Campaigns Overview</h3>
                    <p className="text-sm text-gray-500">Manage and track all ongoing campaigns</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                            placeholder="Search campaigns..."
                            className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gray-200 text-gray-700 w-full sm:w-auto">
                                <Filter size={16} className="mr-2" />
                                {statusFilter}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setStatusFilter("All")}>All Statuses</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>Completed</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Draft")}>Draft</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow className="hover:bg-transparent border-gray-100">
                            <TableHead className="font-semibold text-gray-600">Title</TableHead>
                            <TableHead className="font-semibold text-gray-600">Raised Amount</TableHead>
                            <TableHead className="font-semibold text-gray-600">Goal</TableHead>
                            <TableHead className="font-semibold text-gray-600 w-48">Progress</TableHead>
                            <TableHead className="font-semibold text-gray-600">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCampaigns.length > 0 ? (
                            filteredCampaigns.map((campaign) => {
                                const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100)) || 0;

                                return (
                                    <TableRow key={campaign.id} className="hover:bg-gray-50/50 border-gray-100">
                                        <TableCell className="font-medium text-gray-900">{campaign.title}</TableCell>
                                        <TableCell className="text-emerald-600 font-medium">₹{campaign.raised.toLocaleString()}</TableCell>
                                        <TableCell className="text-gray-500">₹{campaign.goal.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Progress value={progress} className="h-2 bg-gray-100 [&>div]:bg-emerald-500" />
                                                <span className="text-xs font-medium text-gray-500 w-8">{progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`
                                                ${campaign.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                                ${campaign.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                                ${campaign.status === 'Draft' ? 'bg-gray-100 text-gray-700 border-gray-300' : ''}
                                            `}>
                                                {campaign.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50">
                                                    <Eye size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                                                    <Edit size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-amber-600 hover:bg-amber-50">
                                                    <Archive size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50">
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                            <Archive size={32} className="text-gray-300" />
                                        </div>
                                        <p className="text-lg font-medium text-gray-900 mb-1">No campaigns found</p>
                                        <p className="text-sm mb-4">We couldn't find any campaigns matching your filters.</p>
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
                                            Create New Campaign
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
                <span>Showing {filteredCampaigns.length} of {mockCampaigns.length} campaigns</span>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
            </div>
        </motion.div>
    );
}
