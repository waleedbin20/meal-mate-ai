import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface NumberOfDiningRoomsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const NumberOfDiningRooms = ({ form }: NumberOfDiningRoomsProps) => {
  return (
    <div className="space-y-4">
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

      <FormField
        control={form.control}
        name="diningRooms.0.totalResidents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Residents</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0" 
                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                value={field.value || ''}
                onBlur={field.onBlur}
                name={field.name}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};