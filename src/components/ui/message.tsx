import React from "react";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface MessageProps {
  children: React.ReactNode;
  isAi?: boolean;
  className?: string;
}

export const Message = ({ children, isAi = false, className }: MessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 items-start gap-2",
        isAi ? "justify-start" : "justify-end",
        className
      )}
    >
      {isAi && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={cn(
          "rounded-2xl px-4 py-2.5 shadow-sm",
          isAi
            ? "bg-gradient-to-br from-[#F2FCE2] to-[#E5DEFF] text-gray-800"
            : "bg-gradient-to-br from-[#8B5CF6] to-[#6E59A5] text-white"
        )}
      >
        {isAi && <div className="text-xs font-medium text-purple-700 mb-1">Quote AI</div>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};