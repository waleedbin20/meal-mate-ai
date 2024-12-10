import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface MenuInformationProps {
  form: UseFormReturn<QuoteFormData>;
  index: number;
}

export const MenuInformation = ({ form, index }: MenuInformationProps) => {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t">
      <h4 className="font-medium">Menu Information</h4>
      <FormField
        control={form.control}
        name={`diningRooms.${index}.offeringTiers`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Offering Tiers</FormLabel>
            <div className="space-y-2">
              {["Silver", "Gold", "Platinum"].map((tier) => (
                <FormField
                  key={tier}
                  control={form.control}
                  name={`diningRooms.${index}.offeringTiers`}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(tier as any)}
                          onCheckedChange={(checked) => {
                            const currentValue = field.value || [];
                            const newValue = checked
                              ? [...currentValue, tier]
                              : currentValue.filter((t) => t !== tier);
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{tier}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};