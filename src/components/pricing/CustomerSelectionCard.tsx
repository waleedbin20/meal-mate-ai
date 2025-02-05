
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { PriceData, CustomerData } from "./types";
import { PriceTable } from "./PriceTable";
import { useState } from "react";

interface CustomerSelectionCardProps {
  prices: PriceData[];
  selectedCustomer: CustomerData | null;
  mockCustomers: CustomerData[];
  onCustomerChange: (customerId: string) => void;
  editingPercentage: boolean;
  setEditingPercentage: (value: boolean) => void;
  handlePercentageChange: (value: string) => void;
  isLoading: boolean;
  hasChanges: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: () => void;
}

export const CustomerSelectionCard = ({
  prices,
  selectedCustomer,
  mockCustomers,
  onCustomerChange,
  editingPercentage,
  setEditingPercentage,
  handlePercentageChange,
  isLoading,
  hasChanges,
  isOpen,
  setIsOpen,
  onSave,
}: CustomerSelectionCardProps) => {
  const [hasSelectedCustomer, setHasSelectedCustomer] = useState(false);

  const calculateNewPrice = (price: number | null) => {
    if (price === null || !selectedCustomer) return null;
    const percentage = selectedCustomer.basePercentage / 100;
    return price + (price * percentage);
  };

  const calculateAdjustedPrice = (price: number | null) => {
    if (price === null) return null;
    return price.toFixed(2);
  };

  const handleCustomerSelect = (customerId: string) => {
    onCustomerChange(customerId);
    setHasSelectedCustomer(!!customerId);
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

  // Apply the pricing rules to transform the prices
  const transformedPrices = prices.map(price => {
    if (!selectedCustomer) return price;

    const isMiniMealExtra = price.category.toLowerCase() === 'mini meal extra';
    const newUnitPrice = calculateNewPrice(price.unitPrice);
    
    return {
      ...price,
      unitPrice: newUnitPrice !== null ? parseFloat(newUnitPrice.toFixed(2)) : price.unitPrice,
      standardPrice: isMiniMealExtra 
        ? (newUnitPrice !== null ? parseFloat(newUnitPrice.toFixed(2)) : price.standardPrice)
        : (price.standardPrice !== null ? parseFloat(calculateNewPrice(price.standardPrice)?.toFixed(2) || '0') : price.standardPrice),
      breakfastPrice: price.breakfastPrice !== null 
        ? parseFloat(calculateNewPrice(price.breakfastPrice)?.toFixed(2) || '0') 
        : price.breakfastPrice,
      dessertPrice: price.dessertPrice !== null 
        ? parseFloat(calculateNewPrice(price.dessertPrice)?.toFixed(2) || '0') 
        : price.dessertPrice,
      snackPrice: price.snackPrice !== null 
        ? parseFloat(calculateNewPrice(price.snackPrice)?.toFixed(2) || '0') 
        : price.snackPrice,
    };
  });

  console.log('CustomerSelectionCard render:', { 
    hasSelectedCustomer, 
    selectedCustomer, 
    pricesLength: prices.length,
    isLoading 
  });

  return (
    <Card className="p-4 md:p-6 bg-white shadow-sm border border-gray-200">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-purple-700">Customer Selection</h2>
          <p className="text-xs md:text-sm text-gray-500">Select customer and view adjusted prices</p>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
        ) : (
          <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
        )}
      </div>

      {isOpen && (
        <div className="mt-4 md:mt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-6">
            <div className="flex flex-col w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Selection</label>
              <select
                className="w-full md:w-64 rounded-md border border-gray-300 p-2 text-sm"
                value={selectedCustomer?.id || ''}
                onChange={(e) => handleCustomerSelect(e.target.value)}
              >
                <option value="">Select a customer</option>
                {mockCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            {hasSelectedCustomer && selectedCustomer && (
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
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          ) : hasSelectedCustomer && transformedPrices.length > 0 ? (
            <>
              <PriceTable 
                prices={transformedPrices}
                isEditable={false}
                calculateAdjustedPrice={calculateAdjustedPrice}
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
          ) : (
            <div className="text-center py-8 text-gray-500">
              Please select a customer to view prices
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
