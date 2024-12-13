import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "../types";

interface ApetitoLaborCardProps {
  form: UseFormReturn<QuoteFormData>;
}

export const ApetitoLaborCard = ({ form }: ApetitoLaborCardProps) => {
  const hourlyRate = form.watch('apetitoLabor.hourlyRate') || 0;
  const hoursPerWeek = form.watch('apetitoLabor.hoursPerWeek') || 0;
  const weeklyTotal = hourlyRate * hoursPerWeek;
  const annualTotal = weeklyTotal * 52;

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 transition-all duration-300 hover:shadow-lg">
      <h4 className="text-lg font-semibold text-purple-700 mb-4">Proposed apetito Labour Costs</h4>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="apetitoLabor.hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-900">apetito Hourly Rate (£)</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" step="0.01" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apetitoLabor.hoursPerWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-900">apetito Hours per Week</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 p-4 bg-white/90 rounded-lg space-y-2">
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