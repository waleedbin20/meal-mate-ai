import React, { useState, useEffect } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import ChatSection from "@/components/ChatSection";
import { QuoteFormData } from "@/components/quote-form/types";
import { transformQuoteData } from "@/utils/transformQuoteData";
import { fetchQuoteResponse } from "@/services/quoteResponseService";
import { useToast } from "@/hooks/use-toast";
import { formatQuoteRequest, formatQuoteResponse } from "@/utils/formatQuoteSummary";
import type { QuoteResponse } from "@/types/quoteResponse";
import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle, Save } from "lucide-react";
import SavedQuotes from "@/components/SavedQuote";
import { useLocation, useParams } from "react-router-dom";
import { getQuoteById } from "@/services/quoteService";
import { useNavigate } from "react-router-dom";
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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const QuotePage = () => {


  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean, versionNumber?: number }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);
  const [lastFormData, setLastFormData] = useState<QuoteFormData | null>(null);
  const [quoteData, setQuoteData] = useState<QuoteFormData | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
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
    const summary = formatQuoteRequest(data);
    setMessages([{ content: summary, isAi: false }]);
    setShowForm(false);

    try {
      const response = await fetchQuoteResponse(data);
      if (response) {
        setQuoteResponse(response);

        if (response === null) {
          toast({
            title: "Quote Generation Failed",
            description: response.summary,
            variant: "destructive",
          });
        }

        setMessages(prev => [...prev, {
          content: formatQuoteResponse(response),
          isAi: true,
          versionNumber: response.quoteDetails.versionNumber
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
  const navigate = useNavigate();

  const handleSwitchToChat = () => {
    if (id) {
      console.log(`Switch to chat for quote id`, id);
      navigate(`/quote/${id}/chat`);
    }
    else {
      setIsAlertDialogOpen(true);
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

  const handleNewQuote = () => {
    if (id) {
      console.log(`Creating new quote`, id);
      navigate(`/quote`);
      window.location.reload();
    }
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
              {showForm ? (
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                    <Button
                      onClick={handleSwitchToChat}
                      variant="outline"
                      className="flex items-center gap-2 text-white bg-indigo-500 hover:bg-indigo-100 hover:text-black w-full md:w-full"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Switch to Chat
                    </Button>
                    <Button
                      onClick={handleNewQuote}
                      variant="outline"
                      className="flex items-center justify-center gap-2 bg-white hover:bg-purple-100 hover:text-purple-900 w-full md:w-full"
                    >
                      <PlusCircle className="w-4 h-4" />
                      New Quote
                    </Button>
                    <SavedQuotes onClose={false} />
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
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Failed To Open Chat</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please fill the form and resubmit.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogAction className="bg-slate-600 hover:bg-slate-700" onClick={() => setIsAlertDialogOpen(false)}>OK</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default QuotePage;