import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Product, ProductCategory, ProductSize } from "@/pages/ProductsPage";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, "id">) => void;
}

const defaultPortionSizes: ProductSize[] = Array(4).fill({
  size: "",
  smallEquivalent: "",
});

const defaultCategories: ProductCategory[] = [
  { type: "large", portionSizes: [...defaultPortionSizes] },
  { type: "standard", portionSizes: [...defaultPortionSizes] },
  { type: "small", portionSizes: [...defaultPortionSizes] },
];

export const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
  const form = useForm<Omit<Product, "id">>({
    defaultValues: initialData || {
      name: "",
      largeCode: "",
      smallCode: "",
      categories: defaultCategories,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="largeCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Large Product Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="smallCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Small Product Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {form.watch("categories").map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h3 className="font-semibold capitalize">{category.type}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.portionSizes.map((_, sizeIndex) => (
                <div key={sizeIndex} className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`categories.${categoryIndex}.portionSizes.${sizeIndex}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portion Size {sizeIndex + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`categories.${categoryIndex}.portionSizes.${sizeIndex}.smallEquivalent`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Small Equivalent</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button type="submit" className="w-full">
          {initialData ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};