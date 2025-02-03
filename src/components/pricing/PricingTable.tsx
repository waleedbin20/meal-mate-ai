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
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:justify-between md:items-start">
        <div className="space-y-4 md:space-y-2 md:flex-1 md:mr-4">
          <label className="block text-sm font-medium text-gray-700">Customer Selection</label>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <select
              className="w-full md:w-64 rounded-md border border-gray-300 p-2"
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
            className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
          >
            Save Changes
          </Button>
        )}
      </div>

      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle px-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breakfast</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dessert</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Snack</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prices.map((price, index) => (
                <tr 
                  key={price.category} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{price.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="space-y-1">
                      <Input
                        type="number"
                        value={price.unitPrice}
                        onChange={(e) => handlePriceChange(index, "unitPrice", e.target.value)}
                        className="w-24"
                        step="0.01"
                      />
                      <div className="text-xs text-gray-500">
                        {calculateAdjustedPrice(price.unitPrice)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="space-y-1">
                      <Input
                        type="number"
                        value={price.standardPrice}
                        onChange={(e) => handlePriceChange(index, "standardPrice", e.target.value)}
                        className="w-24"
                        step="0.01"
                      />
                      <div className="text-xs text-gray-500">
                        {calculateAdjustedPrice(price.standardPrice)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {price.breakfastPrice !== undefined && (
                      <div className="space-y-1">
                        <Input
                          type="number"
                          value={price.breakfastPrice || ""}
                          onChange={(e) => handlePriceChange(index, "breakfastPrice", e.target.value)}
                          className="w-24"
                          step="0.01"
                        />
                        <div className="text-xs text-gray-500">
                          {calculateAdjustedPrice(price.breakfastPrice)}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {price.dessertPrice !== undefined && (
                      <div className="space-y-1">
                        <Input
                          type="number"
                          value={price.dessertPrice || ""}
                          onChange={(e) => handlePriceChange(index, "dessertPrice", e.target.value)}
                          className="w-24"
                          step="0.01"
                        />
                        <div className="text-xs text-gray-500">
                          {calculateAdjustedPrice(price.dessertPrice)}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {price.snackPrice !== undefined && (
                      <div className="space-y-1">
                        <Input
                          type="number"
                          value={price.snackPrice || ""}
                          onChange={(e) => handlePriceChange(index, "snackPrice", e.target.value)}
                          className="w-24"
                          step="0.01"
                        />
                        <div className="text-xs text-gray-500">
                          {calculateAdjustedPrice(price.snackPrice)}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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