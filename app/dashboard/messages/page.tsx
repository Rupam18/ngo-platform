"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Search, MailOpen, Mail, Trash2, Eye, RefreshCw } from "lucide-react";
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

export default function MessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/messages');
            const result = await res.json();
            if (result.success) {
                setMessages(result.data);
            } else {
                toast.error("Failed to load messages");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching messages");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: "UNREAD" | "READ", showToast = true) => {
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

    const handleViewMessage = (msg: ContactMessage) => {
        setSelectedMessage(msg);
        if (msg.status === "UNREAD") {
            handleUpdateStatus(msg.id, "READ", false); // silently mark as read
        }
    };

    const filteredMessages = messages.filter(m => {
        const term = searchTerm.toLowerCase();
        return m.name.toLowerCase().includes(term) ||
            m.email.toLowerCase().includes(term) ||
            (m.subject?.toLowerCase() || "").includes(term);
    });

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Contact Messages</h1>
                    <p className="text-gray-500 mt-1">Review and respond to inquiries from the contact form.</p>
                </div>
                <Button onClick={fetchMessages} variant="outline" className="text-gray-600">
                    <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
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
                            placeholder="Search by name, email, or subject..."
                            className="pl-9 bg-gray-50 border-gray-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold text-gray-600">Date</TableHead>
                                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Email</TableHead>
                                <TableHead className="font-semibold text-gray-600">Subject</TableHead>
                                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                                <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                                        <RefreshCw size={24} className="animate-spin text-emerald-600 mx-auto mb-2" />
                                        Loading messages...
                                    </TableCell>
                                </TableRow>
                            ) : filteredMessages.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">
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
                                                    <Button onClick={() => handleUpdateStatus(msg.id, "READ")} variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50" title="Mark as Read">
                                                        <MailOpen size={16} />
                                                    </Button>
                                                ) : (
                                                    <Button onClick={() => handleUpdateStatus(msg.id, "UNREAD")} variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100" title="Mark as Unread">
                                                        <Mail size={16} />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <span>Showing {filteredMessages.length} messages</span>
                </div>
            </motion.div>
        </div>
    );
}
