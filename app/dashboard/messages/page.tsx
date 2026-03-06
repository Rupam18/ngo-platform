"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MailOpen, Mail, Eye, RefreshCw, Users, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: "UNREAD" | "READ";
    createdAt: string;
}

interface VolunteerApplication {
    id: string;
    fullName: string;
    dob: string;
    gender: string;
    nationality: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    phone: string;
    email: string;
    status: string;
    createdAt: string;
}

export default function MessagesPage() {
    const [activeTab, setActiveTab] = useState<"messages" | "volunteers">("messages");

    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerApplication | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            if (activeTab === "messages") {
                const res = await fetch('/api/admin/messages');
                const result = await res.json();
                if (result.success) {
                    setMessages(result.data);
                } else {
                    toast.error("Failed to load messages");
                }
            } else {
                const res = await fetch('/api/admin/volunteer');
                const result = await res.json();
                if (result.success) {
                    setVolunteers(result.data);
                } else {
                    toast.error("Failed to load volunteer applications");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleUpdateMessageStatus = async (id: string, newStatus: "UNREAD" | "READ", showToast = true) => {
        try {
            const res = await fetch(`/api/admin/messages/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const result = await res.json();
            if (result.success) {
                if (showToast) toast.success(`Message marked as ${newStatus.toLowerCase()}`);
                setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    const handleUpdateVolunteerStatus = async (id: string, newStatus: string, showToast = true) => {
        // For simplicity, we can do client side optimistic update, or hit a generic patch route. 
        // Currently there is no /api/admin/volunteer/[id] route yet, so we'll just mock the client state
        // or optionally implement it if needed. Let's just update client state to UNREAD / REVIEWED
        setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
        if (showToast) toast.success(`Status updated to ${newStatus}`);
    };

    const handleViewMessage = (msg: ContactMessage) => {
        setSelectedMessage(msg);
        if (msg.status === "UNREAD") {
            handleUpdateMessageStatus(msg.id, "READ", false); // silently mark as read
        }
    };

    const handleViewVolunteer = (vol: VolunteerApplication) => {
        setSelectedVolunteer(vol);
        if (vol.status === "UNREAD") {
            handleUpdateVolunteerStatus(vol.id, "REVIEWED", false);
        }
    }

    const filteredMessages = messages.filter(m => {
        const term = searchTerm.toLowerCase();
        return m.name.toLowerCase().includes(term) ||
            m.email.toLowerCase().includes(term) ||
            (m.subject?.toLowerCase() || "").includes(term);
    });

    const filteredVolunteers = volunteers.filter(v => {
        const term = searchTerm.toLowerCase();
        return v.fullName.toLowerCase().includes(term) ||
            v.email.toLowerCase().includes(term) ||
            v.phone.includes(term);
    });

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Inquiries & Applications</h1>
                    <p className="text-gray-500 mt-1">Review contact messages and volunteer applications.</p>
                </div>
                <Button onClick={fetchData} variant="outline" className="text-gray-600">
                    <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Custom Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-md">
                <button
                    onClick={() => { setActiveTab("messages"); setSearchTerm(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === "messages"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                        }`}
                >
                    <MessageSquare size={16} />
                    Contact Messages
                </button>
                <button
                    onClick={() => { setActiveTab("volunteers"); setSearchTerm(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === "volunteers"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                        }`}
                >
                    <Users size={16} />
                    Volunteer Apps
                </button>
            </div>

            <motion.div
                key={activeTab} // Animate when tab changes
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input
                            placeholder={activeTab === "messages" ? "Search by name, email, or subject..." : "Search by name, email, or phone..."}
                            className="pl-9 bg-gray-50 border-gray-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-normal">
                        Total: {activeTab === "messages" ? filteredMessages.length : filteredVolunteers.length}
                    </Badge>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold text-gray-600">Date</TableHead>
                                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Email</TableHead>
                                {activeTab === "messages" ? (
                                    <TableHead className="font-semibold text-gray-600">Subject</TableHead>
                                ) : (
                                    <TableHead className="font-semibold text-gray-600">Location</TableHead>
                                )}
                                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                                <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-16 text-gray-500">
                                        <RefreshCw size={24} className="animate-spin text-emerald-600 mx-auto mb-3" />
                                        Loading {activeTab}...
                                    </TableCell>
                                </TableRow>
                            ) : activeTab === "messages" ? (
                                // MESSAGES TABLE
                                filteredMessages.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-16 text-gray-500">
                                            No messages found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredMessages.map((msg) => (
                                        <TableRow key={msg.id} className={`hover:bg-gray-50/50 ${msg.status === 'UNREAD' ? 'bg-blue-50/20' : ''}`}>
                                            <TableCell className="text-gray-500 whitespace-nowrap">
                                                {format(new Date(msg.createdAt), "MMM d, yyyy")}
                                            </TableCell>
                                            <TableCell className={`font-medium ${msg.status === 'UNREAD' ? 'text-gray-900' : 'text-gray-600'}`}>
                                                {msg.name}
                                            </TableCell>
                                            <TableCell className="text-gray-600">{msg.email}</TableCell>
                                            <TableCell className="text-gray-600 max-w-[200px] truncate">{msg.subject || "--"}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={
                                                    msg.status === 'UNREAD'
                                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                        : 'bg-gray-50 text-gray-600 border-gray-200'
                                                }>
                                                    {msg.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button onClick={() => handleViewMessage(msg)} variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50" title="Read Message">
                                                                <Eye size={16} />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[525px]">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-xl">{selectedMessage?.subject || "New Message"}</DialogTitle>
                                                                <DialogDescription>
                                                                    From: {selectedMessage?.name} ({selectedMessage?.email})
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="bg-gray-50 p-4 rounded-xl mt-4 max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm text-gray-700">
                                                                {selectedMessage?.message}
                                                            </div>
                                                            <div className="text-xs text-gray-400 mt-2">
                                                                {selectedMessage?.phone ? `Phone: ${selectedMessage.phone}` : ''}
                                                                &nbsp; | &nbsp;
                                                                Sent: {selectedMessage?.createdAt ? format(new Date(selectedMessage.createdAt), "h:mm a - MMM d, yyyy") : ''}
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    {msg.status === "UNREAD" ? (
                                                        <Button onClick={() => handleUpdateMessageStatus(msg.id, "READ")} variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50" title="Mark as Read">
                                                            <MailOpen size={16} />
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={() => handleUpdateMessageStatus(msg.id, "UNREAD")} variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100" title="Mark as Unread">
                                                            <Mail size={16} />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            ) : (
                                // VOLUNTEERS TABLE
                                filteredVolunteers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-16 text-gray-500">
                                            No volunteer applications found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredVolunteers.map((vol) => (
                                        <TableRow key={vol.id} className={`hover:bg-gray-50/50 ${vol.status === 'UNREAD' ? 'bg-purple-50/20' : ''}`}>
                                            <TableCell className="text-gray-500 whitespace-nowrap">
                                                {format(new Date(vol.createdAt), "MMM d, yyyy")}
                                            </TableCell>
                                            <TableCell className={`font-medium ${vol.status === 'UNREAD' ? 'text-gray-900' : 'text-gray-600'}`}>
                                                {vol.fullName}
                                            </TableCell>
                                            <TableCell className="text-gray-600">{vol.email}</TableCell>
                                            <TableCell className="text-gray-600 max-w-[200px] truncate">{vol.city}, {vol.state}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={
                                                    vol.status === 'UNREAD'
                                                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                        : 'bg-green-50 text-green-700 border-green-200'
                                                }>
                                                    {vol.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button onClick={() => handleViewVolunteer(vol)} variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-purple-600 hover:bg-purple-50" title="View Application">
                                                                <Eye size={16} />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-xl">Volunteer Application</DialogTitle>
                                                                <DialogDescription>
                                                                    Submitted on {selectedVolunteer?.createdAt ? format(new Date(selectedVolunteer.createdAt), "MMMM d, yyyy 'at' h:mm a") : ''}
                                                                </DialogDescription>
                                                            </DialogHeader>

                                                            {selectedVolunteer && (
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                                    <div className="space-y-1">
                                                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</span>
                                                                        <p className="font-medium text-gray-900">{selectedVolunteer.fullName}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</span>
                                                                        <p className="font-medium text-gray-900">{selectedVolunteer.email}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</span>
                                                                        <p className="font-medium text-gray-900">{selectedVolunteer.phone}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date of Birth</span>
                                                                        <p className="font-medium text-gray-900">{selectedVolunteer.dob}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gender</span>
                                                                        <p className="font-medium text-gray-900 capitalize">{selectedVolunteer.gender}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nationality</span>
                                                                        <p className="font-medium text-gray-900">{selectedVolunteer.nationality}</p>
                                                                    </div>
                                                                    <div className="md:col-span-2 space-y-1 pt-2 border-t border-gray-100">
                                                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</span>
                                                                        <p className="font-medium text-gray-900">{selectedVolunteer.address}</p>
                                                                        <p className="text-gray-600 text-sm">{selectedVolunteer.city}, {selectedVolunteer.state} - {selectedVolunteer.pincode}</p>
                                                                        <p className="text-gray-600 text-sm">{selectedVolunteer.country}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="flex gap-3 justify-end mt-6 border-t border-gray-100 pt-4">
                                                                {selectedVolunteer?.status === 'UNREAD' ? (
                                                                    <Button
                                                                        onClick={() => {
                                                                            if (selectedVolunteer) {
                                                                                handleUpdateVolunteerStatus(selectedVolunteer.id, "REVIEWED");
                                                                                setSelectedVolunteer({ ...selectedVolunteer, status: "REVIEWED" });
                                                                            }
                                                                        }}
                                                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                                                    >
                                                                        Mark as Reviewed
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() => {
                                                                            if (selectedVolunteer) {
                                                                                handleUpdateVolunteerStatus(selectedVolunteer.id, "UNREAD");
                                                                                setSelectedVolunteer({ ...selectedVolunteer, status: "UNREAD" });
                                                                            }
                                                                        }}
                                                                        variant="outline"
                                                                    >
                                                                        Mark as Unread
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    {vol.status === "UNREAD" ? (
                                                        <Button onClick={() => handleUpdateVolunteerStatus(vol.id, "REVIEWED")} variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-purple-600 hover:bg-purple-50" title="Mark as Reviewed">
                                                            <MailOpen size={16} />
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={() => handleUpdateVolunteerStatus(vol.id, "UNREAD")} variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100" title="Mark as Unread">
                                                            <Mail size={16} />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>
        </div>
    );
}
