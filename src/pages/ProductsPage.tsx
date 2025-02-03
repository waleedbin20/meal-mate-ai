import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/ProductCard";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { AppSidebar } from "@/components/AppSidebar";
import { toast } from "sonner";

export interface ProductSize {
  size: string;
  smallEquivalent: string;
}

export interface ProductCategory {
  type: "large" | "standard";
  portionSizes: ProductSize[];
}

export interface Product {
  id: string;
  name: string;
  largeCode: string;
  smallCode: string;
  categories: ProductCategory[];
}

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
    toast.success("Product added successfully");
    setIsAddDialogOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast.success("Product updated successfully");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <AppSidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-4 space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold text-purple-600">Products</h1>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          <div className="w-full max-w-md">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onUpdate={handleUpdateProduct}
              />
            ))}
          </div>

          <AddProductDialog
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            onAdd={handleAddProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;