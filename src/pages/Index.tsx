import React, { useState, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import QuoteCalculator from "@/components/QuoteCalculator";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QuoteDetails {
  residents: number;
  mealsPerDay: number;
  dietaryRequirements: number;
  pricePerMeal: number;
}

const initialQuoteDetails: QuoteDetails = {
  residents: 0,
  mealsPerDay: 3,
  dietaryRequirements: 0,
  pricePerMeal: 5,
};

const Index = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails>(initialQuoteDetails);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const steps = [
    {
      question: "Welcome to the Care Home Meal Plan Quote Generator! How many residents do you need to cater for?",
      handler: (message: string) => {
        const residents = parseInt(message);
        if (isNaN(residents) || residents <= 0) {
          return "Please enter a valid number of residents.";
        }
        setQuoteDetails(prev => ({ ...prev, residents }));
        return null;
      }
    },
    {
      question: "How many meals per day do you need? (Default is 3)",
      handler: (message: string) => {
        const meals = parseInt(message);
        if (isNaN(meals) || meals <= 0 || meals > 5) {
          return "Please enter a number between 1 and 5.";
        }
        setQuoteDetails(prev => ({ ...prev, mealsPerDay: meals }));
        return null;
      }
    },
    {
      question: "What percentage of residents have special dietary requirements? (Enter 0-100)",
      handler: (message: string) => {
        const percentage = parseInt(message);
        if (isNaN(percentage) || percentage < 0 || percentage > 100) {
          return "Please enter a percentage between 0 and 100.";
        }
        setQuoteDetails(prev => ({ ...prev, dietaryRequirements: percentage }));
        return null;
      }
    }
  ];

  useEffect(() => {
    // Add initial AI message
    setMessages([{ content: steps[0].question, isAi: true }]);
  }, []);

  const handleMessage = async (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { content: message, isAi: false }]);

    // Process the message
    const error = steps[currentStep].handler(message);
    if (error) {
      setMessages(prev => [...prev, { content: error, isAi: true }]);
      return;
    }

    // Move to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setMessages(prev => [...prev, { content: steps[currentStep + 1].question, isAi: true }]);
    } else {
      // Final message
      setMessages(prev => [
        ...prev,
        {
          content: "Thank you! I've generated your quote below. You can export it or start over.",
          isAi: true,
        },
      ]);
    }
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your quote is being prepared for download.",
    });
    // TODO: Implement actual export functionality
  };

  const handleReset = () => {
    setMessages([{ content: steps[0].question, isAi: true }]);
    setQuoteDetails(initialQuoteDetails);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
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
            <ChatInput
              onSend={handleMessage}
              disabled={currentStep >= steps.length}
            />
          </div>
          <div className="space-y-4">
            <QuoteCalculator details={quoteDetails} />
            <div className="flex gap-2">
              <Button
                onClick={handleExport}
                className="flex-1"
                variant="outline"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={handleReset}
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