
import { useState } from "react";
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

const initialPrices: PriceData[] = [
  { category: "Level 3", unitPrice: 5.99, standardPrice: 5.99, breakfastPrice: null, dessertPrice: null, snackPrice: null },
  { category: "Level 4", unitPrice: 6.99, standardPrice: 6.99, breakfastPrice: 3.99, dessertPrice: 2.99, snackPrice: 1.99 },
  { category: "Level 5", unitPrice: 7.99, standardPrice: 7.99, breakfastPrice: null, dessertPrice: 3.99, snackPrice: null },
  { category: "Level 6", unitPrice: 8.99, standardPrice: 8.99, breakfastPrice: null, dessertPrice: 3.99, snackPrice: null },
  { category: "Allergen Free", unitPrice: 9.99, standardPrice: 9.99, breakfastPrice: null, dessertPrice: null, snackPrice: null },
  { category: "Finger Foods", unitPrice: 7.99, standardPrice: 7.99, breakfastPrice: null, dessertPrice: null, snackPrice: null },
  { category: "Mini Meal Extra", unitPrice: 6.99, standardPrice: 6.99, breakfastPrice: null, dessertPrice: null, snackPrice: null },
  { category: "Caribbean", unitPrice: 8.99, standardPrice: 8.99, breakfastPrice: null, dessertPrice: null, snackPrice: null },
  { category: "Halal", unitPrice: 8.99, standardPrice: 8.99, breakfastPrice: null, dessertPrice: null, snackPrice: null },
  { category: "Kosher", unitPrice: 9.99, standardPrice: 9.99, breakfastPrice: null, dessertPrice: null, snackPrice: null },
];

const mockCustomers: CustomerData[] = [
  { id: "1", name: "National", basePercentage: 10 },
  { id: "2", name: "Regional", basePercentage: 15 },
  { id: "3", name: "Independent", basePercentage: 20 },
];

export const PricingTable = () => {
  const [prices, setPrices] = useState<PriceData[]>(initialPrices);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData>(mockCustomers[0]);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [editingPercentage, setEditingPercentage] = useState(false);
  const { toast } = useToast();

  const handlePriceChange = (index: number, field: keyof PriceData, value: string) => {
    const newPrices = [...prices];
    newPrices[index] = {
      ...newPrices[index],
      [field]: value === "" ? null : parseFloat(value),
    };
    setPrices(newPrices);
    setHasChanges(true);
  };

  const handlePercentageChange = (value: string) => {
    const newPercentage = parseFloat(value);
    if (!isNaN(newPercentage)) {
      setSelectedCustomer({
        ...selectedCustomer,
        basePercentage: newPercentage,
      });
      setHasChanges(true);
    }
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = mockCustomers.find((c) => c.id === customerId);
    if (customer) setSelectedCustomer(customer);
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Prices have been updated successfully",
    });
    setHasChanges(false);
    setShowConfirmDialog(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <BasePricesCard
        prices={prices}
        onPriceChange={handlePriceChange}
      />

      <CustomerSelectionCard
        prices={prices}
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
