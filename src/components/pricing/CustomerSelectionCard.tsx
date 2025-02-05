
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PriceData, CustomerData } from "./types";
import { PriceTable } from "./PriceTable";

interface CustomerSelectionCardProps {
  prices: PriceData[];
  selectedCustomer: CustomerData;
  mockCustomers: CustomerData[];
  onCustomerChange: (customerId: string) => void;
  editingPercentage: boolean;
  setEditingPercentage: (value: boolean) => void;
  handlePercentageChange: (value: string) => void;
}

export const CustomerSelectionCard = ({
  prices,
  selectedCustomer,
  mockCustomers,
  onCustomerChange,
  editingPercentage,
  setEditingPercentage,
  handlePercentageChange,
}: CustomerSelectionCardProps) => {
  const [isCustomerSelectOpen, setIsCustomerSelectOpen] = useState(false);

  const calculateAdjustedPrice = (price: number | null) => {
    if (price === null) return null;
    const multiplier = 1 + (selectedCustomer.basePercentage / 100);
    return (price * multiplier).toFixed(2);
  };

  const handlePercentageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || value === '-') {
      handlePercentageChange(value);
      return;
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      handlePercentageChange(value);
    }
  };

  return (
    <Card className="p-4 md:p-6 bg-white shadow-sm border border-gray-200">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsCustomerSelectOpen(!isCustomerSelectOpen)}
      >
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-purple-700">Customer Selection</h2>
          <p className="text-xs md:text-sm text-gray-500">Select customer and view adjusted prices</p>
        </div>
        {isCustomerSelectOpen ? (
          <ChevronUp className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
        ) : (
          <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
        )}
      </div>

      {isCustomerSelectOpen && (
        <div className="mt-4 md:mt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-6">
            <div className="flex flex-col w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Selection</label>
              <select
                className="w-full md:w-64 rounded-md border border-gray-300 p-2 text-sm"
                value={selectedCustomer.id}
                onChange={(e) => onCustomerChange(e.target.value)}
              >
                {mockCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Percentage</label>
              <div className="flex items-center gap-2">
                {editingPercentage ? (
                  <Input
                    type="text"
                    value={selectedCustomer.basePercentage}
                    onChange={handlePercentageInputChange}
                    className="w-20 text-sm"
                    onBlur={() => setEditingPercentage(false)}
                    autoFocus
                  />
                ) : (
                  <div
                    className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm"
                    onClick={() => setEditingPercentage(true)}
                  >
                    {selectedCustomer.basePercentage}%
                  </div>
                )}
              </div>
            </div>
          </div>

          <PriceTable 
            prices={prices}
            isEditable={false}
            calculateAdjustedPrice={calculateAdjustedPrice}
          />
        </div>
      )}
    </Card>
  );
};
