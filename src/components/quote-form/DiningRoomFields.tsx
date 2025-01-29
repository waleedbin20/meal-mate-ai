import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, MealCategory, MultiTwinSize, Level4Options, Level5Options, Level6Options } from "./types";
import { useToast } from "@/hooks/use-toast";

interface DiningRoomFieldsProps {
  form: UseFormReturn<QuoteFormData>;
  index: number;
}

const mealCategories: MealCategory[] = [
  "Multi Twin",
  "Level 3 IDDSI",
  "Level 4 IDDSI",
  "Level 5 IDDSI",
  "Level 6 IDDSI",
  "Allergy-Free",
  "Finger Foods",
  "Mini Meals",
  "Religious Diets"
];

const level4Options: Level4Options[] = ["Breakfast", "Snacks", "Dessert"];
const level5Options: Level5Options[] = ["Dessert"];
const level6Options: Level6Options[] = ["Dessert"];

const multiTwinSizes: MultiTwinSize[] = ["Standard", "Large"];

const getResidentFieldName = (category: MealCategory): keyof QuoteFormData['diningRooms'][0] => {
  const mapping: Record<MealCategory, keyof QuoteFormData['diningRooms'][0]> = {
    "Multi Twin": "multiTwinResidents",
    "Level 3 IDDSI": "level3Residents",
    "Level 4 IDDSI": "level4Residents",
    "Level 5 IDDSI": "level5Residents",
    "Level 6 IDDSI": "level6Residents",
    "Allergy-Free": "allergyFreeResidents",
    "Finger Foods": "fingerFoodResidents",
    "Mini Meals": "miniMealResidents",
    "Religious Diets": "religiousDietsResidents"
  };
  return mapping[category];
};

const LevelOptions = ({ 
  form, 
  index, 
  level, 
  options 
}: { 
  form: UseFormReturn<QuoteFormData>; 
  index: number; 
  level: string; 
  options: string[] 
}) => {
  const fieldName = `diningRooms.${index}.${level.toLowerCase()}Options` as const;
  
  return (
    <div className="ml-6 space-y-2 mt-2">
      <p className="text-sm font-medium text-purple-700">Additional Options:</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <FormField
            key={option}
            control={form.control}
            name={fieldName}
            render={({ field }) => {
              const values = field.value || [];
              return (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={Array.isArray(values) && values.includes(option)}
                      onCheckedChange={(checked) => {
                        const currentValue = Array.isArray(values) ? values : [];
                        const newValue = checked
                          ? [...currentValue, option]
                          : currentValue.filter((v) => v !== option);
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal text-sm">{option}</FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const DiningRoomFields = ({ form, index }: DiningRoomFieldsProps) => {
  const { toast } = useToast();
  const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  const diningRoom = form.watch(`diningRooms.${index}`);
  const allDiningRooms = form.watch('diningRooms');

  React.useEffect(() => {
    const total =
      (diningRoom.multiTwinResidents || 0) +
      (diningRoom.level3Residents || 0) +
      (diningRoom.level4Residents || 0) +
      (diningRoom.level5Residents || 0) +
      (diningRoom.level6Residents || 0) +
      (diningRoom.allergyFreeResidents || 0) +
      (diningRoom.fingerFoodResidents || 0) +
      (diningRoom.miniMealResidents || 0) +
      (diningRoom.religiousDietsResidents || 0);

    form.setValue(`diningRooms.${index}.totalResidentsInDiningRoom`, total);
  }, [
    diningRoom.multiTwinResidents,
    diningRoom.level3Residents,
    diningRoom.level4Residents,
    diningRoom.level5Residents,
    diningRoom.level6Residents,
    diningRoom.allergyFreeResidents,
    diningRoom.fingerFoodResidents,
    diningRoom.miniMealResidents,
    diningRoom.religiousDietsResidents,
    form,
    index
  ]);

  const validateUniqueName = (value: string) => {
    const isDuplicate = allDiningRooms.some(
      (room, roomIndex) =>
        roomIndex !== index &&
        room.name.toLowerCase() === value.toLowerCase()
    );

    if (isDuplicate) {
      toast({
        title: "Duplicate Name",
        description: "Each dining room must have a unique name",
        variant: "destructive",
      });
      return "Each dining room must have a unique name";
    }
    return true;
  };

  return (
    <div className={`${bgColor} space-y-4 p-6 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md`}>
      <div className="flex justify-between items-center">
        <FormField
          control={form.control}
          name={`diningRooms.${index}.name` as const}
          rules={{
            required: "Dining room name is required",
            validate: validateUniqueName
          }}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Dining Room Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter dining room name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="ml-4 text-right">
          <p className="text-sm text-gray-500">Total Residents</p>
          <p className="text-lg font-semibold text-purple-700">
            {diningRoom.totalResidentsInDiningRoom || 0}
          </p>
        </div>
      </div>

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

                          if (!checked) {
                            const fieldName = getResidentFieldName(category);
                            const path = `diningRooms.${index}.${fieldName}` as const;
                            form.setValue(path, 0);
                            if (category === "Multi Twin") {
                              form.setValue(`diningRooms.${index}.multiTwinSize`, undefined);
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{category}</FormLabel>
                  </FormItem>
                )}
              />

              {category === "Multi Twin" && form.getValues(`diningRooms.${index}.mealCategories`)?.includes(category) && (
                <div className="ml-6 space-y-4">
                  <FormField
                    control={form.control}
                    name={`diningRooms.${index}.multiTwinSize` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-700">Portion Size</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value as MultiTwinSize)}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white border-purple-200 hover:border-purple-300 focus:ring-purple-200">
                              <SelectValue placeholder="Select portion size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {multiTwinSizes.map((size) => (
                              <SelectItem
                                key={size}
                                value={size}
                                className="hover:bg-purple-50 focus:bg-purple-50 focus:text-purple-900"
                              >
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`diningRooms.${index}.multiTwinResidents` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={String(field.value || '')}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            placeholder="Number of Multi Twin residents"
                            className="w-full max-w-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {category === "Level 4 IDDSI" && form.getValues(`diningRooms.${index}.mealCategories`)?.includes(category) && (
                <>
                  <FormField
                    control={form.control}
                    name={`diningRooms.${index}.level4Residents` as const}
                    render={({ field }) => (
                      <FormItem className="ml-6">
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={String(field.value || '')}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            placeholder="Number of Level 4 IDDSI residents"
                            className="w-full max-w-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LevelOptions form={form} index={index} level="Level4" options={level4Options} />
                </>
              )}

              {category === "Level 5 IDDSI" && form.getValues(`diningRooms.${index}.mealCategories`)?.includes(category) && (
                <>
                  <FormField
                    control={form.control}
                    name={`diningRooms.${index}.level5Residents` as const}
                    render={({ field }) => (
                      <FormItem className="ml-6">
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={String(field.value || '')}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            placeholder="Number of Level 5 IDDSI residents"
                            className="w-full max-w-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LevelOptions form={form} index={index} level="Level5" options={level5Options} />
                </>
              )}

              {category === "Level 6 IDDSI" && form.getValues(`diningRooms.${index}.mealCategories`)?.includes(category) && (
                <>
                  <FormField
                    control={form.control}
                    name={`diningRooms.${index}.level6Residents` as const}
                    render={({ field }) => (
                      <FormItem className="ml-6">
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            value={String(field.value || '')}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            placeholder="Number of Level 6 IDDSI residents"
                            className="w-full max-w-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LevelOptions form={form} index={index} level="Level6" options={level6Options} />
                </>
              )}

              {category !== "Multi Twin" && 
               category !== "Level 4 IDDSI" && 
               category !== "Level 5 IDDSI" && 
               category !== "Level 6 IDDSI" && 
               form.getValues(`diningRooms.${index}.mealCategories`)?.includes(category) && (
                <FormField
                  control={form.control}
                  name={`diningRooms.${index}.${getResidentFieldName(category)}` as const}
                  render={({ field }) => (
                    <FormItem className="ml-6">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          value={String(field.value || '')}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
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
