import { cn } from "@/lib/utils";

export interface ChatMessageProps {
  content: string;
  isAi: boolean;
  animate?: boolean;
  quoteId: number;
  versionNumber: number;
}

export function ChatMessage({ content, isAi, animate = true, versionNumber }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-2 px-4 py-3 rounded-lg",
        animate && "animate-slide-in",
        isAi ? "bg-purple-50 border border-purple-100" : "bg-white border border-gray-100"
      )}
    >
      <div className="flex min-h-[2rem] flex-1 flex-col justify-center gap-2">
        <div className="prose prose-sm max-w-none">
          <p className="text-sm md:text-base leading-relaxed text-gray-800">{content}</p>
        </div>
      </div>
    </div>
  );
}