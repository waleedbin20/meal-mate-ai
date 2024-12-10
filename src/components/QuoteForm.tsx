import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CareHomeDetails } from "./quote-form/CareHomeDetails";
import { DiningRoomFields } from "./quote-form/DiningRoomFields";
import { LaborCostFields } from "./quote-form/LaborCostFields";
import { QuoteFormData } from "./quote-form/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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
      offeringTier: "Silver",
      menuCycle: "4",
      breakfastIncluded: false,
      teaIncluded: false,
      priceListNumber: "",
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
            name="offeringTier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offering Tier</FormLabel>
                <FormControl>
                  <select 
                    className="w-full p-2 border rounded"
                    {...field}
                  >
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="breakfastIncluded"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Breakfast Included</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teaIncluded"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Tea Included</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

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

        <LaborCostFields form={form} />
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Generate Quote
        </Button>
      </form>
    </Form>
  );
};

export default QuoteForm;