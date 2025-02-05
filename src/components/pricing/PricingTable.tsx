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
  { id: 2406, name: "National", basePercentage: 10 },
  { id: 2468, name: "Regional", basePercentage: 15 },
  { id: 2408, name: "Independent", basePercentage: 20 },
  { id: 2407, name: "Small Groups", basePercentage: 25 }
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
    enabled: isCustomerSelectOpen && !!selectedCustomer?.id,
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
      setHasBasePriceChanges(false);
      setHasCustomerPriceChanges(false);
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
    const parsedValue = value === "" ? null : parseFloat(value);
    
    newPrices[index] = {
      ...newPrices[index],
      [field]: parsedValue,
    };

    // If it's Mini Meal Extra and the unit price is being changed, update standard price too
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
    if (customer) {
      queryClient.invalidateQueries({ queryKey: ['customerPrices', parseInt(customerId)] });
    }
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

  const handleSave = () => {
    updatePricesMutation.mutate(prices);
  };

  useEffect(() => {
    if (isBasePricesOpen) {
      queryClient.invalidateQueries({ queryKey: ['basePrices'] });
    }
  }, [isBasePricesOpen, queryClient]);

  useEffect(() => {
    if (isCustomerSelectOpen && selectedCustomer?.id) {
      queryClient.invalidateQueries({ queryKey: ['customerPrices', selectedCustomer.id] });
    }
  }, [isCustomerSelectOpen, selectedCustomer?.id, queryClient]);

  return (
    <div className="space-y-4 md:space-y-6">
      <BasePricesCard
        prices={prices}
        onPriceChange={handlePriceChange}
        isLoading={isLoadingBasePrices}
        hasChanges={hasBasePriceChanges}
        isOpen={isBasePricesOpen}
        setIsOpen={setIsBasePricesOpen}
        onSave={() => setShowConfirmDialog(true)}
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
        onSave={() => setShowConfirmDialog(true)}
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
            <AlertDialogAction onClick={handleSave}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
