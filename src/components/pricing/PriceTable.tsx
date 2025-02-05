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
  if (!prices || !Array.isArray(prices)) {
    console.error('PriceTable received invalid prices:', prices);
    return null;
  }

  console.log('PriceTable rendering with prices:', prices);

  const isMiniMealExtra = (category: string) => {
    return category.toLowerCase() === 'mini meal extra';
  };

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
                <tr key={price.category || index}>
                  <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                    {price.category}
                  </td>
                  {isEditable ? (
                    <>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <Input
                          type="number"
                          value={price.unitPrice ?? ''}
                          onChange={(e) => {
                            onPriceChange?.(index, "unitPrice", e.target.value);
                            if (isMiniMealExtra(price.category)) {
                              onPriceChange?.(index, "standardPrice", e.target.value);
                            }
                          }}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <Input
                          type="number"
                          value={isMiniMealExtra(price.category) ? (price.unitPrice ?? '') : (price.standardPrice ?? '')}
                          className="w-16 md:w-24 text-xs md:text-sm bg-gray-100"
                          disabled={true}
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <Input
                          type="number"
                          value={price.breakfastPrice ?? ''}
                          onChange={(e) => onPriceChange?.(index, "breakfastPrice", e.target.value)}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <Input
                          type="number"
                          value={price.dessertPrice ?? ''}
                          onChange={(e) => onPriceChange?.(index, "dessertPrice", e.target.value)}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <Input
                          type="number"
                          value={price.snackPrice ?? ''}
                          onChange={(e) => onPriceChange?.(index, "snackPrice", e.target.value)}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.unitPrice === 'number' ? price.unitPrice.toFixed(2) : '-'}
                          </div>
                          {calculateAdjustedPrice && typeof price.unitPrice === 'number' && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Adjusted: £{calculateAdjustedPrice(price.unitPrice)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.standardPrice === 'number' ? price.standardPrice.toFixed(2) : '-'}
                          </div>
                          {calculateAdjustedPrice && typeof price.standardPrice === 'number' && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Adjusted: £{calculateAdjustedPrice(price.standardPrice)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.breakfastPrice === 'number' ? price.breakfastPrice.toFixed(2) : '-'}
                          </div>
                          {calculateAdjustedPrice && typeof price.breakfastPrice === 'number' && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Adjusted: £{calculateAdjustedPrice(price.breakfastPrice)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.dessertPrice === 'number' ? price.dessertPrice.toFixed(2) : '-'}
                          </div>
                          {calculateAdjustedPrice && typeof price.dessertPrice === 'number' && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Adjusted: £{calculateAdjustedPrice(price.dessertPrice)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.snackPrice === 'number' ? price.snackPrice.toFixed(2) : '-'}
                          </div>
                          {calculateAdjustedPrice && typeof price.snackPrice === 'number' && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Adjusted: £{calculateAdjustedPrice(price.snackPrice)}
                            </div>
                          )}
                        </div>
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
