import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { CareHomeDetails } from "./quote-form/CareHomeDetails";
import { DiningRoomFields } from "./quote-form/DiningRoomFields";
import { LaborCostFields } from "./quote-form/LaborCostFields";
import type { QuoteFormData } from "./quote-form/types";

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  isLoading?: boolean;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<QuoteFormData>({
    defaultValues: {
      diningRooms: [{ 
        name: "Main Dining Room",
        standardMeals: 0,
        allergyFreeMeals: 0,
        energyDenseMeals: 0,
        fingerMeals: 0,
        menuType: "A",
        portionSize: "standard"
      }],
      offeringTier: "Silver",
      menuCycle: "4",
      breakfastIncluded: false,
      teaIncluded: false,
      currentLabourHours: 10,
      currentLabourCost: 0,
      currentFoodSpend: 0,
      estimatedNonApetitoSpend: 0,
    },
  });

  const loadExampleData = () => {
    form.reset({
      careHomeName: "Sample Care Home",
      careHomeAddress: "123 Care Street, London",
      diningRooms: [{
        name: "Main Dining Room",
        standardMeals: 25,
        allergyFreeMeals: 5,
        energyDenseMeals: 8,
        fingerMeals: 4,
        menuType: "A",
        portionSize: "standard"
      }],
      offeringTier: "Silver",
      menuCycle: "4",
      breakfastIncluded: true,
      teaIncluded: true,
      currentLabourHours: 10,
      currentLabourCost: 15000,
      currentFoodSpend: 25000,
      estimatedNonApetitoSpend: 2000,
      priceListNumber: "PL001"
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <CareHomeDetails form={form} />
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-700">Dining Information</h3>
          {form.getValues().diningRooms.map((_, index) => (
            <DiningRoomFields key={index} form={form} index={index} />
          ))}
        </div>

        <Separator />
        
        <LaborCostFields form={form} />

        <div className="flex gap-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Start Quote
          </Button>
          <Button 
            type="button"
            variant="outline"
            onClick={loadExampleData}
            className="flex-1"
          >
            Load Example
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuoteForm;