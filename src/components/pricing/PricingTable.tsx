
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
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [isBasePricesOpen, setIsBasePricesOpen] = useState(false);
  const [isCustomerSelectOpen, setIsCustomerSelectOpen] = useState(false);
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
    toast({
      title: "Success",
      description: "Prices have been updated successfully",
    });
    setHasChanges(false);
    setShowConfirmDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Base Prices Card */}
      <Card className="p-6 bg-white shadow-sm border border-gray-200">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsBasePricesOpen(!isBasePricesOpen)}
        >
          <div>
            <h2 className="text-xl font-semibold text-purple-700">Base Prices</h2>
            <p className="text-sm text-gray-500">Manage base prices for all products</p>
          </div>
          {isBasePricesOpen ? (
            <ChevronUp className="h-6 w-6 text-purple-600" />
          ) : (
            <ChevronDown className="h-6 w-6 text-purple-600" />
          )}
        </div>

        {isBasePricesOpen && (
          <div className="mt-6">
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
                      <tr key={price.category}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {price.category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Input
                            type="number"
                            value={price.unitPrice || 0}
                            onChange={(e) => handlePriceChange(index, "unitPrice", e.target.value)}
                            className="w-24"
                            step="0.01"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Input
                            type="number"
                            value={price.standardPrice || 0}
                            onChange={(e) => handlePriceChange(index, "standardPrice", e.target.value)}
                            className="w-24"
                            step="0.01"
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {price.breakfastPrice !== undefined && (
                            <Input
                              type="number"
                              value={price.breakfastPrice || 0}
                              onChange={(e) => handlePriceChange(index, "breakfastPrice", e.target.value)}
                              className="w-24"
                              step="0.01"
                            />
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {price.dessertPrice !== undefined && (
                            <Input
                              type="number"
                              value={price.dessertPrice || 0}
                              onChange={(e) => handlePriceChange(index, "dessertPrice", e.target.value)}
                              className="w-24"
                              step="0.01"
                            />
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {price.snackPrice !== undefined && (
                            <Input
                              type="number"
                              value={price.snackPrice || 0}
                              onChange={(e) => handlePriceChange(index, "snackPrice", e.target.value)}
                              className="w-24"
                              step="0.01"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Customer Selection Card */}
      <Card className="p-6 bg-white shadow-sm border border-gray-200">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsCustomerSelectOpen(!isCustomerSelectOpen)}
        >
          <div>
            <h2 className="text-xl font-semibold text-purple-700">Customer Selection</h2>
            <p className="text-sm text-gray-500">Select customer and view adjusted prices</p>
          </div>
          {isCustomerSelectOpen ? (
            <ChevronUp className="h-6 w-6 text-purple-600" />
          ) : (
            <ChevronDown className="h-6 w-6 text-purple-600" />
          )}
        </div>

        {isCustomerSelectOpen && (
          <div className="mt-6">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Selection</label>
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
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Percentage</label>
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
                    {prices.map((price) => (
                      <tr key={price.category}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {price.category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="text-base font-medium">
                              £{calculateAdjustedPrice(price.unitPrice)}
                            </div>
                            <div className="text-xs text-[#9F9EA1]">
                              Base: £{price.unitPrice} 
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="text-base font-medium">
                              £{calculateAdjustedPrice(price.standardPrice)}
                            </div>
                            <div className="text-xs text-[#9F9EA1]">
                              Base: £{price.standardPrice}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {price.breakfastPrice !== null && (
                            <div className="space-y-1">
                              <div className="text-base font-medium">
                                £{calculateAdjustedPrice(price.breakfastPrice)}
                              </div>
                              <div className="text-xs text-[#9F9EA1]">
                                Base: £{price.breakfastPrice}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {price.dessertPrice !== null && (
                            <div className="space-y-1">
                              <div className="text-base font-medium">
                                £{calculateAdjustedPrice(price.dessertPrice)}
                              </div>
                              <div className="text-xs text-[#9F9EA1]">
                                Base: £{price.dessertPrice}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {price.snackPrice !== null && (
                            <div className="space-y-1">
                              <div className="text-base font-medium">
                                £{calculateAdjustedPrice(price.snackPrice)}
                              </div>
                              <div className="text-xs text-[#9F9EA1]">
                                Base: £{price.snackPrice}
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
          </div>
        )}
      </Card>

      {hasChanges && (
        <div className="flex justify-end mt-6">
          <Button 
            onClick={() => setShowConfirmDialog(true)}
            className="bg-purple-600 hover:bg-purple-700"
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
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
