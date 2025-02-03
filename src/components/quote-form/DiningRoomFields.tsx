import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, MealCategory, MultiTwinSize } from "./types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DiningRoomFieldsProps {
  form: UseFormReturn<QuoteFormData>;
  index: number;
  onRemove: (index: number) => void;
}

const mealCategories: MealCategory[] = [
  "Multi Twin",
  "Level 3",
  "Level 4",
  "Level 5",
  "Level 6",
  "Allergen Free",
  "Finger Foods",
  "Mini Meal Extra",
  "Caribbean",
  "Halal",
  "Kosher"
];

const multiTwinSizes: MultiTwinSize[] = ["Standard", "Large"];

const getResidentFieldName = (category: MealCategory): keyof QuoteFormData['diningRooms'][0] => {
  const mapping: Record<MealCategory, keyof QuoteFormData['diningRooms'][0]> = {
    "Multi Twin": "multiTwinResidents",
    "Level 3": "level3Residents",
    "Level 4": "level4Residents",
    "Level 5": "level5Residents",
    "Level 6": "level6Residents",
    "Allergen Free": "allergyFreeResidents",
    "Finger Foods": "fingerFoodResidents",
    "Mini Meal Extra": "miniMealResidents",
    "Caribbean": "caribbeanDietsResidents",
    "Halal": "halalDietsResidents",
    "Kosher": "kosherDietsResidents"
  };
  return mapping[category];
};

export const DiningRoomFields = ({ form, index, onRemove }: DiningRoomFieldsProps) => {
  const { toast } = useToast();
  const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  const diningRoom = form.watch(`diningRooms.${index}`);
  const allDiningRooms = form.watch('diningRooms');

  // Calculate total residents for this dining room
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
      (diningRoom.caribbeanDietsResidents || 0) +
      (diningRoom.halalDietsResidents || 0) +
      (diningRoom.kosherDietsResidents || 0);

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
    diningRoom.caribbeanDietsResidents,
    diningRoom.halalDietsResidents,
    diningRoom.kosherDietsResidents,
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

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(index);
  };

  return (
    <div className={`${bgColor} space-y-4 p-6 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md relative`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 hover:bg-red-100"
        onClick={handleRemove}
        type="button"
      >
        <X className="h-4 w-4 text-red-500" />
      </Button>

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
                        className="border-purple-200 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
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
                    <FormLabel className=" font-normal text-base leading-none m-0 cursor-pointer">{category}</FormLabel>
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

              {category !== "Multi Twin" && form.getValues(`diningRooms.${index}.mealCategories`)?.includes(category) && (
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
                          className="w-full max-w-xs border-purple-200 focus:border-purple-300 focus:ring-purple-200"
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
