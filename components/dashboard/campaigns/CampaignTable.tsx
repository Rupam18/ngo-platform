"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Eye, Edit, Trash2, Archive, MoreVertical, Copy, ArrowUpDown, ChevronDown, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdvancedCampaignData {
    id: string;
    title: string;
    category: string;
    raised: number;
    goal: number;
    status: "Active" | "Completed" | "Draft" | "Archived";
    created: string;
    thumbnailUrl?: string; // Optional for when DB isn't wired
}

// Extensive mock data to show pagination and scrolling
const mockCampaigns: AdvancedCampaignData[] = [
    { id: "cm_1", title: "Education for All 2026", category: "Education", raised: 85000, goal: 100000, status: "Active", created: "10 Feb 2026" },
    { id: "cm_2", title: "Clean Water Initiative", category: "Water", raised: 120000, goal: 120000, status: "Completed", created: "01 Jan 2026" },
    { id: "cm_3", title: "Disaster Relief Fund", category: "Emergency", raised: 45000, goal: 200000, status: "Active", created: "15 Feb 2026" },
    { id: "cm_4", title: "Women Empowerment", category: "Social", raised: 0, goal: 50000, status: "Draft", created: "20 Feb 2026" },
    { id: "cm_5", title: "Medical Camp Setup", category: "Healthcare", raised: 90000, goal: 150000, status: "Active", created: "05 Feb 2026" },
    { id: "cm_6", title: "Winter Blanket Drive", category: "Relief", raised: 25000, goal: 30000, status: "Archived", created: "10 Dec 2025" },
    { id: "cm_7", title: "Rural Solar Power", category: "Environment", raised: 75000, goal: 500000, status: "Active", created: "18 Feb 2026" },
];

export function CampaignTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("Newest");

    // Filtering
    let filtered = mockCampaigns.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Sorting
    filtered = filtered.sort((a, b) => {
        if (sortBy === "Most Raised") return b.raised - a.raised;
        if (sortBy === "Goal Progress") {
            const pA = a.raised / a.goal;
            const pB = b.raised / b.goal;
            return pB - pA;
        }
        // Fallback Newest (mock using ID for structural sorting)
        return b.id.localeCompare(a.id);
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
        >
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white sticky top-0 z-10">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                        placeholder="Search campaigns by title..."
                        className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors h-10 rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="text-gray-700 min-w-[140px] justify-between h-10 rounded-lg border-gray-200">
                                <span className="flex items-center">
                                    <Filter size={16} className="mr-2 text-gray-400" />
                                    {statusFilter === "All" ? "Status: All" : statusFilter}
                                </span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] rounded-xl shadow-lg border-gray-100">
                            <DropdownMenuItem onClick={() => setStatusFilter("All")} className="cursor-pointer">All Statuses</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Active")} className="cursor-pointer text-emerald-600">Active</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Completed")} className="cursor-pointer text-blue-600">Completed</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Draft")} className="cursor-pointer text-gray-600">Draft</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setStatusFilter("Archived")} className="cursor-pointer text-amber-600">Archived</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="text-gray-700 min-w-[160px] justify-between h-10 rounded-lg border-gray-200">
                                <span className="flex items-center">
                                    <ArrowUpDown size={16} className="mr-2 text-gray-400" />
                                    Sort: {sortBy}
                                </span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] rounded-xl shadow-lg border-gray-100">
                            <DropdownMenuItem onClick={() => setSortBy("Newest")} className="cursor-pointer">Newest</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("Most Raised")} className="cursor-pointer">Most Raised</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy("Goal Progress")} className="cursor-pointer">Goal Progress</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-50/80 sticky top-0 z-0">
                        <TableRow className="hover:bg-transparent border-gray-100">
                            <TableHead className="w-16 text-center font-semibold text-gray-600">Image</TableHead>
                            <TableHead className="font-semibold text-gray-600 min-w-[200px]">Title</TableHead>
                            <TableHead className="font-semibold text-gray-600">Category</TableHead>
                            <TableHead className="font-semibold text-gray-600">Raised Amount</TableHead>
                            <TableHead className="font-semibold text-gray-600">Goal</TableHead>
                            <TableHead className="font-semibold text-gray-600 w-48">Progress</TableHead>
                            <TableHead className="font-semibold text-gray-600">Status</TableHead>
                            <TableHead className="font-semibold text-gray-600">Created</TableHead>
                            <TableHead className="text-right font-semibold text-gray-600 w-16">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {filtered.length > 0 ? (
                                filtered.map((campaign) => {
                                    const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100)) || 0;

                                    return (
                                        <TableRow key={campaign.id} className="hover:bg-blue-50/30 border-gray-100 transition-colors group">
                                            <TableCell className="p-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mx-auto overflow-hidden border border-gray-200 group-hover:border-blue-200 transition-colors">
                                                    {campaign.thumbnailUrl ? (
                                                        <img src={campaign.thumbnailUrl} alt={campaign.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="text-gray-400" size={18} />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold text-gray-900">{campaign.title}</TableCell>
                                            <TableCell className="text-gray-500">{campaign.category}</TableCell>
                                            <TableCell className="text-emerald-600 font-semibold">₹{campaign.raised.toLocaleString()}</TableCell>
                                            <TableCell className="text-gray-500">₹{campaign.goal.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Progress value={progress} className="h-2.5 bg-gray-100 [&>div]:bg-emerald-500 rounded-full" />
                                                    <span className="text-xs font-semibold text-gray-500 w-9">{progress}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={`
                                                    font-medium px-2.5 py-1 rounded-md border
                                                    ${campaign.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                                    ${campaign.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                                    ${campaign.status === 'Draft' ? 'bg-gray-50 text-gray-600 border-gray-300' : ''}
                                                    ${campaign.status === 'Archived' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                                `}>
                                                    {campaign.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-gray-400 text-sm whitespace-nowrap">{campaign.created}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100">
                                                            <MoreVertical size={16} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-gray-100 p-1">
                                                        <Link href={`/dashboard/campaigns/${campaign.id}`}>
                                                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-lg">
                                                                <Eye size={16} className="mr-2 text-blue-500" /> View Details
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <Link href={`/dashboard/campaigns/create?edit=${campaign.id}`}>
                                                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-lg mt-1">
                                                                <Edit size={16} className="mr-2 text-emerald-500" /> Edit Campaign
                                                            </DropdownMenuItem>
                                                        </Link>
                                                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-lg mt-1">
                                                            <Copy size={16} className="mr-2 text-gray-500" /> Duplicate
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-gray-100 my-1" />
                                                        <DropdownMenuItem className="cursor-pointer hover:bg-amber-50 text-amber-700 rounded-lg focus:text-amber-700 focus:bg-amber-50">
                                                            <Archive size={16} className="mr-2" /> Archive
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="cursor-pointer hover:bg-red-50 text-red-700 rounded-lg focus:text-red-700 focus:bg-red-50 mt-1">
                                                            <Trash2 size={16} className="mr-2" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-[400px] text-center">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center text-gray-500"
                                        >
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5 border border-gray-100 shadow-sm">
                                                <Archive size={36} className="text-gray-300" />
                                            </div>
                                            <p className="text-xl font-bold text-gray-900 mb-2">No campaigns found</p>
                                            <p className="text-sm mb-6 max-w-sm mx-auto">We couldn't find any campaigns matching your current filters. Try tweaking your search.</p>
                                            <Button
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 shadow-sm hover:shadow active:scale-95 transition-all"
                                                onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
                                            >
                                                Clear Filters
                                            </Button>
                                        </motion.div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
                <span className="font-medium text-gray-700">Showing {filtered.length} of {mockCampaigns.length} total campaigns</span>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled className="rounded-lg bg-white border-gray-200">Previous</Button>
                    <Button variant="outline" size="sm" disabled className="rounded-lg bg-white border-gray-200 text-gray-900 font-medium">1</Button>
                    <Button variant="outline" size="sm" disabled className="rounded-lg bg-white border-gray-200">Next</Button>
                </div>
            </div>
        </motion.div>
    );
}
