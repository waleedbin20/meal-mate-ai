import React, { useState } from "react";
import QuoteForm from "@/components/QuoteForm";
import ChatSection from "@/components/ChatSection";
import { QuoteFormData } from "@/components/quote-form/types";
import { transformQuoteData } from "@/utils/transformQuoteData";
import { submitQuote } from "@/services/quoteService";
import { useToast } from "@/components/ui/use-toast";
import { formatQuoteSummary } from "@/utils/formatQuoteSummary";

const Index = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  const { toast } = useToast();

  const handleQuoteSubmit = async (data: QuoteFormData) => {
    // First show the chat interface
    const summary = formatQuoteSummary(data);
    setMessages([{ content: summary, isAi: false }]);
    setShowForm(false);
    setIsChatActive(true);
    setIsProcessing(true);

    // Then process the API request
    try {
      const transformedData = transformQuoteData(data);
      const response = await submitQuote(transformedData);
      
      setMessages(prev => [...prev, { 
        content: "Thank you for submitting your quote request. I've analyzed your requirements and I'm here to help you understand the details better. What specific aspects would you like to know more about?", 
        isAi: true 
      }]);

      toast({
        title: "Success",
        description: "Quote submitted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote. Please try again.",
        variant: "destructive",
      });
      // Keep the chat active even if there's an error
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
            <ChatSection
              messages={messages}
              isProcessing={isProcessing}
              onSendMessage={handleChatMessage}
              onNewChat={handleNewChat}
              onStopChat={handleStopChat}
              isChatActive={isChatActive}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
