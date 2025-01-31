import React, { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

interface ChatSectionProps {
  chatHistory?: any[];
}

const ChatSection: React.FC<ChatSectionProps> = ({ chatHistory = [] }) => {
  const [messages, setMessages] = useState(chatHistory);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { content: input, isAi: false, versionNumber: 1 }]);
      setInput("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        {loading && <Skeleton className="h-10 w-full" />}
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            content={msg.content} 
            isAi={msg.isAi} 
            versionNumber={msg.versionNumber}
            quoteId={1}
          />
        ))}
      </ScrollArea>
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
        />
        <Button onClick={handleSendMessage} className="ml-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatSection;