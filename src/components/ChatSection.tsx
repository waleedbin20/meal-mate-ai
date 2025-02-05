import React from "react";
import { Message } from "@/components/ui/message";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import ChatSkeleton from "./ChatSkeleton";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import SavedQuotes from "./SavedQuote";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { QuoteHistory } from "@/types/quoteResponse";

interface ChatSectionProps {
  messages: Array<{ content: string; isAi: boolean; versionNumber?: number }>;
  isProcessing: boolean;
  onShowForm: () => void;
  onGenerateQuote?: () => void;
  chatHistory?: QuoteHistory[];
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  isProcessing,
  onShowForm,
  onGenerateQuote,
  chatHistory,
}) => {
  const currentMessages = messages.slice(-2);
  const historyMessages = messages.slice(0, -2);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

  const totalMessages = isHistoryOpen ? messages.length : currentMessages.length;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl h-[calc(100vh-2rem)] md:h-[950px] flex flex-col">
      <div className="p-4 md:p-6 border-b border-purple-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="mb-4 md:mb-0 md:flex md:justify-between md:items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Quoting Assistant
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Create a quote new quote or retrieve a save quote
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
            <Button
              onClick={onGenerateQuote}
              variant="outline"
              className="flex items-center justify-center gap-2 bg-white hover:bg-purple-100 hover:text-purple-900 w-full md:w-auto"
            >
              New Quote
            </Button>
            <Button
              onClick={() => navigate(`/quote/${id}`)}
              variant="outline"
              className="flex items-center justify-center gap-2 bg-white hover:bg-purple-100 hover:text-purple-900 w-full md:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Edit Quote
            </Button>
            <SavedQuotes onClose={() => {}} />
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {historyMessages.length > 0 && (
            <Accordion type="single" collapsible className="w-full mb-8">
              <AccordionItem value="history" className="border-none">
                <AccordionTrigger
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className={`py-2 px-4 rounded-lg transition-all duration-300 ${isHistoryOpen
                    ? "bg-purple-100 text-purple-900"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    {isHistoryOpen ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    {isHistoryOpen ? "Hide" : "View"} Chat History ({totalMessages} message{totalMessages !== 1 ? 's' : ''})
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 animate-slide-in">
                  <div className="space-y-4">
                    {historyMessages.map((message, index) => (
                      <Message
                        key={index}
                        isAi={message.isAi}
                        className="animate-fade-in"
                      >
                        {message.content}
                      </Message>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {currentMessages.map((message, index) => (
            <Message
              key={`current-${index}`}
              isAi={message.isAi}
              className={index === currentMessages.length - 1 ? "animate-fade-in" : ""}
            >
              {message.content}
            </Message>
          ))}
          {isProcessing && <ChatSkeleton />}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSection;
