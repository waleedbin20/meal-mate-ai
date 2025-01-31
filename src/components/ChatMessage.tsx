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
        "flex w-full items-start gap-2 px-4",
        animate && "animate-slide-in",
        isAi ? "bg-muted/50" : "bg-background"
      )}
    >
      <div className="flex min-h-[3.5rem] flex-1 flex-col justify-center gap-2 py-4">
        <div className="prose prose-sm max-w-none">
          <p className="mb-0 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}