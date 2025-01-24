import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for demonstration - replace with actual data fetching
const mockSavedQuotes = [
  {
    id: 1,
    careHomeName: "Sunrise Care Home",
    creatorName: "John Smith",
    createdAt: "2024-03-15",
    totalResidents: 45,
    status: "Approved",
  },
  {
    id: 2,
    careHomeName: "Golden Years Living",
    creatorName: "Sarah Johnson",
    createdAt: "2024-03-14",
    totalResidents: 32,
    status: "Pending",
  },
];

const SavedQuotesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuotes = mockSavedQuotes.filter((quote) =>
    quote.careHomeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Saved Quotes
              </h1>
              <p className="text-gray-600">View and manage your saved quotes</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search quotes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="grid gap-4">
              {filteredQuotes.map((quote) => (
                <Card
                  key={quote.id}
                  className="group transition-all hover:shadow-lg hover:border-purple-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl font-semibold">
                          {quote.careHomeName}
                        </CardTitle>
                        <CardDescription className="space-y-1">
                          <p>Created on {new Date(quote.createdAt).toLocaleDateString()}</p>
                          <p className="text-purple-600">Created by {quote.creatorName}</p>
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => console.log("View quote", quote.id)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="space-x-4">
                        <span className="text-muted-foreground">
                          {quote.totalResidents} Residents
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          quote.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {quote.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default SavedQuotesPage;