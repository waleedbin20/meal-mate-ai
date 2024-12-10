import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CareHomeDetails } from "./quote-form/CareHomeDetails";
import { DiningRoomFields } from "./quote-form/DiningRoomFields";
import { LaborCostFields } from "./quote-form/LaborCostFields";
import type { QuoteFormData, MealCategory } from "./quote-form/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  isLoading?: boolean;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit, isLoading }) => {
  const { toast } = useToast();
  const form = useForm<QuoteFormData>({
    defaultValues: {
      numberOfDiningRooms: 1,
      diningRooms: [{
        name: "Main Dining Room",
        totalResidents: 0,
        mealCategories: ["Standard" as MealCategory],
        menuType: "A",
        offeringTiers: ["Silver" as "Silver" | "Gold" | "Platinum"],
        menuCycle: "4" as "4" | "6",
        allergyFreeMeals: 0,
        energyDenseMeals: 0,
        fingerMeals: 0,
        standardResidents: 0,
        largeResidents: 0,
        allergyFreeResidents: 0,
        energyDenseResidents: 0,
        fingerFoodResidents: 0
      }],
      offeringTier: "Silver",
      menuCycle: "4" as "4" | "6",
      breakfastIncluded: false,
      teaIncluded: false,
      currentLabourHours: 10,
      currentLabourCost: 0,
      currentFoodSpend: 0,
      estimatedNonApetitoSpend: 0,
      priceListNumber: "",
    },
  });

  const updateDiningRooms = (numberOfRooms: number) => {
    if (numberOfRooms < 1 || !Number.isInteger(numberOfRooms)) {
      toast({
        title: "Invalid Input",
        description: "Number of dining rooms must be a positive integer",
        variant: "destructive",
      });
      form.setValue("numberOfDiningRooms", 1);
      return;
    }

    const currentRooms = form.getValues("diningRooms");
    const safeNumberOfRooms = Math.min(Math.max(1, numberOfRooms), 100);
    
    const newRooms = Array.from({ length: safeNumberOfRooms }, (_, index) => {
      return currentRooms[index] || {
        name: `Dining Room ${index + 1}`,
        totalResidents: 0,
        mealCategories: ["Standard" as MealCategory],
        menuType: "A",
        offeringTiers: ["Silver" as "Silver" | "Gold" | "Platinum"],
        menuCycle: "4" as "4" | "6",
        allergyFreeMeals: 0,
        energyDenseMeals: 0,
        fingerMeals: 0,
        standardResidents: 0,
        largeResidents: 0,
        allergyFreeResidents: 0,
        energyDenseResidents: 0,
        fingerFoodResidents: 0
      };
    });
    
    form.setValue("diningRooms", newRooms);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <CareHomeDetails form={form} />
        <Separator />
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-purple-700">Dining Information</h3>
          </div>

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
                    max="100"
                    {...field} 
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(value);
                      updateDiningRooms(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {form.getValues().diningRooms.map((_, index) => (
            <DiningRoomFields key={index} form={form} index={index} />
          ))}
        </div>

        <Separator />
        
        <LaborCostFields form={form} />

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-700">Pricing Information</h3>
          <FormField
            control={form.control}
            name="priceListNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price List Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter price list number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Start Quote
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuoteForm;