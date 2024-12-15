import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Bot } from "lucide-react";

const LoadingDots = () => (
  <span className="inline-flex items-center">
    <span className="animate-bounce delay-0">.</span>
    <span className="animate-bounce delay-150">.</span>
    <span className="animate-bounce delay-300">.</span>
  </span>
);

const ChatSkeleton = () => {
  return (
    <div className="flex w-full mb-4 items-start gap-2 animate-fade-in">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="max-w-[80%] space-y-4">
        <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-gradient-to-br from-[#F2FCE2] to-[#E5DEFF]">
          <div className="text-xs font-medium text-purple-700 mb-1">Quote AI</div>
          <p className="text-sm leading-relaxed text-gray-700">
            Quote AI is thinking<LoadingDots />
          </p>
        </div>
        <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
          <Skeleton className="h-4 w-[250px] bg-gray-200/70" />
          <Skeleton className="h-4 w-[200px] bg-gray-200/70 mt-2" />
          <Skeleton className="h-4 w-[150px] bg-gray-200/70 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;