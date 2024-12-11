import React, { useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2 } from "lucide-react";

const sampleQuoteData: QuoteFormData = {
  careHomeName: "Sample Care Home",
  careHomeAddress: "123 Sample Street, Sample City",
  numberOfDiningRooms: 2,
  diningRooms: [
    {
      name: "Main Dining Room",
      totalResidents: 50,
      mealCategories: ["Standard", "Large", "Allergy Free"],
      menuType: "Standard",
      offeringTiers: ["Silver"],
      menuCycle: "4",
      allergyFreeMeals: 5,
      energyDenseMeals: 0,
      fingerMeals: 0,
      standardResidents: 40,
      largeResidents: 5,
      allergyFreeResidents: 5,
      energyDenseResidents: 0,
      fingerFoodResidents: 0,
    },
    {
      name: "Special Care Dining",
      totalResidents: 20,
      mealCategories: ["Energy Dense", "Finger Food"],
      menuType: "Specialized",
      offeringTiers: ["Gold"],
      menuCycle: "4",
      allergyFreeMeals: 0,
      energyDenseMeals: 12,
      fingerMeals: 8,
      standardResidents: 0,
      largeResidents: 0,
      allergyFreeResidents: 0,
      energyDenseResidents: 12,
      fingerFoodResidents: 8,
    },
  ],
  menuCycle: "4",
  priceListNumber: "12345",
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

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit, isLoading, defaultValues, onClearForm }) => {
  const form = useForm<QuoteFormData>({
    defaultValues: defaultValues || {
      careHomeName: "",
      careHomeAddress: "",
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
      currentFoodSpend: 0,
      estimatedNonApetitoSpend: 0,
    },
  });

  const { toast } = useToast();
  const diningRooms = form.watch('diningRooms') || [];
  const numberOfDiningRooms = form.watch('numberOfDiningRooms') || 1;

  useEffect(() => {
    const currentDiningRooms = form.getValues('diningRooms') || [];
    const newDiningRooms = [...currentDiningRooms];

    // Add new dining rooms if needed
    while (newDiningRooms.length < numberOfDiningRooms) {
      newDiningRooms.push({
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
      });
    }

    // Remove extra dining rooms if needed
    while (newDiningRooms.length > numberOfDiningRooms) {
      newDiningRooms.pop();
    }

    form.setValue('diningRooms', newDiningRooms);
  }, [numberOfDiningRooms, form]);

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
      careHomeAddress: "",
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
    <Form {...form}>
      <form className="space-y-6 bg-white rounded-lg shadow-md">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleLoadSample}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:text-gray-900 transition-all px-4 py-2"
            >
              <Upload className="w-4 h-4" />
              Load Sample
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClearForm}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:text-gray-900 transition-all px-4 py-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Form
            </Button>
          </div>

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
        </div>
        
        <div className="p-6 bg-gray-50 rounded-b-lg">
          <Button 
            type="button" 
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Generate Quote
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuoteForm;
