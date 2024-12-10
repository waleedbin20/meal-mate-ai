import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CareHomeDetails } from "./quote-form/CareHomeDetails";
import { DiningRoomFields } from "./quote-form/DiningRoomFields";
import { LaborCostFields } from "./quote-form/LaborCostFields";
import { PricingInformation } from "./quote-form/PricingInformation";
import { QuoteFormData } from "./quote-form/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<QuoteFormData>;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit, isLoading, defaultValues }) => {
  const form = useForm<QuoteFormData>({
    defaultValues: defaultValues || {
      numberOfDiningRooms: 1,
      diningRooms: [
        {
          name: "",
          totalResidents: 0,
          mealCategories: [],
          menuType: "",
          offeringTiers: [],
          menuCycle: "4",
          allergyFreeMeals: 0,
          energyDenseMeals: 0,
          fingerMeals: 0,
          standardResidents: 0,
          largeResidents: 0,
          allergyFreeResidents: 0,
          energyDenseResidents: 0,
          fingerFoodResidents: 0,
        },
      ],
      menuCycle: "4",
      priceListNumber: "",
      currentLabourHours: 0,
      currentLabourCost: 0,
    },
  });

  const diningRooms = form.watch('diningRooms') || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <CareHomeDetails form={form} />
        
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

        {diningRooms.map((_, index) => (
          <DiningRoomFields key={index} form={form} index={index} />
        ))}

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="menuCycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu Cycle</FormLabel>
                <FormControl>
                  <select 
                    className="w-full p-2 border rounded"
                    {...field}
                  >
                    <option value="4">4 Week</option>
                    <option value="6">6 Week</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <PricingInformation form={form} />
        <LaborCostFields form={form} />
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Generate Quote
        </Button>
      </form>
    </Form>
  );
};

export default QuoteForm;