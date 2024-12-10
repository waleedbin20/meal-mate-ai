import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface PricingInformationProps {
  form: UseFormReturn<QuoteFormData>;
}

export const PricingInformation = ({ form }: PricingInformationProps) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Pricing Information</h3>
      <FormField
        control={form.control}
        name="priceListNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price List Number</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter price list number" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};