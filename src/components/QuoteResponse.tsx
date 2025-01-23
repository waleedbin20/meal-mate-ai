import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { QuoteResponse } from "@/types/quoteResponse";
import { RefreshCw, Send } from "lucide-react";

interface QuoteResponseProps {
  response: QuoteResponse | null;
  onRetry: () => void;
  isLoading: boolean;
}

const QuoteResponseDisplay: React.FC<QuoteResponseProps> = ({ response, onRetry, isLoading }) => {
  if (!response) {
    return (
      <Card className="bg-white mt-6">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center justify-between">
            Quote Response
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry}
              disabled={isLoading}
              className="ml-2"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Try Again
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No quote response available. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  const { managerQuoteApproval, managerQuoteSummary, quoteDetails } = response;

  return (
    <Card className="bg-white mt-6">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center justify-between">
          Quote Response
          {!managerQuoteApproval && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry}
              disabled={isLoading}
              className="ml-2"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Try Again
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Summary</h4>
          <p className={`text-sm ${!managerQuoteApproval ? 'text-red-500' : 'text-green-500'}`}>
            {managerQuoteSummary}
          </p>
        </div>
        
        {quoteDetails && (
          <div className="space-y-2">
            <h4 className="font-medium">Cost Details</h4>
            <div className="text-sm">
              <p className="text-muted-foreground">Apetito Cost per Resident per Day</p>
              <p className="font-medium">£{quoteDetails.apetitoCostResidentPerDay.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="pt-4">
          <p className="text-sm text-muted-foreground mb-2">Submit this quote to Hubspot for processing</p>
          <Button className="w-full" variant="default">
            <Send className="h-4 w-4 mr-2" />
            Submit Quote to Hubspot
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteResponseDisplay;