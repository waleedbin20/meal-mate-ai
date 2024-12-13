import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface FormInitializerProps {
  form: UseFormReturn<QuoteFormData>;
  numberOfDiningRooms: number;
}

export const FormInitializer = ({ form, numberOfDiningRooms }: FormInitializerProps) => {
  useEffect(() => {
    const currentDiningRooms = form.getValues('diningRooms') || [];
    
    // Only remove dining rooms if there are too many
    while (currentDiningRooms.length > numberOfDiningRooms) {
      currentDiningRooms.pop();
    }

    form.setValue('diningRooms', currentDiningRooms);
  }, [numberOfDiningRooms, form]);

  return null;
};