import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "./types";

interface FormWrapperProps {
  form: UseFormReturn<QuoteFormData>;
  children: React.ReactNode;
}

export const FormWrapper = ({ form, children }: FormWrapperProps) => {
  return (
    <Form {...form}>
      <form className="space-y-6 bg-white rounded-lg shadow-md">
        <div className="p-6 space-y-6">
          {children}
        </div>
      </form>
    </Form>
  );
};