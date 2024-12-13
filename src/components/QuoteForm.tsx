import React from "react";
import { useForm } from "react-hook-form";
import { CareHomeDetails } from "./quote-form/CareHomeDetails";
import { DiningRoomsSection } from "./quote-form/DiningRoomsSection";
import { LaborCostFields } from "./quote-form/LaborCostFields";
import { PricingInformation } from "./quote-form/PricingInformation";
import { QuoteFormData } from "./quote-form/types";
import { useToast } from "@/hooks/use-toast";
import { MenuSelection } from "./quote-form/MenuSelection";
import { FormActions } from "./quote-form/FormActions";
import { FormSubmitButton } from "./quote-form/FormSubmitButton";
import { FormWrapper } from "./quote-form/FormWrapper";
import { NumberOfDiningRooms } from "./quote-form/NumberOfDiningRooms";
import { FormInitializer } from "./quote-form/FormInitializer";

const sampleQuoteData: QuoteFormData = {
  careHomeName: "Sample Care Home",
  numberOfDiningRooms: 2,
  diningRooms: [
    {
      name: "Main Dining Room",
      totalResidents: 50,
      mealCategories: ["Multi Twin Large", "Level 4 IDDSI", "Allergy-Free"],
      selectedMenu: { menuName: "Menu A - Sep 2024", menuId: "90667" },
      multiTwinLargeResidents: 40,
      multiTwinSmallResidents: 0,
      multiTwinStandardResidents: 0,
      level3Residents: 0,
      level4Residents: 5,
      level5Residents: 0,
      level6Residents: 0,
      allergyFreeResidents: 5,
      fingerFoodResidents: 0,
      miniMealResidents: 0
    },
    {
      name: "Special Care Dining",
      totalResidents: 20,
      mealCategories: ["Level 3 IDDSI", "Finger Foods"],
      selectedMenu: { menuName: "Menu B - Sep 2024", menuId: "90670" },
      multiTwinLargeResidents: 0,
      multiTwinSmallResidents: 0,
      multiTwinStandardResidents: 0,
      level3Residents: 12,
      level4Residents: 0,
      level5Residents: 0,
      level6Residents: 0,
      allergyFreeResidents: 0,
      fingerFoodResidents: 8,
      miniMealResidents: 0
    },
  ],
  selectedMenu: { menuName: "Menu A - Sep 2024", menuId: "90667" },
  priceListName: "Jan 23 Launch Menu with TM",
  currentLabourHours: 40,
  currentLabourCost: 50000,
  currentFoodSpend: 75000,
  estimatedNonApetitoSpend: 25000,
};

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<QuoteFormData>;
  onClearForm?: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ 
  onSubmit, 
  isLoading, 
  defaultValues, 
  onClearForm 
}) => {
  const form = useForm<QuoteFormData>({
    defaultValues: defaultValues || {
      careHomeName: "",
      numberOfDiningRooms: 1,
      diningRooms: [
        {
          name: "",
          totalResidents: 0,
          mealCategories: [],
          selectedMenu: { menuName: "Menu A - Sep 2024", menuId: "90667" },
          multiTwinLargeResidents: 0,
          multiTwinSmallResidents: 0,
          multiTwinStandardResidents: 0,
          level3Residents: 0,
          level4Residents: 0,
          level5Residents: 0,
          level6Residents: 0,
          allergyFreeResidents: 0,
          fingerFoodResidents: 0,
          miniMealResidents: 0,
        },
      ],
      selectedMenu: { menuName: "Menu A - Sep 2024", menuId: "90667" },
      priceListName: "Jan 23 Launch Menu with TM",
      currentLabourHours: 0,
      currentLabourCost: 0,
      currentFoodSpend: 0,
      estimatedNonApetitoSpend: 0,
    },
  });

  const { toast } = useToast();
  const diningRooms = form.watch('diningRooms') || [];
  const numberOfDiningRooms = form.watch('numberOfDiningRooms') || 1;

  const handleLoadSample = () => {
    Object.keys(sampleQuoteData).forEach(key => {
      form.setValue(key as keyof QuoteFormData, sampleQuoteData[key as keyof QuoteFormData]);
    });
    toast({
      title: "Sample Data Loaded",
      description: "The form has been populated with sample data.",
    });
  };

  const handleClearForm = () => {
    form.reset({
      careHomeName: "",
      numberOfDiningRooms: 1,
      diningRooms: [
        {
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
        },
      ],
      selectedMenu: { menuName: "Menu A - Sep 2024", menuId: "90667" },
      priceListName: "Jan 23 Launch Menu with TM",
      currentLabourHours: 0,
      currentLabourCost: 0,
      currentFoodSpend: 0,
      estimatedNonApetitoSpend: 0,
    });
    onClearForm?.();
    toast({
      title: "Form Cleared",
      description: "All form fields have been reset.",
    });
  };

  return (
    <FormWrapper form={form}>
      <FormInitializer form={form} numberOfDiningRooms={numberOfDiningRooms} />
      
      <FormActions 
        form={form}
        onLoadSample={handleLoadSample}
        onClearForm={handleClearForm}
      />

      <CareHomeDetails form={form} />
      
      <NumberOfDiningRooms form={form} />

      <DiningRoomsSection form={form} diningRooms={diningRooms} />

      <MenuSelection form={form} />

      <div className="space-y-4">
        <PricingInformation form={form} />
      </div>

      <LaborCostFields form={form} />

      <FormSubmitButton 
        isLoading={isLoading}
        onClick={form.handleSubmit(onSubmit)}
      />
    </FormWrapper>
  );
};

export default QuoteForm;