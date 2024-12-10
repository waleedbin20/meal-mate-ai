import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface LaborCostFieldsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const LaborCostFields = ({ form }: LaborCostFieldsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-700">Labour & Cost Information</h3>
      <FormField
        control={form.control}
        name="currentLabourHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Labour Hours (per day)</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="currentLabourCost"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Labour Cost (£ per year)</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};