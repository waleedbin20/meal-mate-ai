import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface FormInitializerProps {
  form: UseFormReturn<QuoteFormData>;
  numberOfDiningRooms: number;
}

export const FormInitializer = ({ form, numberOfDiningRooms }: FormInitializerProps) => {
  // Removed the effect that was adding dining room cards
  return null;
};