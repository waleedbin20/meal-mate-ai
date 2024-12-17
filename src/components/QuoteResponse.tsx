import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { QuoteResponse } from "@/types/quoteResponse";
import { RefreshCw } from "lucide-react";

interface QuoteResponseProps {
  response: QuoteResponse;
  onRetry: () => void;
  isLoading: boolean;
}

const QuoteResponseDisplay: React.FC<QuoteResponseProps> = ({ response, onRetry, isLoading }) => {
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
        
        <div className="space-y-2">
          <h4 className="font-medium">Cost Details</h4>
          <div className="text-sm">
            <p className="text-muted-foreground">Apetito Cost per Resident per Day</p>
            <p className="font-medium">£{quoteDetails.apetitoCostResidentPerDay.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteResponseDisplay;