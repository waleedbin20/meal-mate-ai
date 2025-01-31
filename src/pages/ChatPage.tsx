import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import ChatSection from "@/components/ChatSection";
import { useQuery } from "@tanstack/react-query";
import { getQuoteHistory } from "@/services/quoteService";
import { QuoteHistory } from "@/types/quoteResponse";
import { mapQuoteHistoryToFormData } from "@/utils/mapQuoteHistoryToFormData";

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const [chatHistory, setChatHistory] = useState<QuoteHistory[]>([]);

  const { data, isLoading, error } = useQuery<QuoteHistory[], Error>(
    ["quoteHistory", id],
    () => getQuoteHistory(Number(id))
  );

  useEffect(() => {
    if (data) {
      setChatHistory(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Chat for Quote ID: {id}</h1>
        <ChatSection chatHistory={mapQuoteHistoryToFormData(chatHistory)} />
      </div>
    </div>
  );
}
