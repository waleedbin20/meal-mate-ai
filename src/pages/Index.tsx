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
  const { toast } = useToast();

  const handleQuoteSubmit = async (data: QuoteFormData) => {
    setIsProcessing(true);
    try {
      const transformedData = transformQuoteData(data);
      const response = await submitQuote(transformedData);
      
      // Add the summary message
      const summary = formatQuoteSummary(data);
      setMessages([
        { content: summary, isAi: false },
        { 
          content: "Thank you for submitting your quote request. I've analyzed your requirements and I'm here to help you understand the details better. What specific aspects would you like to know more about?", 
          isAi: true 
        }
      ]);

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
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChatMessage = async (message: string) => {
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

  const handleClearForm = () => {
    setMessages([]); // Clear messages when form is cleared
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={`lg:col-span-${messages.length > 0 ? '6' : '6 lg:col-start-4'}`}>
            <QuoteForm 
              onSubmit={handleQuoteSubmit} 
              isLoading={isProcessing}
              onClearForm={handleClearForm}
            />
          </div>

          {messages.length > 0 && (
            <ChatSection
              messages={messages}
              isProcessing={isProcessing}
              onSendMessage={handleChatMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;