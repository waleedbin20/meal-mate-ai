import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, MealCategory, DiningRoom } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const getResidentFieldName = (category: MealCategory): keyof DiningRoom => {
    const mapping: Record<MealCategory, keyof DiningRoom> = {
      "Standard": "standardResidents",
      "Large": "largeResidents",
      "Allergy Free": "allergyFreeResidents",
      "Energy Dense": "energyDenseResidents",
      "Finger Food": "fingerFoodResidents"
    };
    return mapping[category];
  };

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
              <Input 
                {...field} 
                type="number" 
                min="0" 
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-purple-700">Meal Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mealCategories.map((category) => (
            <div key={category} className="space-y-2">
              <FormField
                control={form.control}
                name={`diningRooms.${index}.mealCategories`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(category)}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          const newValue = checked
                            ? [...currentValue, category]
                            : currentValue.filter((v) => v !== category);
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{category}</FormLabel>
                  </FormItem>
                )}
              />
              
              {form.getValues(`diningRooms.${index}.mealCategories`)?.includes(category) && (
                <FormField
                  control={form.control}
                  name={`diningRooms.${index}.${String(getResidentFieldName(category))}`}
                  render={({ field }) => (
                    <FormItem className="ml-6">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          value={field.value || ''}
                          placeholder={`Number of ${category} residents`}
                          className="w-full max-w-xs"
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

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
      </div>
    </div>
  );
};