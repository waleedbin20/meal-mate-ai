import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface NumberOfDiningRoomsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const NumberOfDiningRooms = ({ form }: NumberOfDiningRoomsProps) => {
  return (
    <FormField
      control={form.control}
      name="numberOfDiningRooms"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Dining Rooms</FormLabel>
          <FormControl>
            <Input 
              type="number" 
              min="1"
              onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 1)}
              value={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};