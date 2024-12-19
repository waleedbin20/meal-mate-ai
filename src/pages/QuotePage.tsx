import React, { useState } from "react";
import QuoteForm from "@/components/QuoteForm";
import ChatSection from "@/components/ChatSection";
import { QuoteFormData } from "@/components/quote-form/types";
import { transformQuoteData } from "@/utils/transformQuoteData";
import { submitQuote } from "@/services/quoteService";
import { useToast } from "@/hooks/use-toast";
import { formatQuoteSummary } from "@/utils/formatQuoteSummary";
import { fetchQuoteResponse } from "@/services/quoteResponseService";
import type { QuoteResponse } from "@/types/quoteResponse";
import QuoteResponseDisplay from "@/components/QuoteResponse";

const QuotePage = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);
  const [lastFormData, setLastFormData] = useState<QuoteFormData | null>(null);
  const { toast } = useToast();

  const handleQuoteSubmit = async (data: QuoteFormData) => {
    setIsProcessing(true);
    setLastFormData(data); // Store the form data for retry
    const summary = formatQuoteSummary(data);
    setMessages([{ content: summary, isAi: false }]);
    setShowForm(false);
    setIsChatActive(true);

    try {
      const response = await fetchQuoteResponse(data);
      if (response) {
        setQuoteResponse(response);
        
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
        description: "Failed to submit quote. Please try again.",
        variant: "destructive",
      });
      setQuoteResponse(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = async () => {
    if (!lastFormData) {
      toast({
        title: "Error",
        description: "No previous quote data found. Please start a new quote.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      const response = await fetchQuoteResponse(lastFormData);
      if (response) {
        setQuoteResponse(response);
        
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
        description: "Failed to retry quote generation. Please try again.",
        variant: "destructive",
      });
      setQuoteResponse(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChatMessage = async (message: string) => {
    if (!isChatActive) return;
    
    setIsProcessing(true);
    setMessages(prev => [...prev, { content: message, isAi: false }]);

    try {
      // Simulate AI response - replace with actual API call
      const aiResponse = "I understand your question about the quote. Let me help you with that...";
      setMessages(prev => [...prev, { content: aiResponse, isAi: true }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewChat = () => {
    setShowForm(true);
    setMessages([]);
    setIsChatActive(false);
    setQuoteResponse(null);
    setLastFormData(null);
  };

  const handleStopChat = () => {
    setIsChatActive(false);
    toast({
      title: "Chat Ended",
      description: "The conversation has been ended.",
    });
  };

  const handleClearForm = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {showForm ? (
            <div className="lg:col-span-8 lg:col-start-3">
              <QuoteForm 
                onSubmit={handleQuoteSubmit} 
                isLoading={isProcessing}
                onClearForm={handleClearForm}
              />
            </div>
          ) : (
            <>
              <div className="lg:col-span-8">
                <ChatSection
                  messages={messages}
                  isProcessing={isProcessing}
                  onSendMessage={handleChatMessage}
                  onNewChat={handleNewChat}
                  onStopChat={handleStopChat}
                  isChatActive={isChatActive}
                />
              </div>
              <div className="lg:col-span-4">
                <QuoteResponseDisplay 
                  response={quoteResponse}
                  onRetry={handleRetry}
                  isLoading={isProcessing}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotePage;