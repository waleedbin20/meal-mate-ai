import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Search, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getAllQuotes, deleteQuote, getQuoteById } from "@/services/quoteService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SavedQuote } from "@/types/quoteResponse";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";


const SavedQuotesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [quoteToDelete, setQuoteToDelete] = useState<number | null>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: quotes = [], isLoading, error } = useQuery({
        queryKey: ['quotes'],
        queryFn: getAllQuotes,
    });

    const filteredQuotes = quotes.filter((quote) =>
        quote.careHomeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group quotes by creator name
    const groupedQuotes = filteredQuotes.reduce((acc, quote) => {
        const creatorName = quote.creatorName;
        if (!acc[creatorName]) {
            acc[creatorName] = [];
        }
        acc[creatorName].push(quote);
        return acc;
    }, {} as Record<string, SavedQuote[]>);

    const handleDelete = async (quoteId: number) => {
        try {
            await deleteQuote(quoteId);
            await queryClient.invalidateQueries({ queryKey: ['quotes'] });
            toast.success("Quote deleted successfully");
            setQuoteToDelete(null);
        } catch (error) {
            console.error("Error deleting quote:", error);
            toast.error("Failed to delete quote");
        }
    };

    const handleViewQuote = async (quoteId: number) => {
        try {
            const quoteData = await getQuoteById(quoteId);
            // Navigate to the quote form page with the quote data
            navigate(`/quote/${quoteId}`, { state: { defaultValues: quoteData } });
        } catch (error) {
            console.error("Error fetching quote:", error);
            toast.error("Failed to fetch quote details");
        }
    };

    if (error) {
        toast.error("Failed to fetch quotes");
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
                <AppSidebar />
                <main className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <SidebarTrigger />
                    </div>
                    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2] py-8">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                    <div>
                                        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                            Saved Quotes
                                        </h1>
                                        <p className="text-gray-600">View and manage your saved quotes</p>
                                        <p className=" text-amber-800 mt-5 ">Total Saved Quotes: <b>{filteredQuotes.length}</b></p>
                                    </div>
                                    <div className="relative w-full md:w-72">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search quotes..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>

                                </div>

                                <ScrollArea className="h-[calc(100vh-12rem)]">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center h-32">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            {Object.entries(groupedQuotes).map(([creatorName, quotes]) => (
                                                <div key={creatorName} className="space-y-4">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <User className="h-4 w-4" />
                                                        <span className="font-medium">{creatorName}</span>
                                                        <span className="text-xs">({quotes.length} quotes)</span>
                                                    </div>
                                                    <div className="space-y-4 pl-6 border-l-2 border-purple-100">
                                                        {quotes.map((quote) => (
                                                            <Card
                                                                key={quote.id}
                                                                className="group transition-all hover:shadow-lg hover:border-purple-200"
                                                            >
                                                                <CardHeader className="pb-3">
                                                                    <div className="flex items-start justify-between">
                                                                        <div>
                                                                            <CardTitle className="text-xl font-semibold">
                                                                                {quote.careHomeName}
                                                                            </CardTitle>
                                                                            <CardDescription className="space-y-1">
                                                                                <p>Created on {new Date(quote.createdOn).toLocaleDateString()}</p>
                                                                                <p className="text-sm text-pink-600">Quote #{quote.quoteNo}</p>
                                                                            </CardDescription>
                                                                        </div>
                                                                        <div className="flex items-center space-x-1">
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                aria-label="View quote"
                                                                                className="transition-opacity"
                                                                                onClick={() => handleViewQuote(quote.id)}
                                                                            >
                                                                                <FileText className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                className="transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                                onClick={() => setQuoteToDelete(quote.id)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </CardHeader>
                                                                <CardContent>
                                                                    <div className="flex items-center justify-between text-sm">
                                                                        <div className="space-x-4">
                                                                            <span className="text-muted-foreground">
                                                                                {quote.totalResidents} Residents
                                                                            </span>
                                                                        </div>
                                                                        <span
                                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${quote.quoteStatus === "Approved"
                                                                                ? "bg-green-100 text-green-700"
                                                                                : "bg-yellow-100 text-yellow-700"
                                                                                }`}
                                                                        >
                                                                            {quote.quoteStatus}
                                                                        </span>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ScrollArea>
                                <AlertDialog open={quoteToDelete !== null} onOpenChange={() => setQuoteToDelete(null)}>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure you want to delete this quote?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the quote.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-red-600 hover:bg-red-700"
                                                onClick={() => quoteToDelete && handleDelete(quoteToDelete)}
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default SavedQuotesPage;