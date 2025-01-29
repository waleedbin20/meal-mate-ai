import React, { useState, useEffect } from "react";
import ChatSection from "@/components/ChatSection";
import { useParams, useNavigate } from "react-router-dom";
import { getQuoteById, getQuoteHistoryById } from "@/services/quoteService";
import { fetchQuoteResponse } from "@/services/quoteResponseService";
import { useToast } from "@/hooks/use-toast";
import { formatQuoteRequest, formatQuoteResponse } from "@/utils/formatQuoteSummary";
import type { QuoteFormData } from "@/components/quote-form/types";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useQuery } from "@tanstack/react-query";
import { mapQuoteHistoryToFormRequestData, mapQuoteHistoryToResponse } from "@/utils/mapQuoteHistoryToFormData";
const ChatPage = () => {
    const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [quoteData, setQuoteData] = useState<QuoteFormData | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const { data: historyData } = useQuery({
        queryKey: ["quoteHistory", id],
        queryFn: async () => (id ? await getQuoteHistoryById(parseInt(id)) : null),
        enabled: !!id,
        meta: {
            onError: () => {
                toast({
                    title: "Error",
                    description: "Failed to fetch quote history",
                    variant: "destructive",
                });
            },
        },
    });
    useEffect(() => {
        const fetchQuote = async () => {
            if (!
                id
                || quoteData) {
                try {
                    const data = await getQuoteById(parseInt(id));
                    setQuoteData(data);

                    if (historyData != null && historyData.length > 0) {
                        console.log("got the history")
                        const historyMessages = historyData.map(item => ({
                            content: item.type === 0 ? formatQuoteRequest(mapQuoteHistoryToFormRequestData(item)) : formatQuoteResponse(mapQuoteHistoryToResponse(item)),
                            isAi: item.type === 1
                        }));
                        setMessages(historyMessages);
                    }

                    // Add new request message and generate response
                    const summary = formatQuoteRequest(data);
                    setMessages(prev => [...prev, { content: summary, isAi: false }]);
                    handleInitialResponse(data);
                } catch (error) {
                    console.error("Error fetching quote:", error);
                    toast({
                        title: "Error",
                        description: "Failed to fetch quote details",
                        variant: "destructive",
                    });
                }
            }
        };
        fetchQuote();
    }, [id, historyData, quoteData, toast]);

    const handleInitialResponse = async (data: QuoteFormData) => {
        setIsProcessing(true);
        try {
            const response = await fetchQuoteResponse(data);
            if (response) {
                if (response === null) {
                    toast({
                        title: "Quote Generation Failed",
                        description: response.summary,
                        variant: "destructive",
                    });
                }
                setMessages(prev => [...prev, {
                    content: formatQuoteResponse(response),
                    isAi: true
                }]);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to generate quote response",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
        }
    };
    const handleShowForm = () => {
        navigate(`/quote/${id}`);
    };
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
                <AppSidebar />
                <main className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <SidebarTrigger />
                    </div>
                    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
                        <div className="container mx-auto py-4 px-4 md:py-8 md:px-8">
                            <div className="max-w-5xl mx-auto w-full">
                                <ChatSection
                                    messages={messages}
                                    isProcessing={isProcessing}
                                    onShowForm={handleShowForm}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};
export default ChatPage;