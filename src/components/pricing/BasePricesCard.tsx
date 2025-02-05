
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { PriceData } from "./types";
import { PriceTable } from "./PriceTable";

interface BasePricesCardProps {
  prices: PriceData[];
  onPriceChange: (index: number, field: keyof PriceData, value: string) => void;
  isLoading: boolean;
  hasChanges: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: () => void;
}

export const BasePricesCard = ({ 
  prices, 
  onPriceChange,
  isLoading,
  hasChanges,
  isOpen,
  setIsOpen,
  onSave
}: BasePricesCardProps) => {
  return (
    <Card className="p-4 md:p-6 bg-white shadow-sm border border-gray-200">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-purple-700">Base Prices</h2>
          <p className="text-xs md:text-sm text-gray-500">Manage base prices for all products</p>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
        ) : (
          <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
        )}
      </div>

      {isOpen && (
        <div className="mt-4 md:mt-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          ) : (
            <>
              <PriceTable 
                prices={prices}
                onPriceChange={onPriceChange}
                isEditable={true}
              />
              {hasChanges && (
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={onSave}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
};
