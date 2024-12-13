import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Button } from "./ui/button";
import { PlusCircle, StopCircle } from "lucide-react";

interface ChatSectionProps {
  messages: Array<{ content: string; isAi: boolean }>;
  isProcessing: boolean;
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  onStopChat: () => void;
  isChatActive: boolean;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  isProcessing,
  onSendMessage,
  onNewChat,
  onStopChat,
  isChatActive,
}) => {
  return (
    <div className="lg:col-span-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl h-[600px] flex flex-col">
      <div className="p-6 border-b border-purple-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Care Home Meal Plan Quote
          </h1>
          <p className="text-sm text-gray-600">
            Chat with our AI to understand your quote better
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onNewChat}
            variant="outline"
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            New Quote
          </Button>
          {isChatActive && (
            <Button
              onClick={onStopChat}
              variant="outline"
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <StopCircle className="w-4 h-4" />
              End Chat
            </Button>
          )}
        </div>
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
      <ChatInput 
        onSend={onSendMessage} 
        disabled={isProcessing || !isChatActive} 
      />
    </div>
  );
};

export default ChatSection;