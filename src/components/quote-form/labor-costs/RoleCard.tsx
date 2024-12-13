import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "../types";

interface RoleCardProps {
  form: UseFormReturn<QuoteFormData>;
  roleNumber: 1 | 2 | 3;
  bgColor: string;
  textColor: string;
}

export const RoleCard = ({ form, roleNumber, bgColor, textColor }: RoleCardProps) => {
  const roleName = `role${roleNumber}`;
  
  // Use proper typing for the watched values
  const hourlyRate = form.watch(`${roleName}.hourlyRate` as const) || 0;
  const hoursPerWeek = form.watch(`${roleName}.hoursPerWeek` as const) || 0;
  
  // Ensure we're working with numbers
  const weeklyTotal = Number(hourlyRate) * Number(hoursPerWeek);
  const annualTotal = weeklyTotal * 52;

  return (
    <Card className={`p-6 ${bgColor} transition-all duration-300 hover:shadow-lg`}>
      <h5 className={`font-medium text-lg mb-4 ${textColor}`}>Role {roleNumber}</h5>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name={`${roleName}.hourlyRate` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={textColor}>Hourly Rate (£)</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="number"
                  min="0"
                  step="0.01"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${roleName}.hoursPerWeek` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={textColor}>Hours per Week</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="number"
                  min="0"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 p-4 bg-white/80 rounded-lg space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Total Weekly Cost: <span className="text-purple-700">£{weeklyTotal.toFixed(2)}</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            Total Annual Cost: <span className="text-purple-700">£{annualTotal.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};