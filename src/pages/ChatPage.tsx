import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import ChatSection from "@/components/ChatSection";
import { useQuery } from "@tanstack/react-query";
import { getQuoteHistoryById } from "@/services/quoteService";
import { QuoteHistory } from "@/types/quoteResponse";
import { mapQuoteHistoryToFormData } from "@/utils/mapQuoteHistoryToFormData";

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const [chatHistory, setChatHistory] = useState<QuoteHistory[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["quoteHistory", id],
    queryFn: () => getQuoteHistoryById(Number(id)),
    enabled: !!id
  });

  useEffect(() => {
    if (data) {
      setChatHistory(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;

  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Chat for Quote ID: {id}</h1>
        <ChatSection chatHistory={chatHistory} />
      </div>
    </div>
  );
}