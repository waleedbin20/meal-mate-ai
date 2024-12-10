import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CareHomeDetails } from "./quote-form/CareHomeDetails";
import { DiningRoomFields } from "./quote-form/DiningRoomFields";
import { LaborCostFields } from "./quote-form/LaborCostFields";
import { QuoteFormData } from "./quote-form/types";

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
    },
  });

  const diningRooms = form.watch('diningRooms') || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <CareHomeDetails form={form} />
        {diningRooms.map((_, index) => (
          <DiningRoomFields key={index} form={form} index={index} />
        ))}
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