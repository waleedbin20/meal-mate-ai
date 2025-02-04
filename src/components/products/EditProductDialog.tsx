import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import type { Product } from "@/pages/ProductsPage";

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (product: Product) => void;
}

export const EditProductDialog = ({
  product,
  open,
  onOpenChange,
  onUpdate,
}: EditProductDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          initialData={product}
          onSubmit={(data) => {
            onUpdate({
              ...data,
              id: product.id,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};