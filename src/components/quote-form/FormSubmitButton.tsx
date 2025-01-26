import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormSubmitButtonProps {
  isLoading?: boolean;
  onClick: () => void;
}

export const FormSubmitButton = ({ isLoading, onClick }: FormSubmitButtonProps) => {
  return (
    <div className="p-6 bg-gray-50 rounded-b-lg">
      <Button 
        type="button" 
        onClick={onClick}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Quote...
          </>
        ) : (
          'Generate Quote'
        )}
      </Button>
    </div>
  );
};