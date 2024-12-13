import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, PriceListOption } from "./types";

const PRICE_LIST_OPTIONS: PriceListOption[] = [
  { customerNo: "1103998", priceHierarchy: "0008801129" },
  { customerNo: "1103999", priceHierarchy: "0008801130" },
  { customerNo: "1104000", priceHierarchy: "0008801097" },
  { customerNo: "1104045", priceHierarchy: "0008801128" },
];

interface PricingInformationProps {
  form: UseFormReturn<QuoteFormData>;
}

export const PricingInformation = ({ form }: PricingInformationProps) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Pricing Information</h3>
      <FormField
        control={form.control}
        name="priceListName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price List</FormLabel>
            <Select 
              onValueChange={(value) => {
                const selectedOption = PRICE_LIST_OPTIONS.find(
                  option => option.customerNo === value
                );
                field.onChange(selectedOption);
              }}
              value={field.value?.customerNo}
            >
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select a customer number" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white z-50">
                {PRICE_LIST_OPTIONS.map((option) => (
                  <SelectItem 
                    key={option.customerNo} 
                    value={option.customerNo}
                    className="hover:bg-gray-100"
                  >
                    {`Customer: ${option.customerNo} - Price Hierarchy: ${option.priceHierarchy}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};