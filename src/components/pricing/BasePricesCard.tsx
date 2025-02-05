
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PriceData } from "./types";
import { PriceTable } from "./PriceTable";

interface BasePricesCardProps {
  prices: PriceData[];
  onPriceChange: (index: number, field: keyof PriceData, value: string) => void;
}

export const BasePricesCard = ({ prices, onPriceChange }: BasePricesCardProps) => {
  const [isBasePricesOpen, setIsBasePricesOpen] = useState(false);

  return (
    <Card className="p-4 md:p-6 bg-white shadow-sm border border-gray-200">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsBasePricesOpen(!isBasePricesOpen)}
      >
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-purple-700">Base Prices</h2>
          <p className="text-xs md:text-sm text-gray-500">Manage base prices for all products</p>
        </div>
        {isBasePricesOpen ? (
          <ChevronUp className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
        ) : (
          <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
        )}
      </div>

      {isBasePricesOpen && (
        <div className="mt-4 md:mt-6">
          <PriceTable 
            prices={prices}
            onPriceChange={onPriceChange}
            isEditable={true}
          />
        </div>
      )}
    </Card>
  );
};
