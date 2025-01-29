import React, { useState, useEffect } from "react";
import ChatSection from "@/components/ChatSection";
import { useParams, useNavigate } from "react-router-dom";
import { getQuoteById } from "@/services/quoteApiService";
import { fetchQuoteHistory } from "@/services/quoteHistoryService";
import { useToast } from "@/hooks/use-toast";
import { formatQuoteSummary } from "@/utils/formatQuoteSummary";
import type { QuoteFormData } from "@/components/quote-form/types";
import { QuoteHistoryType } from "@/types/quoteHistory";
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
        content: item.type === QuoteHistoryType.Request 
          ? formatQuoteSummary({
              careHomeName: item.careHomeName,
              numberOfResidents: item.numberOfResidents || 0,
              numberOfDiningRooms: item.numberOfDiningRooms || 0,
              selectedMenu: item.selectedMenu,
              extraMealOptions: item.extraMealOptions,
              currentAnnualFoodSpend: item.currentAnnualFoodSpend || 0,
              estimatedNonApetitoSpend: item.estimatedNonApetitoSpend || 0,
              numberOfRoles: item.numberOfRoles || 0,
              currentAnnualLabourCost: item.currentAnnualLabourCost || 0,
              apetitoEstimatedAnnualLabourCost: item.apetitoEstimatedAnnualLabourCost || 0,
            } as QuoteFormData)
          : `Version ${item.versionNumber} Quote Summary:\n\nCost per resident per day: £${item.costPerDayPerResident}\nMenu order total: £${item.menuOrderTotal}\nAnnual labor savings: £${item.annualLaborSavings}\nAnnual food savings: £${item.annualFoodSavings}\nTotal annual savings: £${item.annualTotalSavings}`,
        isAi: item.type === QuoteHistoryType.Response,
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