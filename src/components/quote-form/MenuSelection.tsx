import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, MenuOption } from "./types";

const menuOptions: MenuOption[] = [
  { menuName: "Menu A - Sep 2024", menuId: "90667" },
  { menuName: "Menu B - Sep 2024", menuId: "90670" }
];

interface MenuSelectionProps {
  form: UseFormReturn<QuoteFormData>;
}

export const MenuSelection = ({ form }: MenuSelectionProps) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Menu Selection</h3>
      <FormField
        control={form.control}
        name="selectedMenu"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Menu</FormLabel>
            <Select
              onValueChange={(value) => {
                const selectedMenu = menuOptions.find(menu => menu.menuId === (value));
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
              <SelectContent className="bg-white z-50">
                {menuOptions.map((menu) => (
                  <SelectItem 
                    key={menu.menuId} 
                    value={menu.menuId.toString()}
                    className="hover:bg-gray-100"
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
    </div>
  );
};