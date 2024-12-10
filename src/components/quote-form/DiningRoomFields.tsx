import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface DiningRoomFieldsProps {
  form: UseFormReturn<QuoteFormData>;
  index: number;
}

export const DiningRoomFields = ({ form, index }: DiningRoomFieldsProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
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
        name={`diningRooms.${index}.menuType`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Menu Template</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select menu template" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="A">Menu A</SelectItem>
                <SelectItem value="B">Menu B</SelectItem>
                <SelectItem value="C">Menu C</SelectItem>
              </SelectContent>
            </Select>
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
  );
};