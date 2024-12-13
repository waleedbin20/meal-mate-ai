import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, PortionSize } from "./types";

interface PortionSizeFieldProps {
  form: UseFormReturn<QuoteFormData>;
  index: number;
}

export const PortionSizeField = ({ form, index }: PortionSizeFieldProps) => {
  const portionSizes: PortionSize[] = ["Small", "Standard", "Large"];

  return (
    <FormField
      control={form.control}
      name={`diningRooms.${index}.portionSize` as const}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Portion Size</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value: PortionSize) => field.onChange(value)}
              value={field.value as PortionSize}
              className="flex flex-col space-y-1"
            >
              {portionSizes.map((size) => (
                <div key={size} className="flex items-center space-x-3">
                  <RadioGroupItem value={size} id={`${index}-${size}`} />
                  <Label htmlFor={`${index}-${size}`}>{size}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};