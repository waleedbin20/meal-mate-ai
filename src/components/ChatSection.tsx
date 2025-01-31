import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "./ui/scroll-area";
import ChatInput from "./ChatInput";

interface ChatSectionProps {
  chatHistory?: any[];
}

const ChatSection: React.FC<ChatSectionProps> = ({ chatHistory = [] }) => {
  const [messages, setMessages] = useState(chatHistory);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (message.trim() === "") return;

    setLoading(true);
    setMessages((prev) => [...prev, { content: message, isAi: false, versionNumber: 1 }]);
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        content: "This is a simulated AI response.", 
        isAi: true, 
        versionNumber: 1 
      }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)]">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-2 p-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                content={msg.content}
                isAi={msg.isAi}
                versionNumber={msg.versionNumber}
                quoteId={1}
              />
            ))}
            {loading && (
              <ChatMessage
                content="Typing..."
                isAi={true}
                versionNumber={1}
                quoteId={1}
              />
            )}
          </div>
        </ScrollArea>
      </div>
      <ChatInput onSend={handleSendMessage} disabled={loading} />
    </div>
  );
};

export default ChatSection;