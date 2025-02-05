
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { PriceData, CustomerData } from "./types";
import { PriceTable } from "./PriceTable";
import { useState } from "react";

interface CustomerSelectionCardProps {
  prices: PriceData[]; // prices from API for selected customer
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
  basePrices: PriceData[]; // Added prop for base prices
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
  basePrices,
}: CustomerSelectionCardProps) => {
  const [hasSelectedCustomer, setHasSelectedCustomer] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const calculateNewPrice = (basePrice: number | null) => {
    if (basePrice === null || !selectedCustomer) return null;
    const percentage = selectedCustomer.basePercentage / 100;
    return basePrice + (basePrice * percentage);
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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  // Transform base prices using the customer's percentage
  const transformedPrices = basePrices.map((basePrice, index) => {
    const apiPrice = prices[index] || {};
    const isMiniMealExtra = basePrice.category.toLowerCase() === 'mini meal extra';
    
    // Calculate new prices based on base prices
    const newUnitPrice = calculateNewPrice(basePrice.unitPrice);
    const newBreakfastPrice = calculateNewPrice(basePrice.breakfastPrice);
    const newDessertPrice = calculateNewPrice(basePrice.dessertPrice);
    const newSnackPrice = calculateNewPrice(basePrice.snackPrice);
    const newStandardPrice = isMiniMealExtra 
      ? newUnitPrice 
      : calculateNewPrice(basePrice.standardPrice);

    return {
      ...basePrice,
      unitPrice: newUnitPrice !== null ? parseFloat(newUnitPrice.toFixed(2)) : null,
      standardPrice: newStandardPrice !== null ? parseFloat(newStandardPrice.toFixed(2)) : null,
      breakfastPrice: newBreakfastPrice !== null ? parseFloat(newBreakfastPrice.toFixed(2)) : null,
      dessertPrice: newDessertPrice !== null ? parseFloat(newDessertPrice.toFixed(2)) : null,
      snackPrice: newSnackPrice !== null ? parseFloat(newSnackPrice.toFixed(2)) : null,
      // Store original API prices for "Old Price" display
      originalUnitPrice: apiPrice.unitPrice,
      originalStandardPrice: apiPrice.standardPrice,
      originalBreakfastPrice: apiPrice.breakfastPrice,
      originalDessertPrice: apiPrice.dessertPrice,
      originalSnackPrice: apiPrice.snackPrice,
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
                showOriginalPrices={true}
              />
              {hasChanges && (
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={handleSave}
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
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
