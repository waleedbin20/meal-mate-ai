import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, MenuOption, Level4Options, Level5Options, Level6Options } from "./types";
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

const level4Options: Level4Options[] = ["Breakfast", "Snacks", "Dessert"];
const level5Options: Level5Options[] = ["Dessert"];
const level6Options: Level6Options[] = ["Dessert"];

interface MenuSelectionProps {
  form: UseFormReturn<QuoteFormData>;
}

export const MenuSelection = ({ form }: MenuSelectionProps) => {
  const selectedMenu = form.watch('selectedMenu');
  const diningRooms = form.watch('diningRooms');
  const isMenuA = selectedMenu?.menuId === "97481";

  const hasLevel4Selected = diningRooms.some(room => 
    room.mealCategories?.includes("Level 4 IDDSI")
  );
  const hasLevel5Selected = diningRooms.some(room => 
    room.mealCategories?.includes("Level 5 IDDSI")
  );
  const hasLevel6Selected = diningRooms.some(room => 
    room.mealCategories?.includes("Level 6 IDDSI")
  );

  const handleRemoveLighterMeal = () => {
    form.setValue("extras.lighterMealOption", null);
  };

  React.useEffect(() => {
    if (!isMenuA) {
      form.setValue("extras.includeBreakfast", false);
      form.setValue("extras.lighterMealOption", null);
      form.setValue("extras.includeLighterMealDessert", false);
      form.setValue("selectedMenu.level4Options", []);
      form.setValue("selectedMenu.level5Options", []);
      form.setValue("selectedMenu.level6Options", []);
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
                value={field.value?.menuId?.toString()}
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

            {hasLevel4Selected && (
              <div className="space-y-4">
                <h3 className="text-md font-medium text-purple-700">Level 4 IDDSI Options</h3>
                <FormField
                  control={form.control}
                  name="selectedMenu.level4Options"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-2">
                        {level4Options.map((option) => (
                          <FormItem key={option} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  const newValue = checked
                                    ? [...currentValue, option]
                                    : currentValue.filter((v) => v !== option);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <Label className="font-normal">{option}</Label>
                          </FormItem>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {hasLevel5Selected && (
              <div className="space-y-4">
                <h3 className="text-md font-medium text-purple-700">Level 5 IDDSI Options</h3>
                <FormField
                  control={form.control}
                  name="selectedMenu.level5Options"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-2">
                        {level5Options.map((option) => (
                          <FormItem key={option} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  const newValue = checked
                                    ? [...currentValue, option]
                                    : currentValue.filter((v) => v !== option);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <Label className="font-normal">{option}</Label>
                          </FormItem>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {hasLevel6Selected && (
              <div className="space-y-4">
                <h3 className="text-md font-medium text-purple-700">Level 6 IDDSI Options</h3>
                <FormField
                  control={form.control}
                  name="selectedMenu.level6Options"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-2">
                        {level6Options.map((option) => (
                          <FormItem key={option} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  const newValue = checked
                                    ? [...currentValue, option]
                                    : currentValue.filter((v) => v !== option);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <Label className="font-normal">{option}</Label>
                          </FormItem>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

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
          </>
        )}
      </CardContent>
    </Card>
  );
};