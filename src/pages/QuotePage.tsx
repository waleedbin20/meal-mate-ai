import React, { useState } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import ChatSection from "@/components/ChatSection";
import { QuoteFormData } from "@/components/quote-form/types";
import { transformQuoteData } from "@/utils/transformQuoteData";
import { fetchQuoteResponse } from "@/services/quoteResponseService";
import { useToast } from "@/hooks/use-toast";
import { formatQuoteSummary } from "@/utils/formatQuoteSummary";
import type { QuoteResponse } from "@/types/quoteResponse";
import QuoteResponseDisplay from "@/components/QuoteResponse";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const QuotePage = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);
  const [lastFormData, setLastFormData] = useState<QuoteFormData | null>(null);
  const { toast } = useToast();

  const handleQuoteSubmit = async (data: QuoteFormData) => {
    setIsProcessing(true);
    setLastFormData(data);
    const summary = formatQuoteSummary(data);
    setMessages([{ content: summary, isAi: false }]);
    setShowForm(false);

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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
      <div className="container mx-auto py-4 px-4 md:py-8 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
          {showForm ? (
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="mb-4">
                <Button
                  onClick={toggleForm}
                  variant="outline"
                  className="flex items-center gap-2 bg-white hover:bg-purple-50"
                >
                  <PlusCircle className="w-4 h-4" />
                  Switch to Chat
                </Button>
              </div>
              <QuoteForm 
                onSubmit={handleQuoteSubmit} 
                isLoading={isProcessing}
              />
            </div>
          ) : (
            <>
              <div className="lg:col-span-8">
                <ChatSection
                  messages={messages}
                  isProcessing={isProcessing}
                  onShowForm={toggleForm}
                />
              </div>
              {quoteResponse && (
                <div className="lg:col-span-4">
                  <QuoteResponseDisplay 
                    response={quoteResponse}
                    onRetry={handleRetry}
                    isLoading={isProcessing}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotePage;