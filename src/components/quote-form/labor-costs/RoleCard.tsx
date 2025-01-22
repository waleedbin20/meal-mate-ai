import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "../types";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoleCardProps {
  form: UseFormReturn<QuoteFormData>;
  roleIndex: number;
  onDelete: () => void;
  bgColor: string;
  textColor: string;
}

export const RoleCard = ({ 
  form, 
  roleIndex,
  onDelete,
  bgColor,
  textColor 
}: RoleCardProps) => {
  const role = form.watch(`roles.${roleIndex}`);
  const hourlyRate = role?.hourlyRate || 0;
  const hoursPerWeek = role?.hoursPerWeek || 0;
  const numberOfSimilarRoles = role?.numberOfSimilarRoles || 1;

  const weeklyTotal = hourlyRate * hoursPerWeek * numberOfSimilarRoles;
  const annualTotal = weeklyTotal * 52;

  return (
    <Card className={`p-6 ${bgColor} transition-all duration-300 hover:shadow-lg relative`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 hover:bg-red-100"
        onClick={onDelete}
      >
        <X className="h-4 w-4 text-red-500" />
      </Button>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name={`roles.${roleIndex}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={textColor}>Role Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter role name" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`roles.${roleIndex}.numberOfSimilarRoles`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={textColor}>Number of Similar Roles</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`roles.${roleIndex}.hourlyRate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={textColor}>Hourly Rate (£)</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  min="0"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`roles.${roleIndex}.hoursPerWeek`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={textColor}>Hours per Week</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
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