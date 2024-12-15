import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Bot } from "lucide-react";

const ChatSkeleton = () => {
  return (
    <div className="flex w-full mb-4 items-start gap-2 animate-fade-in">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm bg-gradient-to-br from-[#F2FCE2] to-[#E5DEFF]">
        <div className="text-xs font-medium text-purple-700 mb-1">Quote AI</div>
        <Skeleton className="h-4 w-[250px] bg-gray-200" />
        <Skeleton className="h-4 w-[200px] bg-gray-200 mt-2" />
      </div>
    </div>
  );
};

export default ChatSkeleton;