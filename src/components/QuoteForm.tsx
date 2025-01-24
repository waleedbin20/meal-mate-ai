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
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const sampleQuoteData: QuoteFormData = {
  creatorName: "John Smith",
  careHomeName: "Sample Care Home",
  numberOfDiningRooms: 2,
  totalResidents: 70,
  diningRooms: [
    {
      name: "Main Dining Room",
      mealCategories: ["Multi Twin", "Level 4 IDDSI", "Allergy-Free"],
      multiTwinSize: "Large",
      multiTwinResidents: 40,
      level3Residents: 0,
      level4Residents: 5,
      level5Residents: 0,
      level6Residents: 0,
      allergyFreeResidents: 5,
      fingerFoodResidents: 0,
      miniMealResidents: 0,
      religiousDietsResidents: 0,
      totalResidentsInDiningRoom: 50
    },
    {
      name: "Special Care Dining",
      mealCategories: ["Level 3 IDDSI", "Finger Foods"],
      multiTwinResidents: 0,
      level3Residents: 12,
      level4Residents: 0,
      level5Residents: 0,
      level6Residents: 0,
      allergyFreeResidents: 0,
      fingerFoodResidents: 8,
      miniMealResidents: 0,
      religiousDietsResidents: 0,
      totalResidentsInDiningRoom: 20
    },
  ],
  selectedMenu: { menuName: "Menu A - Sep 2024", menuId: "90667" },
  extras: {
    includeBreakfast: false,
    lighterMealOption: null,
    includeLighterMealDessert: false
  },
  priceListName: { customerNo: "1103998", priceHierarchy: "0008801129", customerId: "2406" },
  currentLabourHours: 40,
  currentLabourCost: 50000,
  currentFoodSpend: 75000,
  estimatedNonApetitoSpend: 25000,
  numberOfRoles: 3,
  roles: [
    {
      name: "Kitchen Manager",
      hourlyRate: 12,
      hoursPerWeek: 40,
      numberOfSimilarRoles: 1
    },
    {
      name: "Chef",
      hourlyRate: 15,
      hoursPerWeek: 35,
      numberOfSimilarRoles: 2
    },
    {
      name: "Kitchen Assistant",
      hourlyRate: 18,
      hoursPerWeek: 30,
      numberOfSimilarRoles: 3
    }
  ],
  apetitoLabor: {
    name: "Apetito Labor",
    hourlyRate: 14,
    hoursPerWeek: 35,
    numberOfSimilarRoles: 1
  }
};

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<QuoteFormData>;
  onClearForm?: () => void;
}

export const QuoteForm = ({ 
  onSubmit, 
  isLoading, 
  defaultValues, 
  onClearForm 
}: QuoteFormProps) => {
  const form = useForm<QuoteFormData>({
    defaultValues: defaultValues || {
      creatorName: "",
      careHomeName: "",
      numberOfDiningRooms: 1,
      totalResidents: 0,
      diningRooms: [
        {
          name: "",
          mealCategories: [],
          multiTwinResidents: 0,
          level3Residents: 0,
          level4Residents: 0,
          level5Residents: 0,
          level6Residents: 0,
          allergyFreeResidents: 0,
          fingerFoodResidents: 0,
          miniMealResidents: 0,
          religiousDietsResidents: 0,
          totalResidentsInDiningRoom: 0
        }
      ],
      selectedMenu: { menuName: "Menu A - Sep 2024", menuId: "90667" },
      extras: {
        includeBreakfast: false,
        lighterMealOption: null,
        includeLighterMealDessert: false
      },
      priceListName: { customerNo: "1103998", priceHierarchy: "0008801129", customerId: "2406" },
      currentLabourHours: 0,
      currentLabourCost: 0,
      currentFoodSpend: 0,
      estimatedNonApetitoSpend: 0,
      numberOfRoles: 0,
      roles: [],
      apetitoLabor: {
        name: "",
        hourlyRate: 0,
        hoursPerWeek: 0,
        numberOfSimilarRoles: 0
      }
    },
    mode: "onChange",
  });

  const { toast } = useToast();
  const diningRooms = form.watch('diningRooms') || [];
  const numberOfDiningRooms = form.watch('numberOfDiningRooms') || 1;
  const creatorName = form.watch('creatorName') || '';

  const handleSubmit = (data: QuoteFormData) => {
    if (!data.creatorName.trim()) {
      toast({
        title: "Validation Error",
        description: "Creator Name is required",
        variant: "destructive",
      });
      return;
    }

    if (!data.careHomeName.trim()) {
      toast({
        title: "Validation Error",
        description: "Care Home Name is required",
        variant: "destructive",
      });
      return;
    }

    if (data.numberOfDiningRooms < 1) {
      toast({
        title: "Validation Error",
        description: "Number of Dining Rooms must be at least 1",
        variant: "destructive",
      });
      return;
    }

    console.log('Form data being sent to API:', JSON.stringify(data, null, 2));
    onSubmit(data);
  };

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
      creatorName: "",
      careHomeName: "",
      numberOfDiningRooms: 1,
      totalResidents: 0,
      diningRooms: [
        {
          name: "",
          mealCategories: [],
          multiTwinResidents: 0,
          level3Residents: 0,
          level4Residents: 0,
          level5Residents: 0,
          level6Residents: 0,
          allergyFreeResidents: 0,
          fingerFoodResidents: 0,
          miniMealResidents: 0,
          religiousDietsResidents: 0,
          totalResidentsInDiningRoom: 0
        }
      ],
      selectedMenu: { menuName: "Menu A - Sep 2024", menuId: "90667" },
      priceListName: { customerNo: "1103998", priceHierarchy: "0008801129", customerId: "2406" },
      currentLabourHours: 0,
      currentLabourCost: 0,
      currentFoodSpend: 0,
      estimatedNonApetitoSpend: 0,
      numberOfRoles: 0,
      roles: [],
      apetitoLabor: {
        name: "",
        hourlyRate: 0,
        hoursPerWeek: 0,
        numberOfSimilarRoles: 0
      }
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

      <div className="space-y-4 mb-6">
        <FormField
          control={form.control}
          name="creatorName"
          rules={{
            required: "Creator Name is required",
            minLength: {
              value: 2,
              message: "Creator Name must be at least 2 characters"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creator Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your name" className="bg-white" />
              </FormControl>
              <p className="text-sm text-muted-foreground">Name of the apetito user</p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {creatorName.trim() && (
        <>
          <CareHomeDetails form={form} />
          
          <NumberOfDiningRooms form={form} />

          <DiningRoomsSection form={form} diningRooms={diningRooms} />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="totalResidents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Residents (All Dining Rooms)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      disabled
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <MenuSelection form={form} />

          <div className="space-y-4">
            <PricingInformation form={form} />
          </div>

          <LaborCostFields form={form} />

          <FormSubmitButton 
            isLoading={isLoading}
            onClick={form.handleSubmit(handleSubmit)}
          />
        </>
      )}
    </FormWrapper>
  );
};
