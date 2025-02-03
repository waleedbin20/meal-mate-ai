import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { QuoteFormData } from "./types";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiningRoomsSection } from "./DiningRoomsSection";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NumberOfDiningRoomsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const NumberOfDiningRooms = ({ form }: NumberOfDiningRoomsProps) => {
  const { toast } = useToast();
  const diningRooms = useWatch({
    control: form.control,
    name: "diningRooms",
    defaultValue: []
  });

  const handleAddDiningRoom = () => {
    if (diningRooms.length >= 10) {
      toast({
        title: "Maximum Limit Reached",
        description: "Cannot add more than 10 dining rooms",
        variant: "destructive",
      });
      return;
    }

    const newDiningRooms = [...diningRooms, {
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
    }];

    form.setValue("diningRooms", newDiningRooms);
    form.setValue("numberOfDiningRooms", newDiningRooms.length);
  };

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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Dining Rooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={diningRooms.length}
                      disabled
                      className="max-w-[200px] bg-gray-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={handleAddDiningRoom}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Dining Room
            </Button>
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