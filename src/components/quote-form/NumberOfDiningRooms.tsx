import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { QuoteFormData } from "./types";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiningRoomsSection } from "./DiningRoomsSection";

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
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-700">Dining Rooms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-4 flex-1">
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
                      className="max-w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Residents</p>
            <p className="text-lg font-semibold text-purple-700">
              {form.watch('totalResidents') || 0}
            </p>
          </div>
        </div>

        <DiningRoomsSection form={form} diningRooms={diningRooms} />
      </CardContent>
    </Card>
  );
};