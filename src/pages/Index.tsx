import React, { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import QuoteCalculator from "@/components/QuoteCalculator";
import ApiKeyConfig from "@/components/ApiKeyConfig";
import { useApiKeys } from "@/hooks/useApiKeys";
import { generateAiResponse } from "@/services/azureAi";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const { apiKeys, saveApiKeys } = useApiKeys();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMessage = async (message: string) => {
    if (!apiKeys) {
      toast({
        title: "Configuration Required",
        description: "Please configure your Azure OpenAI settings first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setMessages(prev => [...prev, { content: message, isAi: false }]);

    try {
      const response = await generateAiResponse(message, apiKeys);
      setMessages(prev => [...prev, { content: response, isAi: true }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please check your configuration.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <h1 className="text-2xl font-semibold text-primary">Care Home Meal Plan Quote</h1>
              <p className="text-sm text-muted-foreground">Chat with our AI to generate your custom quote</p>
            </div>
            {!apiKeys ? (
              <div className="flex-1 p-4">
                <ApiKeyConfig onSave={saveApiKeys} />
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
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
              </>
            )}
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
                className="flex-1"
                variant="outline"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() => {}} // TODO: Implement reset functionality
                className="flex-1"
                variant="secondary"
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