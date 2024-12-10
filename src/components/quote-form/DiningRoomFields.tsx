import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, MealCategory } from "./types";
import { MultiSelect } from "@/components/ui/multi-select";

interface DiningRoomFieldsProps {
  form: UseFormReturn<QuoteFormData>;
  index: number;
}

const mealCategories: MealCategory[] = [
  "Standard",
  "Large",
  "Allergy Free",
  "Energy Dense",
  "Finger Food"
];

export const DiningRoomFields = ({ form, index }: DiningRoomFieldsProps) => {
  const currentMealCategories = form.getValues(`diningRooms.${index}.mealCategories`) || [];

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <FormField
        control={form.control}
        name={`diningRooms.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dining Room Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter dining room name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name={`diningRooms.${index}.totalResidents`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Residents</FormLabel>
            <FormControl>
              <Input {...field} type="number" min="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`diningRooms.${index}.mealCategories`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meal Categories</FormLabel>
            <MultiSelect
              options={mealCategories.map(category => ({
                label: category,
                value: category
              }))}
              selected={field.value?.map(v => v.toString()) || []}
              onChange={(value) => {
                const typedValue = (value || []) as MealCategory[];
                field.onChange(typedValue);
                form.setValue(`diningRooms.${index}.mealCategories`, typedValue);
              }}
              placeholder="Select meal categories"
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name={`diningRooms.${index}.allergyFreeMeals`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergy Free Meals</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`diningRooms.${index}.energyDenseMeals`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Energy Dense Meals</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`diningRooms.${index}.fingerMeals`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Finger Meals</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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

        <FormField
          control={form.control}
          name={`diningRooms.${index}.menuCycle`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menu Cycle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select menu cycle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="4">4 Weeks</SelectItem>
                  <SelectItem value="6">6 Weeks</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};