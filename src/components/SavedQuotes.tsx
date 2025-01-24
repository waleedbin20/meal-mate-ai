import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, List } from "lucide-react";

// Mock data for demonstration - replace with actual data fetching
const mockSavedQuotes = [
  {
    id: 1,
    careHomeName: "Sunrise Care Home",
    createdAt: "2024-03-15",
    totalResidents: 45,
    status: "Approved",
  },
  {
    id: 2,
    careHomeName: "Golden Years Living",
    createdAt: "2024-03-14",
    totalResidents: 32,
    status: "Pending",
  },
  // Add more mock quotes as needed
];

const SavedQuotes = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <List className="h-4 w-4" />
          View Saved Quotes
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[540px]">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-bold">Saved Quotes</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="space-y-4">
            {mockSavedQuotes.map((quote) => (
              <Card
                key={quote.id}
                className="group transition-all hover:shadow-md hover:border-purple-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {quote.careHomeName}
                      </CardTitle>
                      <CardDescription>
                        Created on {new Date(quote.createdAt).toLocaleDateString()}
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
                    <span className="text-muted-foreground">
                      {quote.totalResidents} Residents
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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
      </SheetContent>
    </Sheet>
  );
};

export default SavedQuotes;