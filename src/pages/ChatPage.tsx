import React, { useState, useEffect } from "react";
import ChatSection from "@/components/ChatSection";
import { useParams, useNavigate } from "react-router-dom";
import { getQuoteById, getQuoteHistoryById } from "@/services/quoteService";
import { useToast } from "@/hooks/use-toast";
import { formatQuoteRequest, formatQuoteResponse } from "@/utils/formatQuoteSummary";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useQuery } from "@tanstack/react-query";
import { mapQuoteHistoryToFormRequestData, mapQuoteHistoryToResponse } from "@/utils/mapQuoteHistoryToFormData";

const ChatPage = () => {
    const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean; version?: number }>>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Fetch quote history
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
        const initializeChat = async () => {
            if (!id) return;

            try {
                // If we have history, display it
                if (historyData && historyData.length > 0) {
                    console.log("Setting up history messages");
                    const historyMessages = historyData.map(item => ({
                        content: item.type === 0 ? 
                            formatQuoteRequest({
                                ...mapQuoteHistoryToFormRequestData(item),
                                creatorName: "System", // Add required field
                                careHomeName: item.careHomeName || "",
                                roles: [],
                                apetitoLabor: {
                                    name: "",
                                    hourlyRate: 0,
                                    hoursPerWeek: 0,
                                    numberOfSimilarRoles: 1
                                }
                            }) : 
                            item.summary || formatQuoteResponse(mapQuoteHistoryToResponse(item)),
                        isAi: item.type === 1,
                        version: item.versionNumber
                    }));
                    setMessages(historyMessages);
                }
            } catch (error) {
                console.error("Error initializing chat:", error);
                toast({
                    title: "Error",
                    description: "Failed to initialize chat",
                    variant: "destructive",
                });
            }
        };

        initializeChat();
    }, [id, historyData, toast]);

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
                                    onGenerateQuote={() => {}} // Empty function since we don't need this functionality here
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
