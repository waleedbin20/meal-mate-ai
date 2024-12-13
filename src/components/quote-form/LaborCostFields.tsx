import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";
import { Card } from "@/components/ui/card";

interface LaborCostFieldsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const LaborCostFields = ({ form }: LaborCostFieldsProps) => {
  const calculateWeeklyCost = (hourlyRate: number, hoursPerWeek: number) => {
    return hourlyRate * hoursPerWeek;
  };

  const calculateAnnualCost = (weeklyCost: number) => {
    return weeklyCost * 52;
  };

  const role1WeeklyCost = calculateWeeklyCost(
    form.watch('role1.hourlyRate') || 0,
    form.watch('role1.hoursPerWeek') || 0
  );
  const role2WeeklyCost = calculateWeeklyCost(
    form.watch('role2.hourlyRate') || 0,
    form.watch('role2.hoursPerWeek') || 0
  );
  const role3WeeklyCost = calculateWeeklyCost(
    form.watch('role3.hourlyRate') || 0,
    form.watch('role3.hoursPerWeek') || 0
  );

  const apetitoWeeklyCost = calculateWeeklyCost(
    form.watch('apetitoLabor.hourlyRate') || 0,
    form.watch('apetitoLabor.hoursPerWeek') || 0
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-purple-700">Labour & Cost Information</h3>
      
      <Card className="p-6">
        <h4 className="text-md font-semibold mb-4">Current Labour Costs</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Role 1 */}
          <div className="space-y-4">
            <h5 className="font-medium">Role 1</h5>
            <FormField
              control={form.control}
              name="role1.hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate (£)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role1.hoursPerWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours per Week</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p>Total Weekly Cost: £{role1WeeklyCost.toFixed(2)}</p>
              <p>Total Annual Cost: £{calculateAnnualCost(role1WeeklyCost).toFixed(2)}</p>
            </div>
          </div>

          {/* Role 2 */}
          <div className="space-y-4">
            <h5 className="font-medium">Role 2</h5>
            <FormField
              control={form.control}
              name="role2.hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate (£)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role2.hoursPerWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours per Week</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p>Total Weekly Cost: £{role2WeeklyCost.toFixed(2)}</p>
              <p>Total Annual Cost: £{calculateAnnualCost(role2WeeklyCost).toFixed(2)}</p>
            </div>
          </div>

          {/* Role 3 */}
          <div className="space-y-4">
            <h5 className="font-medium">Role 3</h5>
            <FormField
              control={form.control}
              name="role3.hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate (£)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role3.hoursPerWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours per Week</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p>Total Weekly Cost: £{role3WeeklyCost.toFixed(2)}</p>
              <p>Total Annual Cost: £{calculateAnnualCost(role3WeeklyCost).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-md font-semibold mb-4">Proposed apetito Labour Costs</h4>
        <div className="max-w-md space-y-4">
          <FormField
            control={form.control}
            name="apetitoLabor.hourlyRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>apetito Hourly Rate (£)</FormLabel>
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
                <FormLabel>apetito Hours per Week</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <p>Total Weekly Cost: £{apetitoWeeklyCost.toFixed(2)}</p>
            <p>Total Annual Cost: £{calculateAnnualCost(apetitoWeeklyCost).toFixed(2)}</p>
          </div>
        </div>
      </Card>

      <FormField
        control={form.control}
        name="currentFoodSpend"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Food Spend (£ per year)</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="estimatedNonApetitoSpend"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estimated Non-Apetito Spend (£ per year)</FormLabel>
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