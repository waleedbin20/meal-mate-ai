import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  { id: 2406, name: "National", basePercentage: 10 },
  { id: 2468, name: "Regional", basePercentage: 15 },
  { id: 2408, name: "Independent", basePercentage: 20 },
  { id: 2407, name: "Small Groups", basePercentage: 25 }
];

export const PricingTable = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData>(mockCustomers[0]);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [editingPercentage, setEditingPercentage] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: prices = [], isLoading: isLoadingBasePrices, error: basePricesError } = useQuery({
    queryKey: ['basePrices'],
    queryFn: fetchBasePrices,
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

  const { data: customerPrices, isLoading: isLoadingCustomerPrices, error: customerPricesError } = useQuery({
    queryKey: ['customerPrices', selectedCustomer.id],
    queryFn: () => fetchCustomerPrices(selectedCustomer.id),
    enabled: !!selectedCustomer.id,
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

  const updatePricesMutation = useMutation({
    mutationFn: (updatedPrices: PriceData[]) => updatePricing(updatedPrices, selectedCustomer.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basePrices'] });
      queryClient.invalidateQueries({ queryKey: ['customerPrices'] });
      toast({
        title: "Success",
        description: "Prices have been updated successfully",
      });
      setHasChanges(false);
      setShowConfirmDialog(false);
    },
    onError: (error) => {
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
    newPrices[index] = {
      ...newPrices[index],
      [field]: value === "" ? null : parseFloat(value),
    };
    queryClient.setQueryData(['basePrices'], newPrices);
    setHasChanges(true);
  };

  const handlePercentageChange = (value: string) => {
    console.log('Handling percentage change:', value);
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
    setHasChanges(true);
  };

  const handleCustomerChange = (customerId: string) => {
    console.log('Handling customer change:', customerId);
    const customer = mockCustomers.find((c) => c.id === parseInt(customerId));
    if (customer) {
      setSelectedCustomer(customer);
      queryClient.invalidateQueries({ queryKey: ['customerPrices', parseInt(customerId)] });
    }
  };

  const handleSave = () => {
    updatePricesMutation.mutate(prices);
  };

  if (isLoadingBasePrices || isLoadingCustomerPrices) {
    return <div>Loading...</div>;
  }

  if (basePricesError || customerPricesError) {
    return <div>Error loading prices. Please try again.</div>;
  }

  console.log('Rendering PricingTable with:', {
    prices,
    customerPrices,
    selectedCustomer
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <BasePricesCard
        prices={prices}
        onPriceChange={handlePriceChange}
      />

      <CustomerSelectionCard
        prices={customerPrices || prices}
        selectedCustomer={selectedCustomer}
        mockCustomers={mockCustomers}
        onCustomerChange={handleCustomerChange}
        editingPercentage={editingPercentage}
        setEditingPercentage={setEditingPercentage}
        handlePercentageChange={handlePercentageChange}
      />

      {hasChanges && (
        <div className="flex justify-end mt-4 md:mt-6">
          <Button 
            onClick={() => setShowConfirmDialog(true)}
            className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
          >
            Save Changes
          </Button>
        </div>
      )}

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
            <AlertDialogAction onClick={handleSave}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};