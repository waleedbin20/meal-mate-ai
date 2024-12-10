import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface DiningRoom {
  name: string;
  standardMeals: number;
  allergyFreeMeals: number;
  energyDenseMeals: number;
  fingerMeals: number;
  menuType: string;
  portionSize: "standard" | "large";
}

interface QuoteFormData {
  careHomeName: string;
  careHomeAddress: string;
  diningRooms: DiningRoom[];
  offeringTier: "Silver" | "Platinum";
  menuCycle: string;
  breakfastIncluded: boolean;
  teaIncluded: boolean;
  priceListNumber: string;
  currentLabourHours: number;
  currentLabourCost: number;
  currentFoodSpend: number;
  estimatedNonApetitoSpend: number;
}

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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-700">Care Home Details</h3>
          <FormField
            control={form.control}
            name="careHomeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Care Home Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter care home name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="careHomeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-700">Dining Information</h3>
          {form.getValues().diningRooms.map((_, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <FormField
                control={form.control}
                name={`diningRooms.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dining Room Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter dining room name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`diningRooms.${index}.standardMeals`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard Meals</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`diningRooms.${index}.allergyFreeMeals`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergy-Free Meals</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`diningRooms.${index}.energyDenseMeals`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Energy-Dense Meals</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`diningRooms.${index}.fingerMeals`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finger Meals</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`diningRooms.${index}.portionSize`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portion Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select portion size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-700">Labour & Cost Information</h3>
          <FormField
            control={form.control}
            name="currentLabourHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Labour Hours (per day)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentLabourCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Labour Cost (£ per year)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentFoodSpend"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Food Spend (£ per year)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estimatedNonApetitoSpend"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Non-Apetito Spend (£ per year)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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