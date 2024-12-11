import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

const PRICE_LIST_OPTIONS = [
  "Jan 23 Launch Menu with TM",
  "Bluestone Skydome Menu",
  "NTC-H",
  "29 St - The Fields",
  "Abbey Total Care - Woodlands 28 1DR",
  "Menu A - Sept 2024",
  "Menu B - Sept 2024",
  "1 Sam's Care Home"
] as const;

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
            <FormLabel>Price List</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a price list" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                {PRICE_LIST_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option} className="hover:bg-gray-100">
                    {option}
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