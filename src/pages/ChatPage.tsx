import React, { useState, useEffect } from "react";
import ChatSection from "@/components/ChatSection";
import { useParams, useNavigate } from "react-router-dom";
import { getQuoteById } from "@/services/quoteApiService";
import { fetchQuoteResponse } from "@/services/quoteResponseService";
import { useToast } from "@/hooks/use-toast";
import { formatQuoteSummary } from "@/utils/formatQuoteSummary";
import type { QuoteFormData } from "@/components/quote-form/types";

const ChatPage = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteFormData | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuote = async () => {
      if (id) {
        try {
          const data = await getQuoteById(parseInt(id));
          setQuoteData(data);
          // Generate initial summary
          const summary = formatQuoteSummary(data);
          setMessages([{ content: summary, isAi: false }]);
          // Fetch AI response
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
  }, [id, toast]);

  const handleInitialResponse = async (data: QuoteFormData) => {
    setIsProcessing(true);
    try {
      const response = await fetchQuoteResponse(data);
      if (response) {
        if (!response.managerQuoteApproval) {
          toast({
            title: "Quote Generation Failed",
            description: response.managerQuoteSummary,
            variant: "destructive",
          });
        }

        setMessages(prev => [...prev, { 
          content: response.managerQuoteSummary, 
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
  );
};

export default ChatPage;