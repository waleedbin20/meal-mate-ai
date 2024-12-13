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
    const newDiningRooms = [...currentDiningRooms];

    while (newDiningRooms.length < numberOfDiningRooms) {
      newDiningRooms.push({
        name: "",
        totalResidents: 0,
        mealCategories: [],
        selectedMenu: { menuName: "Menu A - Sep 2024", menuId: "90667" },
        standardResidents: 0,
        level3Residents: 0,
        level4Residents: 0,
        level5Residents: 0,
        level6Residents: 0,
        allergyFreeResidents: 0,
        fingerFoodResidents: 0,
        miniMealResidents: 0,
      });
    }

    while (newDiningRooms.length > numberOfDiningRooms) {
      newDiningRooms.pop();
    }

    form.setValue('diningRooms', newDiningRooms);
  }, [numberOfDiningRooms, form]);

  return null;
};