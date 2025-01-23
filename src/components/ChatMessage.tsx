import React from "react";
import { cn } from "@/lib/utils";
import { Bot, Save, Send } from "lucide-react";
import { Button } from "./ui/button";

interface ChatMessageProps {
  isAi: boolean;
  content: string;
  animate?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isAi, content, animate = true }) => {
  // Function to handle content that may contain HTML or needs formatting
  const formatContent = (text: string) => {
    // Check if the content appears to contain HTML tags
    const containsHtml = /<[a-z][\s\S]*>/i.test(text);
    
    if (containsHtml) {
      // If it contains HTML, render it directly
      return <div dangerouslySetInnerHTML={{ __html: text }} />;
    } else {
      // If it's plain text, apply our custom formatting
      // Make numbers and £ symbol bold
      const textWithBoldElements = text.replace(/\b(\d+|£)\b/g, '<strong>$1</strong>');
      
      // Split by any number of consecutive newlines
      return textWithBoldElements.split(/\n+/).map((paragraph, index, array) => (
        <React.Fragment key={index}>
          <span dangerouslySetInnerHTML={{ __html: paragraph }} />
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ));
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
          <div className="mt-3 space-y-3 max-w-sm">
            <div>
              <p className="text-sm text-muted-foreground mb-1.5">Save this quote for later reference</p>
              <Button className="w-full" variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Quote
              </Button>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1.5">Submit this quote to Hubspot for processing</p>
              <Button className="w-full" variant="default" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Submit Quote to Hubspot
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;