import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Button } from "./ui/button";
import { PlusCircle, StopCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import ChatSkeleton from "./ChatSkeleton";

interface ChatSectionProps {
  messages: Array<{ content: string; isAi: boolean }>;
  isProcessing: boolean;
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  onStopChat: () => void;
  isChatActive: boolean;
  onShowForm: () => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  isProcessing,
  onSendMessage,
  onNewChat,
  onStopChat,
  isChatActive,
  onShowForm,
}) => {
  const handleNewQuote = () => {
    onNewChat();
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl h-[calc(100vh-2rem)] md:h-[800px] flex flex-col">
      <div className="p-4 md:p-6 border-b border-purple-100">
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
              className="flex items-center justify-center gap-2 bg-white hover:bg-purple-100 w-full md:w-auto"
            >
              <PlusCircle className="w-4 h-4" />
              Create Quote Form
            </Button>
            <Button
              onClick={handleNewQuote}
              variant="outline"
              className="flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <PlusCircle className="w-4 h-4" />
              New Quote
            </Button>
            {isChatActive && (
              <Button
                onClick={onStopChat}
                variant="outline"
                className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 w-full md:w-auto"
              >
                <StopCircle className="w-4 h-4" />
                End Chat
              </Button>
            )}
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
      <ChatInput 
        onSend={onSendMessage} 
        disabled={isProcessing || !isChatActive} 
      />
    </div>
  );
};

export default ChatSection;