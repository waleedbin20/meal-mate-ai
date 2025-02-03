import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

interface PriceData {
  category: string;
  unitPrice: number;
  standardPrice: number;
  breakfastPrice: number | null;
  dessertPrice: number | null;
  snackPrice: number | null;
}

interface CustomerData {
  id: string;
  name: string;
  basePercentage: number;
}

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

  const calculateAdjustedPrice = (price: number | null) => {
    if (price === null) return null;
    return (price * (1 + selectedCustomer.basePercentage / 100)).toFixed(2);
  };

  const handleSave = () => {
    // TODO: Implement API call to save prices
    toast({
      title: "Success",
      description: "Prices have been updated successfully",
    });
    setHasChanges(false);
    setShowConfirmDialog(false);
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Customer</label>
          <div className="flex items-center gap-4">
            <select
              className="w-64 rounded-md border border-gray-300 p-2"
              value={selectedCustomer.id}
              onChange={(e) => {
                const customer = mockCustomers.find((c) => c.id === e.target.value);
                if (customer) setSelectedCustomer(customer);
              }}
            >
              {mockCustomers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600 mb-1">Base Percentage</span>
              <div className="flex items-center gap-2">
                {editingPercentage ? (
                  <Input
                    type="number"
                    value={selectedCustomer.basePercentage}
                    onChange={(e) => handlePercentageChange(e.target.value)}
                    className="w-20"
                    onBlur={() => setEditingPercentage(false)}
                    autoFocus
                  />
                ) : (
                  <div
                    className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                    onClick={() => setEditingPercentage(true)}
                  >
                    {selectedCustomer.basePercentage}%
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {hasChanges && (
          <Button 
            onClick={() => setShowConfirmDialog(true)} 
            className="bg-purple-600 hover:bg-purple-700"
          >
            Save Changes
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Unit Price</th>
              <th className="px-4 py-2 text-left">Standard</th>
              <th className="px-4 py-2 text-left">Breakfast</th>
              <th className="px-4 py-2 text-left">Dessert</th>
              <th className="px-4 py-2 text-left">Snack</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr 
                key={price.category} 
                className="border-t hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-2 font-medium">{price.category}</td>
                <td className="px-4 py-2">
                  <Input
                    type="number"
                    value={price.unitPrice}
                    onChange={(e) => handlePriceChange(index, "unitPrice", e.target.value)}
                    className="w-24"
                    step="0.01"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {calculateAdjustedPrice(price.unitPrice)}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <Input
                    type="number"
                    value={price.standardPrice}
                    onChange={(e) => handlePriceChange(index, "standardPrice", e.target.value)}
                    className="w-24"
                    step="0.01"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {calculateAdjustedPrice(price.standardPrice)}
                  </div>
                </td>
                <td className="px-4 py-2">
                  {price.breakfastPrice !== undefined && (
                    <>
                      <Input
                        type="number"
                        value={price.breakfastPrice || ""}
                        onChange={(e) => handlePriceChange(index, "breakfastPrice", e.target.value)}
                        className="w-24"
                        step="0.01"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {calculateAdjustedPrice(price.breakfastPrice)}
                      </div>
                    </>
                  )}
                </td>
                <td className="px-4 py-2">
                  {price.dessertPrice !== undefined && (
                    <>
                      <Input
                        type="number"
                        value={price.dessertPrice || ""}
                        onChange={(e) => handlePriceChange(index, "dessertPrice", e.target.value)}
                        className="w-24"
                        step="0.01"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {calculateAdjustedPrice(price.dessertPrice)}
                      </div>
                    </>
                  )}
                </td>
                <td className="px-4 py-2">
                  {price.snackPrice !== undefined && (
                    <>
                      <Input
                        type="number"
                        value={price.snackPrice || ""}
                        onChange={(e) => handlePriceChange(index, "snackPrice", e.target.value)}
                        className="w-24"
                        step="0.01"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {calculateAdjustedPrice(price.snackPrice)}
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to save these changes? This will update the prices for {selectedCustomer.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};