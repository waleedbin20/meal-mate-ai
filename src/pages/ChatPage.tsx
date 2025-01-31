import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import ChatSection from "@/components/ChatSection";
import { useQuery } from "@tanstack/react-query";
import { getQuoteHistoryById } from "@/services/quoteService";
import { QuoteHistory } from "@/types/quoteResponse";
import { mapQuoteHistoryToFormData } from "@/utils/mapQuoteHistoryToFormData";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 md:hidden z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <AppSidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-8">
        <h1 className="text-2xl font-bold mb-6">Chat for Quote ID: {id}</h1>
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <ChatSection chatHistory={chatHistory} />
        </div>
      </div>
    </div>
  );
}