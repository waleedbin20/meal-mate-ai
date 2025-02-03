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
import type { Product } from "@/pages/ProductsPage";

interface ProductCardProps {
  product: Product;
  onUpdate: (product: Product) => void;
}

export const ProductCard = ({ product, onUpdate }: ProductCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Large Code: {product.largeCode}
          </p>
          <p className="text-sm text-muted-foreground">
            Small Code: {product.smallCode}
          </p>
        </div>

        {product.categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-semibold capitalize">{category.type}</h3>
            <div className="grid grid-cols-2 gap-2">
              {category.portionSizes.map((size, sizeIndex) => (
                <div
                  key={sizeIndex}
                  className="text-sm p-2 bg-muted rounded-md"
                >
                  <p>Size: {size.size}</p>
                  <p className="text-muted-foreground">
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