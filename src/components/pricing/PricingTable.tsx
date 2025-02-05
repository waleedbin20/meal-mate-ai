
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
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
import { BasePricesCard } from "./BasePricesCard";
import { CustomerSelectionCard } from "./CustomerSelectionCard";
import { PriceData, CustomerData } from "./types";
import { fetchBasePrices, fetchCustomerPrices, updatePricing } from "@/services/pricingService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const mockCustomers: CustomerData[] = [
  { id: 2406, name: "National", basePercentage: -3.5 },
  { id: 2468, name: "Regional", basePercentage: 0 },
  { id: 2408, name: "Independent", basePercentage: 7 },
  { id: 2407, name: "Small Groups", basePercentage: 3.5 }
];

export const PricingTable = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [hasBasePriceChanges, setHasBasePriceChanges] = useState(false);
  const [hasCustomerPriceChanges, setHasCustomerPriceChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [editingPercentage, setEditingPercentage] = useState(false);
  const [isBasePricesOpen, setIsBasePricesOpen] = useState(false);
  const [isCustomerSelectOpen, setIsCustomerSelectOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: prices = [], isLoading: isLoadingBasePrices, error: basePricesError } = useQuery({
    queryKey: ['basePrices'],
    queryFn: fetchBasePrices,
    enabled: isBasePricesOpen,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching base prices:', error);
        toast({
          title: "Error",
          description: "Failed to fetch base prices. Please try again.",
          variant: "destructive",
        });
      }
    }
  });

  const { data: customerPrices = [], isLoading: isLoadingCustomerPrices, error: customerPricesError } = useQuery({
    queryKey: ['customerPrices', selectedCustomer?.id],
    queryFn: () => selectedCustomer ? fetchCustomerPrices(selectedCustomer.id) : Promise.resolve([]),
    enabled: !!selectedCustomer?.id,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching customer prices:', error);
        toast({
          title: "Error",
          description: "Failed to fetch customer prices. Please try again.",
          variant: "destructive",
        });
      }
    }
  });

  const transformPricesToPayload = (prices: PriceData[], customerId: number) => {
    const mealTypes = ["Unit", "Standard", "Breakfast", "Dessert", "Snacks"];
    
    return mealTypes.map(mealType => {
      const getMealTypeValue = (price: PriceData | undefined, field: keyof PriceData): number => {
        if (!price || price[field] === null || price[field] === undefined) {
          return 0;
        }
        const value = price[field];
        return typeof value === 'number' ? Number(value.toFixed(2)) : 0;
      };

      return {
        customerId,
        mealType,
        level3: getMealTypeValue(prices[0], getMealTypeField(mealType)),
        level4: getMealTypeValue(prices[1], getMealTypeField(mealType)),
        level5: getMealTypeValue(prices[2], getMealTypeField(mealType)),
        level6: getMealTypeValue(prices[3], getMealTypeField(mealType)),
        allergenFree: getMealTypeValue(prices[4], getMealTypeField(mealType)),
        fingerFoods: getMealTypeValue(prices[5], getMealTypeField(mealType)),
        miniMealExtra: getMealTypeValue(prices[6], getMealTypeField(mealType)),
        caribbean: getMealTypeValue(prices[7], getMealTypeField(mealType)),
        halal: getMealTypeValue(prices[8], getMealTypeField(mealType)),
        kosher: getMealTypeValue(prices[9], getMealTypeField(mealType)),
      };
    });
  };

  const getMealTypeField = (mealType: string): keyof PriceData => {
    switch (mealType) {
      case "Unit": return "unitPrice";
      case "Standard": return "standardPrice";
      case "Breakfast": return "breakfastPrice";
      case "Dessert": return "dessertPrice";
      case "Snacks": return "snackPrice";
      default: return "unitPrice";
    }
  };

  const updatePricesMutation = useMutation({
    mutationFn: (data: { prices: PriceData[], customerId: number }) => {
      const { prices, customerId } = data;
      console.log(`Updating prices for customer ID: ${customerId}`);
      const transformedPayload = transformPricesToPayload(prices, customerId);
      console.log('Transformed payload:', transformedPayload);
      return updatePricing(transformedPayload, customerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basePrices'] });
      queryClient.invalidateQueries({ queryKey: ['customerPrices'] });
      toast({
        title: "Success",
        description: "Prices have been updated successfully",
      });
      setHasBasePriceChanges(false);
      setHasCustomerPriceChanges(false);
      setShowConfirmDialog(false);
    },
    onError: (error) => {
      console.error('Error updating prices:', error);
      toast({
        title: "Error",
        description: "Failed to update prices. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handlePriceChange = (index: number, field: keyof PriceData, value: string) => {
    console.log('Handling price change:', { index, field, value });
    const newPrices = [...prices];
    const parsedValue = value === "" ? null : parseFloat(value);
    
    newPrices[index] = {
      ...newPrices[index],
      [field]: parsedValue,
    };

    if (newPrices[index].category === 'Mini Meal Extra' && field === 'unitPrice') {
      newPrices[index].standardPrice = parsedValue;
    }

    queryClient.setQueryData(['basePrices'], newPrices);
    setHasBasePriceChanges(true);
  };

  const handleCustomerChange = (customerId: string) => {
    console.log('Handling customer change:', customerId);
    const customer = customerId ? mockCustomers.find((c) => c.id === parseInt(customerId)) : null;
    setSelectedCustomer(customer);
    setHasCustomerPriceChanges(false);
  };

  const handlePercentageChange = (value: string) => {
    if (!selectedCustomer) return;
    
    const newCustomer = { ...selectedCustomer };
    
    if (value === '' || value === '-') {
      newCustomer.basePercentage = value === '' ? 0 : -0;
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        newCustomer.basePercentage = numValue;
      }
    }
    
    setSelectedCustomer(newCustomer);
    setHasCustomerPriceChanges(true);
  };

  const handleBasePriceSave = () => {
    console.log('Saving base prices...');
    const customerId = 999; // Always use 999 for base prices
    console.log('Using customer ID:', customerId);
    updatePricesMutation.mutate({ prices, customerId });
  };

  const handleCustomerPriceSave = () => {
    if (!selectedCustomer) return;
    const transformedPrices = prices.map(basePrice => {
      const percentage = selectedCustomer.basePercentage / 100;
      return {
        ...basePrice,
        unitPrice: basePrice.unitPrice !== null ? parseFloat((basePrice.unitPrice + (basePrice.unitPrice * percentage)).toFixed(2)) : null,
        standardPrice: basePrice.standardPrice !== null ? parseFloat((basePrice.standardPrice + (basePrice.standardPrice * percentage)).toFixed(2)) : null,
        breakfastPrice: basePrice.breakfastPrice !== null ? parseFloat((basePrice.breakfastPrice + (basePrice.breakfastPrice * percentage)).toFixed(2)) : null,
        dessertPrice: basePrice.dessertPrice !== null ? parseFloat((basePrice.dessertPrice + (basePrice.dessertPrice * percentage)).toFixed(2)) : null,
        snackPrice: basePrice.snackPrice !== null ? parseFloat((basePrice.snackPrice + (basePrice.snackPrice * percentage)).toFixed(2)) : null,
      };
    });
    updatePricesMutation.mutate({ prices: transformedPrices, customerId: selectedCustomer.id });
  };

  useEffect(() => {
    if (selectedCustomer?.id) {
      queryClient.invalidateQueries({ queryKey: ['customerPrices', selectedCustomer.id] });
    }
  }, [selectedCustomer?.id, queryClient]);

  return (
    <div className="space-y-4 md:space-y-6">
      <BasePricesCard
        prices={prices}
        onPriceChange={handlePriceChange}
        isLoading={isLoadingBasePrices}
        hasChanges={hasBasePriceChanges}
        isOpen={isBasePricesOpen}
        setIsOpen={setIsBasePricesOpen}
        onSave={handleBasePriceSave}
      />

      <CustomerSelectionCard
        prices={customerPrices}
        selectedCustomer={selectedCustomer}
        mockCustomers={mockCustomers}
        onCustomerChange={handleCustomerChange}
        editingPercentage={editingPercentage}
        setEditingPercentage={setEditingPercentage}
        handlePercentageChange={handlePercentageChange}
        isLoading={isLoadingCustomerPrices}
        hasChanges={hasCustomerPriceChanges}
        isOpen={isCustomerSelectOpen}
        setIsOpen={setIsCustomerSelectOpen}
        onSave={handleCustomerPriceSave}
        basePrices={prices}
      />

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to save these changes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
            <AlertDialogCancel className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={selectedCustomer ? handleCustomerPriceSave : handleBasePriceSave}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
