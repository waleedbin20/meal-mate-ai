import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { QuoteFormData } from "./types";
import { useEffect } from "react";

interface NumberOfDiningRoomsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const NumberOfDiningRooms = ({ form }: NumberOfDiningRoomsProps) => {
  const diningRooms = useWatch({
    control: form.control,
    name: "diningRooms",
    defaultValue: []
  });

  useEffect(() => {
    diningRooms.forEach((diningRoom, index) => {
      if (diningRoom) {
        const totalResidents = calculateTotalResidents(diningRoom);
        form.setValue(`diningRooms.${index}.totalResidents`, totalResidents);
      }
    });
  }, [
    diningRooms?.[0]?.multiTwinLargeResidents,
    diningRooms?.[0]?.multiTwinSmallResidents,
    diningRooms?.[0]?.multiTwinStandardResidents,
    diningRooms?.[0]?.level3Residents,
    diningRooms?.[0]?.level4Residents,
    diningRooms?.[0]?.level5Residents,
    diningRooms?.[0]?.level6Residents,
    diningRooms?.[0]?.allergyFreeResidents,
    diningRooms?.[0]?.fingerFoodResidents,
    diningRooms?.[0]?.miniMealResidents,
    form
  ]);

  const calculateTotalResidents = (diningRoom: QuoteFormData['diningRooms'][0]) => {
    return (
      (diningRoom.multiTwinLargeResidents || 0) +
      (diningRoom.multiTwinSmallResidents || 0) +
      (diningRoom.multiTwinStandardResidents || 0) +
      (diningRoom.level3Residents || 0) +
      (diningRoom.level4Residents || 0) +
      (diningRoom.level5Residents || 0) +
      (diningRoom.level6Residents || 0) +
      (diningRoom.allergyFreeResidents || 0) +
      (diningRoom.fingerFoodResidents || 0) +
      (diningRoom.miniMealResidents || 0)
    );
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="numberOfDiningRooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Dining Rooms</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="1"
                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 1)}
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="diningRooms.0.totalResidents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Residents</FormLabel>
            <FormControl>
              <Input 
                type="number"
                disabled
                value={field.value || 0}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};