import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, List, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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

const SavedQuotes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quoteToDelete, setQuoteToDelete] = useState<number | null>(null);

  const filteredQuotes = mockSavedQuotes.filter((quote) =>
    quote.careHomeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (quoteId: number) => {
    // Here you would implement the actual deletion logic
    console.log("Deleting quote:", quoteId);
    toast.success("Quote deleted successfully");
    setQuoteToDelete(null);
  };

  return (
    <>
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
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search quotes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
            <div className="space-y-4">
              {filteredQuotes.map((quote) => (
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
                        <CardDescription className="space-y-1">
                          <p>Created on {new Date(quote.createdAt).toLocaleDateString()}</p>
                          <p className="text-purple-600">Created by {quote.creatorName}</p>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => console.log("View quote", quote.id)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setQuoteToDelete(quote.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

      <AlertDialog open={quoteToDelete !== null} onOpenChange={() => setQuoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this quote?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the quote.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => quoteToDelete && handleDelete(quoteToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SavedQuotes;