import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import ChatSkeleton from "./ChatSkeleton";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import SavedQuotes from "./SavedQuotes";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ChatSectionProps {
  messages: Array<{ content: string; isAi: boolean }>;
  isProcessing: boolean;
  onShowForm: () => void;
  onNewMessage?: (message: { content: string; isAi: boolean }) => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  isProcessing,
  onShowForm,
  onNewMessage,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleEditQuote = () => {
    if (id) {
      navigate(`/quote/${id}`);
    }
  };

  const handleSaveQuote = async () => {
    setIsSaving(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Quote saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save quote",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl h-[calc(100vh-2rem)] md:h-[800px] flex flex-col">
      <div className="p-4 md:p-6 border-b border-purple-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="mb-4 md:mb-0 md:flex md:justify-between md:items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Care Home Meal Plan Quote
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Chat with our AI to understand your quote better
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
            <Button
              onClick={onShowForm}
              variant="outline"
              className="flex items-center justify-center gap-2 bg-white hover:bg-purple-100 hover:text-purple-900 w-full md:w-auto"
            >
              Create Quote Form
            </Button>
            <Button
              onClick={handleEditQuote}
              variant="outline"
              className="flex items-center justify-center gap-2 bg-white hover:bg-purple-100 hover:text-purple-900 w-full md:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Edit Quote
            </Button>
            <SavedQuotes />
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 bg-white hover:bg-purple-100 hover:text-purple-900 w-full md:w-auto"
              onClick={handleSaveQuote}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Quote
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              isAi={message.isAi}
              content={message.content}
              animate={index === messages.length - 1}
            />
          ))}
          {isProcessing && <ChatSkeleton />}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSection;