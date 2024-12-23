import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const priceListOptions = [
  { customerNo: "1103998", priceHierarchy: "0008801129", customerId: "CUST001" },
  { customerNo: "1103999", priceHierarchy: "0008801130", customerId: "CUST002" },
  { customerNo: "1104000", priceHierarchy: "0008801097", customerId: "CUST003" },
  { customerNo: "1104045", priceHierarchy: "0008801128", customerId: "CUST004" },
];

interface PricingInformationProps {
  form: UseFormReturn<QuoteFormData>;
}

export const PricingInformation = ({ form }: PricingInformationProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-700">Pricing Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="priceListName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price List</FormLabel>
              <Select
                onValueChange={(value) => {
                  const [customerNo, priceHierarchy, customerId] = value.split(',');
                  field.onChange({ customerNo, priceHierarchy, customerId });
                }}
                value={`${field.value.customerNo},${field.value.priceHierarchy},${field.value.customerId}`}
              >
                <FormControl>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select a price list" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {priceListOptions.map((option) => (
                    <SelectItem 
                      key={`${option.customerNo}-${option.priceHierarchy}`}
                      value={`${option.customerNo},${option.priceHierarchy},${option.customerId}`}
                      className="hover:bg-gray-100"
                    >
                      {`Customer: ${option.customerNo}, Price Hierarchy: ${option.priceHierarchy}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="currentFoodSpend"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Food Spend Per Year (£)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    step="0.01"
                    placeholder="Enter current food spend"
                    className="bg-white"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
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
                <FormLabel>Estimated Non-apetito Food Spend Per Year (£)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    step="0.01"
                    placeholder="Enter estimated non-apetito spend"
                    className="bg-white"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};