import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QuoteFormData } from "./types";
import { UseFormReturn } from "react-hook-form";

interface FormActionsProps {
  form: UseFormReturn<QuoteFormData>;
  onLoadSample: () => void;
  onClearForm: () => void;
}

export const FormActions = ({ form, onLoadSample, onClearForm }: FormActionsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      <Button
        type="button"
        variant="outline"
        onClick={onLoadSample}
        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:text-gray-900 transition-all px-4 py-2"
      >
        <Upload className="w-4 h-4" />
        Load Sample
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onClearForm}
        className="w-full flex items-center justify-center gap-2 bg-red-400  hover:bg-gray-50 border-gray-200 text-gray-50 hover:text-gray-900 transition-all px-4 py-2"
      >
        <Trash2 className="w-4 h-4" />
        Clear Form
      </Button>
    </div>
  );
};