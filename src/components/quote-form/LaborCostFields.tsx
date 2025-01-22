import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, LaborRole } from "./types";
import { RoleCard } from "./labor-costs/RoleCard";
import { ApetitoLaborCard } from "./labor-costs/ApetitoLaborCard";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface LaborCostFieldsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const LaborCostFields = ({ form }: LaborCostFieldsProps) => {
  const roles = form.watch('roles') || [];
  const numberOfRoles = form.watch('numberOfRoles') || 0;

  const handleAddRole = () => {
    const newRole: LaborRole = {
      name: `New Role ${roles.length + 1}`,
      hourlyRate: 0,
      hoursPerWeek: 0,
      numberOfSimilarRoles: 1
    };
    
    form.setValue('roles', [...roles, newRole]);
    form.setValue('numberOfRoles', numberOfRoles + 1);
  };

  const handleDeleteRole = (index: number) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    form.setValue('roles', updatedRoles);
    form.setValue('numberOfRoles', numberOfRoles - 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Current Labour Costs</h3>
        
        <div className="mb-6">
          <FormField
            control={form.control}
            name="numberOfRoles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Roles</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      field.onChange(newValue);
                      
                      // Adjust roles array size
                      if (newValue > roles.length) {
                        const newRoles = [...roles];
                        for (let i = roles.length; i < newValue; i++) {
                          newRoles.push({
                            name: `New Role ${i + 1}`,
                            hourlyRate: 0,
                            hoursPerWeek: 0,
                            numberOfSimilarRoles: 1
                          });
                        }
                        form.setValue('roles', newRoles);
                      } else if (newValue < roles.length) {
                        form.setValue('roles', roles.slice(0, newValue));
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <RoleCard 
              key={index}
              form={form}
              roleIndex={index}
              onDelete={() => handleDeleteRole(index)}
              bgColor={`bg-gradient-to-br from-${index % 2 ? 'blue' : 'green'}-50 to-${index % 2 ? 'blue' : 'green'}-100`}
              textColor={`text-${index % 2 ? 'blue' : 'green'}-900`}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleAddRole}
          className="mt-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </Button>
      </div>

      <div className="mt-8">
        <ApetitoLaborCard form={form} />
      </div>
    </div>
  );
};