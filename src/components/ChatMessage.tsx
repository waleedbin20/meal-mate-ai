import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  isAi: boolean;
  content: string;
  animate?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isAi, content, animate = true }) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isAi ? "justify-start" : "justify-end",
        animate && "animate-fade-in"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isAi
            ? "bg-accent text-accent-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;