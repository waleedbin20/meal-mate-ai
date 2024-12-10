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
        menuType: "A"
      }],
      offeringTier: "Silver",
      menuCycle: "4",
      breakfastIncluded: false,
      teaIncluded: false,
    },
  });

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
          <h3 className="text-lg font-semibold text-purple-700">Menu Information</h3>
          <FormField
            control={form.control}
            name="offeringTier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offering Tier</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Silver">Silver (Standard)</SelectItem>
                    <SelectItem value="Platinum">Platinum (Premium)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="menuCycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu Cycle (weeks)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cycle length" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="4">4 Week Cycle</SelectItem>
                    <SelectItem value="6">6 Week Cycle</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-700">Pricing Information</h3>
          <FormField
            control={form.control}
            name="priceListNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price List Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter price list number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          Start Quote
        </Button>
      </form>
    </Form>
  );
};

export default QuoteForm;