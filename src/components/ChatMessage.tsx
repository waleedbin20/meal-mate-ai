import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Bot, Save, Send } from "lucide-react";
import { Button } from "./ui/button";
import { getAllQuotes, saveQuote } from "@/services/quoteService";
import { useQueryClient } from "@tanstack/react-query";

interface ChatMessageProps {
  isAi: boolean;
  content: string;
  animate?: boolean;
  quoteId: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isAi, content, animate = true, quoteId }) => {
  const queryClient = useQueryClient();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formatContent = (text: string) => {
    const containsHtml = /<[a-z][\s\S]*>/i.test(text);

    if (containsHtml) {
      return <div dangerouslySetInnerHTML={{ __html: text }} />;
    } else {
      const textWithBoldElements = text.replace(/\b(\d+|£)\b/g, '<strong>$1</strong>');

      return textWithBoldElements.split(/\n+/).map((paragraph, index, array) => (
        <React.Fragment key={index}>
          <span dangerouslySetInnerHTML={{ __html: paragraph }} />
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ));
    }
  };
  const handleSaveQuote = async () => {
    setIsLoading(true);
    try {
      await saveQuote(quoteId, 'Approved')
      setIsSaved(true);
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      console.log('Quote saved successfully');
    } catch (error) {
      console.error('Error saving quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full mb-4 items-start gap-2",
        isAi ? "justify-start" : "justify-end",
        animate && "animate-fade-in"
      )}
    >
      {isAi && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      <div className="flex flex-col max-w-[80%]">
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 shadow-sm whitespace-pre-line",
            isAi
              ? "bg-gradient-to-br from-[#F2FCE2] to-[#E5DEFF] text-gray-800"
              : "bg-gradient-to-br from-[#8B5CF6] to-[#6E59A5] text-white"
          )}
        >
          {isAi && <div className="text-xs font-medium text-purple-700 mb-1">Quote AI</div>}
          <div className="text-sm leading-relaxed [&_ul]:pl-4 [&_ul]:list-disc [&_p]:mb-2 [&_li]:mb-1">
            {formatContent(content)}
          </div>
        </div>
        {isAi && (
          <div className="mt-3 flex flex-col sm:flex-row gap-4 max-w-sm sm:max-w-md">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1.5">Save this quote for later reference</p>
              <Button
                className={`w-full ${isSaved ? 'bg-green-100 text-green-700' : 'bg-white text-black'}`}
                variant="outline"
                size="sm"
                onClick={handleSaveQuote}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Quote
              </Button>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1.5">Submit this quote to HubSpot for processing</p>
              <Button className="w-full bg-slate-700 hover:bg-purple-100 hover:text-purple-900" variant="default" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Submit Quote
              </Button>
            </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default ChatMessage;