import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { QuoteFormData } from "./types";
import { useEffect } from "react";

interface NumberOfDiningRoomsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const NumberOfDiningRooms = ({ form }: NumberOfDiningRoomsProps) => {
  const numberOfDiningRooms = useWatch({
    control: form.control,
    name: "numberOfDiningRooms",
    defaultValue: 1
  });

  const diningRooms = useWatch({
    control: form.control,
    name: "diningRooms",
    defaultValue: []
  });

  // Update dining rooms array when number changes
  useEffect(() => {
    const currentLength = form.getValues("diningRooms")?.length || 0;
    if (numberOfDiningRooms > currentLength) {
      // Add new dining rooms
      const newDiningRooms = [...form.getValues("diningRooms") || []];
      for (let i = currentLength; i < numberOfDiningRooms; i++) {
        newDiningRooms.push({
          name: "",
          mealCategories: [],
          multiTwinResidents: 0,
          level3Residents: 0,
          level4Residents: 0,
          level5Residents: 0,
          level6Residents: 0,
          allergyFreeResidents: 0,
          fingerFoodResidents: 0,
          miniMealResidents: 0,
          caribbeanDietsResidents: 0,
          halalDietsResidents: 0,
          kosherDietsResidents: 0,
          totalResidentsInDiningRoom: 0
        });
      }
      form.setValue("diningRooms", newDiningRooms);
    } else if (numberOfDiningRooms < currentLength) {
      // Remove excess dining rooms
      const newDiningRooms = form.getValues("diningRooms").slice(0, numberOfDiningRooms);
      form.setValue("diningRooms", newDiningRooms);
    }
  }, [numberOfDiningRooms, form]);

  // Calculate total residents across all dining rooms
  useEffect(() => {
    const totalResidents = diningRooms.reduce((total, room) => {
      return total + (room.totalResidentsInDiningRoom || 0);
    }, 0);

    form.setValue("totalResidents", totalResidents);
  }, [diningRooms, form]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="numberOfDiningRooms"
        rules={{
          required: "Number of Dining Rooms is required",
          min: {
            value: 1,
            message: "Must have at least 1 dining room"
          },
          max: {
            value: 10,
            message: "Cannot have more than 10 dining rooms"
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Dining Rooms</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                max="10"
                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 1)}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};