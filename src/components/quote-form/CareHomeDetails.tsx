import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const priceListOptions = [
  { customerNo: "1103998", priceHierarchy: "0008801129", customerId: "2406", customerName: "National" },
  { customerNo: "1104045", priceHierarchy: "0008801128", customerId: "2468", customerName: "Regional" },
  { customerNo: "1104000", priceHierarchy: "0008801097", customerId: "2408", customerName: "Independent" },
  { customerNo: "1103999", priceHierarchy: "0008801130", customerId: "2407", customerName: "Small Groups" },
];

interface CareHomeDetailsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const CareHomeDetails = ({ form }: CareHomeDetailsProps) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-purple-700">Care Home Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="careHomeName"
          rules={{
            required: "Care Home Name is required",
            minLength: {
              value: 2,
              message: "Care Home Name must be at least 2 characters"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Care Home Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter care home name" className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                      value={`${option.customerNo},${option.priceHierarchy},${option.customerId},${option.customerName}`}
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
      </CardContent>
    </Card>
  );
};