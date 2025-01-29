import React, { useState, useEffect } from "react";
import ChatSection from "@/components/ChatSection";
import { useParams, useNavigate } from "react-router-dom";
import { getQuoteById } from "@/services/quoteApiService";
import { fetchQuoteHistory } from "@/services/quoteHistoryService";
import { useToast } from "@/hooks/use-toast";
import { formatQuoteSummary } from "@/utils/formatQuoteSummary";
import { QuoteFormData } from "@/components/quote-form/types";
import { useQuery } from "@tanstack/react-query";

const ChatPage = () => {
  const [messages, setMessages] = useState<Array<{ content: string; isAi: boolean }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteFormData | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: historyData } = useQuery({
    queryKey: ["quoteHistory", id],
    queryFn: () => (id ? fetchQuoteHistory(parseInt(id)) : null),
    enabled: !!id,
  });

  useEffect(() => {
    if (historyData?.data) {
      const formattedMessages = historyData.data.map(item => ({
        content: formatQuoteSummary(item),
        isAi: item.type === 1,
      }));
      setMessages(formattedMessages);
    }
  }, [historyData]);

  const handleShowForm = () => {
    navigate(`/quote/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
      <div className="container mx-auto py-4 px-4 md:py-8 md:px-8">
        <div className="max-w-5xl mx-auto w-full">
          <ChatSection
            messages={messages}
            isProcessing={isProcessing}
            onShowForm={handleShowForm}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;