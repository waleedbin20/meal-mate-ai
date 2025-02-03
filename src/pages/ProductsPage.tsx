import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/ProductCard";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { AppSidebar } from "@/components/AppSidebar";
import { toast } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <SidebarTrigger />
          </div>
             
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto max-w-3xl p-4 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full mb-4"
                />

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-medium text-gray-700">Create new</h2>
                  </div>
                  <Button 
                    onClick={() => setIsAddDialogOpen(true)} 
                    className="w-full flex items-center justify-start text-left bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Product
                  </Button>
                </div>

                {searchQuery && (
                  <div className="mt-6">
                    <h2 className="text-sm font-medium text-gray-700 mb-3">Results</h2>
                    {filteredProducts.length > 0 ? (
                      <div className="space-y-2">
                        {filteredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onUpdate={handleUpdateProduct}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="mx-auto w-24 h-24 mb-4">
                          <img src="/placeholder.svg" alt="No results" className="w-full h-full" />
                        </div>
                        <p className="text-gray-500 mb-2">No products found</p>
                        <p className="text-sm text-gray-400">
                          "{searchQuery}" did not match any products.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <AddProductDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onAdd={handleAddProduct}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProductsPage;