import { UseFormReturn } from "react-hook-form";
import { QuoteFormData, LaborRole } from "./types";
import { RoleCard } from "./labor-costs/RoleCard";
import { ApetitoLaborCard } from "./labor-costs/ApetitoLaborCard";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LaborCostFieldsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const LaborCostFields = ({ form }: LaborCostFieldsProps) => {
  const roles = form.watch('roles') || [];
  const { toast } = useToast();

  const handleAddRole = () => {
    const newRole: LaborRole = {
      name: `Role ${roles.length + 1}`,
      hourlyRate: 0,
      hoursPerWeek: 0,
      numberOfSimilarRoles: 1
    };
    
    const updatedRoles = [...roles, newRole];
    form.setValue('roles', updatedRoles);
    form.setValue('numberOfRoles', updatedRoles.length);

    toast({
      title: "Role Added",
      description: "A new role has been added to the form.",
    });
  };

  const handleDeleteRole = (index: number) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    form.setValue('roles', updatedRoles);
    form.setValue('numberOfRoles', updatedRoles.length);

    toast({
      title: "Role Removed",
      description: "The role has been removed from the form.",
    });
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
                    {...field}
                    value={roles.length}
                    disabled
                    className="bg-gray-100"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            onClick={handleAddRole}
            className="mt-4 bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Role
          </Button>
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
      </div>

      <div className="mt-8">
        <ApetitoLaborCard form={form} />
      </div>
    </div>
  );
};