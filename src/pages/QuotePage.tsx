import React, { useState } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import ChatSection from "@/components/ChatSection";
import { QuoteFormData } from "@/components/quote-form/types";
import { transformQuoteData } from "@/utils/transformQuoteData";
import { fetchQuoteResponse } from "@/services/quoteResponseService";
import { useToast } from "@/hooks/use-toast";
import { formatQuoteRequest, formatQuoteResponse } from "@/utils/formatQuoteSummary";
import type { QuoteResponse } from "@/types/quoteResponse";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { getQuoteById } from "@/services/quoteApiService";

const QuotePage = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);
  const [lastFormData, setLastFormData] = useState<QuoteFormData | null>(null);
  const [quoteData, setQuoteData] = useState<QuoteFormData | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const { id } = useParams();
  
  useEffect(() => {
    const fetchQuote = async () => {
      if (id) {
        try {
          const data = await getQuoteById(parseInt(id));
          setQuoteData(data);
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

    if (id) {
      fetchQuote();
    } else if (location.state?.defaultValues) {
      setQuoteData(location.state.defaultValues);
    }
  }, [id, location.state, toast]);

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
        {showForm ? (
          <div className="max-w-4xl mx-auto">
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
              defaultValues={quoteData || undefined}
            />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto w-full">
            <ChatSection
              messages={messages}
              isProcessing={isProcessing}
              onShowForm={toggleForm}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotePage;
