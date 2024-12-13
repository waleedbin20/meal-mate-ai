import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";
import { RoleCard } from "./labor-costs/RoleCard";
import { ApetitoLaborCard } from "./labor-costs/ApetitoLaborCard";

interface LaborCostFieldsProps {
  form: UseFormReturn<QuoteFormData>;
}

export const LaborCostFields = ({ form }: LaborCostFieldsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Current Labour Costs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RoleCard 
            form={form} 
            roleNumber={1} 
            bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
            textColor="text-blue-900"
          />
          <RoleCard 
            form={form} 
            roleNumber={2} 
            bgColor="bg-gradient-to-br from-green-50 to-green-100"
            textColor="text-green-900"
          />
          <RoleCard 
            form={form} 
            roleNumber={3} 
            bgColor="bg-gradient-to-br from-amber-50 to-amber-100"
            textColor="text-amber-900"
          />
        </div>
      </div>

      <div className="mt-8">
        <ApetitoLaborCard form={form} />
      </div>
    </div>
  );
};