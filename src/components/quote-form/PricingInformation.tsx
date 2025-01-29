import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const priceListOptions = [
  { customerNo: "1103998", priceHierarchy: "0008801129", customerId: "2406", customerName: "National" },
  { customerNo: "1104045", priceHierarchy: "0008801128", customerId: "2468", customerName: "Regional" },
  { customerNo: "1104000", priceHierarchy: "0008801097", customerId: "2408", customerName: "Independent" },
  { customerNo: "1103999", priceHierarchy: "0008801130", customerId: "2407", customerName: "Small Groups" },
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
                  const [customerNo, priceHierarchy, customerId, customerName] = value.split(',');
                  field.onChange({ customerNo, priceHierarchy, customerId, customerName });
                }}
                value={`${field.value.customerNo},${field.value.priceHierarchy},${field.value.customerId},${field.value.customerName}`}
              >
                <FormControl>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select a price list">
                      {field.value.customerName || "Select a price list"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {priceListOptions.map((option) => (
                    <SelectItem
                      key={`${option.customerNo}-${option.priceHierarchy}`}
                      value={`${option.customerNo},${option.priceHierarchy},${option.customerId}, ${option.customerName}`}
                      className="hover:bg-gray-100"
                    >
                      {`${option.customerName}`}
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