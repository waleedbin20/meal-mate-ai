import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, MenuOption } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const menuOptions: MenuOption[] = [
  { menuName: "Menu A - Jan 2025", menuId: "97481" },
  { menuName: "Menu B - Sep 2024", menuId: "90670" }
];

interface MenuSelectionProps {
  form: UseFormReturn<QuoteFormData>;
}

export const MenuSelection = ({ form }: MenuSelectionProps) => {
  const selectedMenu = form.watch('selectedMenu');
  const isMenuA = selectedMenu?.menuId === "97481";

  const handleRemoveLighterMeal = () => {
    form.setValue("extras.lighterMealOption", null);
  };

  React.useEffect(() => {
    if (!isMenuA) {
      // Reset extra options when Menu B is selected
      form.setValue("extras.includeBreakfast", false);
      form.setValue("extras.lighterMealOption", null);
      form.setValue("extras.includeLighterMealDessert", false);
    }
  }, [isMenuA, form]);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-700">Menu Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="selectedMenu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menu</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selectedMenu = menuOptions.find(menu => menu.menuId === value);
                  if (selectedMenu) {
                    field.onChange(selectedMenu);
                  }
                }}
                value={field.value?.menuId.toString()}
              >
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select a menu" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {menuOptions.map((menu) => (
                    <SelectItem
                      key={menu.menuId}
                      value={menu.menuId.toString()}
                      className="hover:bg-purple-50"
                    >
                      {menu.menuName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isMenuA && (
          <>
            <Separator className="my-4" />

            <div className="space-y-6">
              <h3 className="text-md font-medium text-purple-700">Extra Options</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="extras.includeBreakfast"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include Breakfast</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Add breakfast service to your meal plan
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="extras.lighterMealOption"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center justify-between">
                        <FormLabel>Lighter Meal Options</FormLabel>
                        {field.value && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveLighterMeal}
                            className="h-8 px-2 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="font-normal">Standard Lighter Meal</Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="two-course" id="two-course" />
                            <Label htmlFor="two-course" className="font-normal">Two Course Lighter Meal</Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="premium" id="premium" />
                            <Label htmlFor="premium" className="font-normal">Premium Lighter Meal</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="extras.includeLighterMealDessert"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include Lighter Meal Dessert</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Add dessert to lighter meal options
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};