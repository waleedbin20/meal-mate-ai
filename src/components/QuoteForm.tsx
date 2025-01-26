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
import { createQuote } from "@/services/quoteApiService";
import { useQueryClient } from "@tanstack/react-query";

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
  isLoading?: boolean;
  defaultValues?: QuoteFormData;
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
  const queryClient = useQueryClient();
  const diningRooms = form.watch('diningRooms') || [];
  const numberOfDiningRooms = form.watch('numberOfDiningRooms') || 1;
  const creatorName = form.watch('creatorName') || '';

  // Reset form with new values when defaultValues change
  React.useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const handleSubmit = async (data: QuoteFormData) => {
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

    try {
      // Send the create quote request without waiting for response
      createQuote(data)
        .then(() => {
          // Invalidate and refetch quotes after successful creation
          queryClient.invalidateQueries({ queryKey: ['quotes'] });
        })
        .catch(error => {
          console.error('Error creating quote:', error);
          toast({
            title: "Error",
            description: "Failed to save quote",
            variant: "destructive",
          });
        });

      console.log('Form data being sent to API:', JSON.stringify(data, null, 2));
      onSubmit(data);
    } catch (error) {
      console.error('Error handling form submission:', error);
      toast({
        title: "Error",
        description: "An error occurred while processing your request",
        variant: "destructive",
      });
    }
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

export default QuoteForm;
