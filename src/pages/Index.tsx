import React, { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import QuoteCalculator from "@/components/QuoteCalculator";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateAiResponse } from "@/services/azureAi";

const Index = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<any>(null);
  const [showChatAndSummary, setShowChatAndSummary] = useState(false);

  const handleMessage = async (message: string) => {
    setIsProcessing(true);
    setMessages(prev => [...prev, { content: message, isAi: false }]);

    try {
      const response = await generateAiResponse(message);
      setMessages(prev => [...prev, { content: response, isAi: true }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuoteSubmit = async (formData: any) => {
    setIsProcessing(true);
    try {
      // Simulating API call success
      setQuoteDetails(formData);
      setShowChatAndSummary(true);
      setMessages([{ 
        content: "I've analyzed your requirements. How can I help you understand the quote better?", 
        isAi: true 
      }]);
      toast({
        title: "Success",
        description: "Quote details submitted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate quote. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quote Form */}
          <div className={`lg:col-span-${showChatAndSummary ? '3' : '6 lg:col-start-4'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
              <QuoteForm onSubmit={handleQuoteSubmit} isLoading={isProcessing} />
            </div>
          </div>

          {/* Chat Section - Only shown after form submission */}
          {showChatAndSummary && (
            <div className="lg:col-span-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl h-[600px] flex flex-col">
              <div className="p-6 border-b border-purple-100">
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Care Home Meal Plan Quote
                </h1>
                <p className="text-sm text-gray-600">
                  Chat with our AI to understand your quote better
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    isAi={message.isAi}
                    content={message.content}
                    animate={index === messages.length - 1}
                  />
                ))}
              </div>
              <ChatInput onSend={handleMessage} disabled={isProcessing} />
            </div>
          )}

          {/* Quote Summary - Only shown after form submission */}
          {showChatAndSummary && (
            <div className="lg:col-span-3 space-y-4">
              <QuoteCalculator
                details={{
                  residents: 0,
                  mealsPerDay: 3,
                  dietaryRequirements: 0,
                  pricePerMeal: 5,
                  ...(quoteDetails || {}),
                }}
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => {}} // TODO: Implement export functionality
                  className="flex-1 bg-white hover:bg-gray-50/90 text-purple-700 hover:text-purple-800 border border-purple-200 inline-flex items-center justify-center gap-2 px-4 py-2"
                  variant="outline"
                >
                  <FileDown className="h-4 w-4" />
                  Export
                </Button>
                <Button
                  onClick={() => {
                    setMessages([]);
                    setQuoteDetails(null);
                    setShowChatAndSummary(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;