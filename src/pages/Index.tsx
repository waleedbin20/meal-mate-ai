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
  careHomeName?: string;
  diningRooms?: {
    name: string;
    standardMeals: number;
    allergyFreeMeals: number;
    fingerMeals: number;
  }[];
  menuType?: "Silver" | "Platinum";
}

const initialQuoteDetails: QuoteDetails = {
  residents: 0,
  mealsPerDay: 3,
  dietaryRequirements: 0,
  pricePerMeal: 5,
  careHomeName: "",
  diningRooms: [],
  menuType: "Silver",
};

const Index = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails>(initialQuoteDetails);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const steps = [
    {
      question: "👋 Welcome to the Care Home Meal Plan Quote Generator! To get started, what's the name of your care home?",
      handler: (message: string) => {
        if (!message.trim()) {
          return "Please enter a valid care home name.";
        }
        setQuoteDetails(prev => ({ ...prev, careHomeName: message.trim() }));
        return null;
      }
    },
    {
      question: "🏢 How many dining rooms do you have in your facility?",
      handler: (message: string) => {
        const rooms = parseInt(message);
        if (isNaN(rooms) || rooms <= 0 || rooms > 10) {
          return "Please enter a number between 1 and 10.";
        }
        setQuoteDetails(prev => ({
          ...prev,
          diningRooms: Array(rooms).fill({
            name: "",
            standardMeals: 0,
            allergyFreeMeals: 0,
            fingerMeals: 0
          })
        }));
        return null;
      }
    },
    {
      question: "🍽️ What type of menu would you prefer? Reply with 'Silver' or 'Platinum'",
      handler: (message: string) => {
        const type = message.toLowerCase();
        if (type !== "silver" && type !== "platinum") {
          return "Please choose either Silver or Platinum menu type.";
        }
        setQuoteDetails(prev => ({
          ...prev,
          menuType: type.charAt(0).toUpperCase() + type.slice(1) as "Silver" | "Platinum",
          pricePerMeal: type === "silver" ? 5 : 7
        }));
        return null;
      }
    },
    {
      question: "🥗 What percentage of residents have special dietary requirements? (Enter 0-100)",
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
      // Final message with summary
      const summary = `
📋 Quote Summary for ${quoteDetails.careHomeName}:
• Menu Type: ${quoteDetails.menuType}
• Dining Rooms: ${quoteDetails.diningRooms?.length || 0}
• Dietary Requirements: ${quoteDetails.dietaryRequirements}%

You can now download your quote or start over to make adjustments.`;
      
      setMessages(prev => [
        ...prev,
        { content: summary, isAi: true },
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
            <div className="p-4 border-b">
              <h1 className="text-2xl font-semibold text-primary">Care Home Meal Plan Quote</h1>
              <p className="text-sm text-muted-foreground">Chat with our AI to generate your custom quote</p>
            </div>
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
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Progress</h2>
              <div className="space-y-2">
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
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