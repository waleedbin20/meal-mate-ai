import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface CareHomeDetailsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const CareHomeDetails = ({ form }: CareHomeDetailsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-700">Care Home Details</h3>
      <FormField
        control={form.control}
        name="careHomeName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Care Home Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter care home name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="careHomeAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter address" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};