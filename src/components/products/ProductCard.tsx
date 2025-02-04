import { useState } from "react";
import { Edit2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditProductDialog } from "./EditProductDialog";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onUpdate: (product: Product) => void;
}

export const ProductCard = ({ product, onUpdate }: ProductCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-purple-100">
        <CardTitle className="text-xl font-bold text-purple-600">{product.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
          className="hover:bg-purple-50"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <p>Large Code: {product.largeCode}</p>
          <p>Small Code: {product.smallCode}</p>
        </div>

        {product.categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-semibold capitalize text-purple-600">{category.type} Portions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {category.portionSizes.map((size, sizeIndex) => (
                <div
                  key={sizeIndex}
                  className="p-2 bg-purple-50 rounded-md space-y-1"
                >
                  <p className="font-medium">Size: {size.size}</p>
                  <p className="text-sm text-muted-foreground">
                    Small Equivalent: {size.smallEquivalent}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>

      <EditProductDialog
        product={product}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={onUpdate}
      />
    </Card>
  );
};