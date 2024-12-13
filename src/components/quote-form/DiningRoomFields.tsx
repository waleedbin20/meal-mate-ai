import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, MealCategory, MenuOption } from "./types";
import { PortionSizeField } from "./PortionSizeField";

interface DiningRoomFieldsProps {
  form: UseFormReturn<QuoteFormData>;
  index: number;
}

const mealCategories: MealCategory[] = [
  "Standard",
  "Level 3 IDDSI",
  "Level 4 IDDSI",
  "Level 5 IDDSI",
  "Level 6 IDDSI",
  "Allergy-Free",
  "Finger Foods",
  "Mini Meals"
];

const menuOptions: MenuOption[] = [
  { menuName: "Menu A - Sep 2024", menuId: "90667" },
  { menuName: "Menu B - Sep 2024", menuId: "90670" }
];

const getResidentFieldName = (category: MealCategory): keyof QuoteFormData['diningRooms'][0] => {
  const mapping: Record<MealCategory, keyof QuoteFormData['diningRooms'][0]> = {
    "Standard": "standardResidents",
    "Level 3 IDDSI": "level3Residents",
    "Level 4 IDDSI": "level4Residents",
    "Level 5 IDDSI": "level5Residents",
    "Level 6 IDDSI": "level6Residents",
    "Allergy-Free": "allergyFreeResidents",
    "Finger Foods": "fingerFoodResidents",
    "Mini Meals": "miniMealResidents"
  };
  return mapping[category];
};

export const DiningRoomFields = ({ form, index }: DiningRoomFieldsProps) => {
  const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

  return (
    <div className={`${bgColor} space-y-4 p-6 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md`}>
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

      <FormField
        control={form.control}
        name={`diningRooms.${index}.selectedMenu`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Menu Selection</FormLabel>
            <Select
              onValueChange={(menuId) => {
                const selectedMenu = menuOptions.find(menu => menu.menuId === menuId);
                if (selectedMenu) {
                  field.onChange(selectedMenu);
                }
              }}
              value={field.value?.menuId || ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a menu" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {menuOptions.map((menu) => (
                  <SelectItem key={menu.menuId} value={menu.menuId}>
                    {menu.menuName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <PortionSizeField form={form} index={index} />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-purple-700">Meal Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mealCategories.map((category) => (
            <div key={category} className="space-y-2">
              <FormField
                control={form.control}
                name={`diningRooms.${index}.mealCategories` as const}
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
                  name={`diningRooms.${index}.${getResidentFieldName(category)}` as const}
                  render={({ field }) => (
                    <FormItem className="ml-6">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                          value={field.value || ''}
                          onBlur={field.onBlur}
                          name={field.name}
                          placeholder={`Number of ${category} residents`}
                          className="w-full max-w-xs"
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
    </div>
  );
};