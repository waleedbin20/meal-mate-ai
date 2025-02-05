
import { Input } from "@/components/ui/input";
import { PriceData } from "./types";

interface PriceTableProps {
  prices: PriceData[];
  isEditable: boolean;
  onPriceChange?: (index: number, field: keyof PriceData, value: string) => void;
  calculateAdjustedPrice?: (price: number | null) => string | null;
}

export const PriceTable = ({ 
  prices, 
  isEditable,
  onPriceChange,
  calculateAdjustedPrice 
}: PriceTableProps) => {
  return (
    <div className="overflow-x-auto -mx-4 md:-mx-6">
      <div className="inline-block min-w-full align-middle px-4 md:px-6">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breakfast</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dessert</th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Snack</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prices.map((price, index) => (
                <tr key={price.category}>
                  <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                    {price.category}
                  </td>
                  {isEditable ? (
                    <>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <Input
                          type="number"
                          value={price.unitPrice || 0}
                          onChange={(e) => onPriceChange?.(index, "unitPrice", e.target.value)}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <Input
                          type="number"
                          value={price.standardPrice || 0}
                          onChange={(e) => onPriceChange?.(index, "standardPrice", e.target.value)}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        {price.breakfastPrice !== undefined && (
                          <Input
                            type="number"
                            value={price.breakfastPrice || 0}
                            onChange={(e) => onPriceChange?.(index, "breakfastPrice", e.target.value)}
                            className="w-16 md:w-24 text-xs md:text-sm"
                            step="0.01"
                          />
                        )}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        {price.dessertPrice !== undefined && (
                          <Input
                            type="number"
                            value={price.dessertPrice || 0}
                            onChange={(e) => onPriceChange?.(index, "dessertPrice", e.target.value)}
                            className="w-16 md:w-24 text-xs md:text-sm"
                            step="0.01"
                          />
                        )}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        {price.snackPrice !== undefined && (
                          <Input
                            type="number"
                            value={price.snackPrice || 0}
                            onChange={(e) => onPriceChange?.(index, "snackPrice", e.target.value)}
                            className="w-16 md:w-24 text-xs md:text-sm"
                            step="0.01"
                          />
                        )}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{calculateAdjustedPrice?.(price.unitPrice)}
                          </div>
                          <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                            Base: £{price.unitPrice}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{calculateAdjustedPrice?.(price.standardPrice)}
                          </div>
                          <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                            Base: £{price.standardPrice}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        {price.breakfastPrice !== null && (
                          <div className="space-y-1">
                            <div className="text-sm md:text-base font-medium">
                              £{calculateAdjustedPrice?.(price.breakfastPrice)}
                            </div>
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Base: £{price.breakfastPrice}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        {price.dessertPrice !== null && (
                          <div className="space-y-1">
                            <div className="text-sm md:text-base font-medium">
                              £{calculateAdjustedPrice?.(price.dessertPrice)}
                            </div>
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Base: £{price.dessertPrice}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        {price.snackPrice !== null && (
                          <div className="space-y-1">
                            <div className="text-sm md:text-base font-medium">
                              £{calculateAdjustedPrice?.(price.snackPrice)}
                            </div>
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Base: £{price.snackPrice}
                            </div>
                          </div>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
