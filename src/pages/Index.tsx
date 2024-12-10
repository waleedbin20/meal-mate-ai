import React, { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import QuoteCalculator from "@/components/QuoteCalculator";
import { generateAiResponse } from "@/services/azureAi";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl h-[600px] flex flex-col">
            <div className="p-6 border-b border-purple-100">
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Care Home Meal Plan Quote
              </h1>
              <p className="text-sm text-gray-600">
                Chat with our AI to generate your custom quote
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
          <div className="space-y-4">
            <QuoteCalculator
              details={{
                residents: 0,
                mealsPerDay: 3,
                dietaryRequirements: 0,
                pricePerMeal: 5,
              }}
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {}} // TODO: Implement export functionality
                className="flex-1 bg-white hover:bg-gray-50/90 text-purple-700 hover:text-purple-800 border border-purple-200"
                variant="outline"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() => setMessages([])}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;