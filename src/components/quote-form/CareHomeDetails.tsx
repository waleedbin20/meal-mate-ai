import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface CareHomeDetailsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const CareHomeDetails = ({ form }: CareHomeDetailsProps) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-purple-700">Care Home Details</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="careHomeName"
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
      </CardContent>
    </Card>
  );
};