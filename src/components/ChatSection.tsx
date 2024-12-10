import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { QuoteFormData } from "./quote-form/types";
import { formatQuoteSummary } from "@/utils/formatQuoteSummary";

interface ChatSectionProps {
  messages: Array<{ content: string; isAi: boolean }>;
  isProcessing: boolean;
  onSendMessage: (message: string) => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  isProcessing,
  onSendMessage,
}) => {
  return (
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
      <ChatInput onSend={onSendMessage} disabled={isProcessing} />
    </div>
  );
};

export default ChatSection;