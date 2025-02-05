
import { Input } from "@/components/ui/input";
import { PriceData } from "./types";
import { useMemo } from "react";

interface PriceTableProps {
  prices: PriceData[];
  isEditable: boolean;
  onPriceChange?: (index: number, field: keyof PriceData, value: string) => void;
  calculateAdjustedPrice?: (price: number | null) => string | null;
  showOriginalPrices?: boolean;
}

export const PriceTable = ({ 
  prices, 
  isEditable,
  onPriceChange,
  calculateAdjustedPrice,
  showOriginalPrices = false
}: PriceTableProps) => {
  if (!prices || !Array.isArray(prices)) {
    console.error('PriceTable received invalid prices:', prices);
    return null;
  }

  // Track changed values by comparing with original prices
  const changedFields = useMemo(() => {
    const changes = new Set<string>();
    prices.forEach((price, index) => {
      if ((price as any).originalUnitPrice !== undefined && price.unitPrice !== (price as any).originalUnitPrice) {
        changes.add(`${index}-unitPrice`);
      }
      if ((price as any).originalStandardPrice !== undefined && price.standardPrice !== (price as any).originalStandardPrice) {
        changes.add(`${index}-standardPrice`);
      }
      if ((price as any).originalBreakfastPrice !== undefined && price.breakfastPrice !== (price as any).originalBreakfastPrice) {
        changes.add(`${index}-breakfastPrice`);
      }
      if ((price as any).originalDessertPrice !== undefined && price.dessertPrice !== (price as any).originalDessertPrice) {
        changes.add(`${index}-dessertPrice`);
      }
      if ((price as any).originalSnackPrice !== undefined && price.snackPrice !== (price as any).originalSnackPrice) {
        changes.add(`${index}-snackPrice`);
      }
    });
    return changes;
  }, [prices]);

  const getCellClassName = (index: number, field: string) => {
    const baseClasses = "px-2 md:px-4 py-2 md:py-3 whitespace-nowrap";
    return changedFields.has(`${index}-${field}`) 
      ? `${baseClasses} bg-purple-100` 
      : baseClasses;
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
                      <td className={getCellClassName(index, "unitPrice")}>
                        <Input
                          type="number"
                          value={price.unitPrice ?? ''}
                          onChange={(e) => onPriceChange?.(index, "unitPrice", e.target.value)}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                      <td className={getCellClassName(index, "standardPrice")}>
                        <Input
                          type="number"
                          value={price.standardPrice ?? ''}
                          onChange={(e) => onPriceChange?.(index, "standardPrice", e.target.value)}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                      <td className={getCellClassName(index, "breakfastPrice")}>
                        <Input
                          type="number"
                          value={price.breakfastPrice ?? ''}
                          onChange={(e) => onPriceChange?.(index, "breakfastPrice", e.target.value)}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                      <td className={getCellClassName(index, "dessertPrice")}>
                        <Input
                          type="number"
                          value={price.dessertPrice ?? ''}
                          onChange={(e) => onPriceChange?.(index, "dessertPrice", e.target.value)}
                          className="w-16 md:w-24 text-xs md:text-sm"
                          step="0.01"
                        />
                      </td>
                      <td className={getCellClassName(index, "snackPrice")}>
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
                      <td className={getCellClassName(index, "unitPrice")}>
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.unitPrice === 'number' ? price.unitPrice.toFixed(2) : '-'}
                          </div>
                          {showOriginalPrices && (price as any).originalUnitPrice !== undefined && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Old Price: £{typeof (price as any).originalUnitPrice === 'number' ? (price as any).originalUnitPrice.toFixed(2) : '-'}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className={getCellClassName(index, "standardPrice")}>
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.standardPrice === 'number' ? price.standardPrice.toFixed(2) : '-'}
                          </div>
                          {showOriginalPrices && (price as any).originalStandardPrice !== undefined && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Old Price: £{typeof (price as any).originalStandardPrice === 'number' ? (price as any).originalStandardPrice.toFixed(2) : '-'}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className={getCellClassName(index, "breakfastPrice")}>
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.breakfastPrice === 'number' ? price.breakfastPrice.toFixed(2) : '-'}
                          </div>
                          {showOriginalPrices && (price as any).originalBreakfastPrice !== undefined && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Old Price: £{typeof (price as any).originalBreakfastPrice === 'number' ? (price as any).originalBreakfastPrice.toFixed(2) : '-'}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className={getCellClassName(index, "dessertPrice")}>
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.dessertPrice === 'number' ? price.dessertPrice.toFixed(2) : '-'}
                          </div>
                          {showOriginalPrices && (price as any).originalDessertPrice !== undefined && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Old Price: £{typeof (price as any).originalDessertPrice === 'number' ? (price as any).originalDessertPrice.toFixed(2) : '-'}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className={getCellClassName(index, "snackPrice")}>
                        <div className="space-y-1">
                          <div className="text-sm md:text-base font-medium">
                            £{typeof price.snackPrice === 'number' ? price.snackPrice.toFixed(2) : '-'}
                          </div>
                          {showOriginalPrices && (price as any).originalSnackPrice !== undefined && (
                            <div className="text-[10px] md:text-xs text-[#9F9EA1]">
                              Old Price: £{typeof (price as any).originalSnackPrice === 'number' ? (price as any).originalSnackPrice.toFixed(2) : '-'}
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

