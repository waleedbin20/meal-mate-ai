import { useState } from "react";
import { Download, Upload, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductTable } from "@/components/products/ProductTable";

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
  const [products, setProducts] = useState<Product[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        // Validate the data structure
        const isValidData = jsonData.every((item: any) => 
          'MultiProductCode' in item &&
          'TwinProductCode' in item &&
          'MultiStandardPortion' in item &&
          'TwinStandardPortion' in item &&
          'MultiLargePortion' in item &&
          'TwinLargePortion' in item
        );

        if (!isValidData) {
          toast.error('Invalid file format. Please check the example template.');
          return;
        }

        // Transform the data to match our Product interface
        const transformedProducts: Product[] = jsonData.map((item: any) => ({
          id: crypto.randomUUID(),
          name: `${item.MultiProductCode} - ${item.TwinProductCode}`,
          largeCode: item.MultiProductCode,
          smallCode: item.TwinProductCode,
          categories: [
            {
              type: "large" as const,
              portionSizes: [
                {
                  size: "Multi Twin Large",
                  smallEquivalent: item.MultiLargePortion?.toString() || "0"
                },
                {
                  size: "Multi Twin Small",
                  smallEquivalent: item.TwinLargePortion?.toString() || "0"
                }
              ]
            },
            {
              type: "standard" as const,
              portionSizes: [
                {
                  size: "Multi Twin Large",
                  smallEquivalent: item.MultiStandardPortion?.toString() || "0"
                },
                {
                  size: "Multi Twin Small",
                  smallEquivalent: item.TwinStandardPortion?.toString() || "0"
                }
              ]
            }
          ]
        }));

        setProducts(transformedProducts);
        toast.success('Products imported successfully');
      } catch (error) {
        toast.error('Error processing file. Please check the format.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    // Transform the data back to the expected format
    const exportData = products.map(product => ({
      MultiProductCode: product.largeCode,
      TwinProductCode: product.smallCode,
      MultiStandardPortion: parseInt(product.categories[1].portionSizes[0].smallEquivalent) || 0,
      TwinStandardPortion: parseInt(product.categories[1].portionSizes[1].smallEquivalent) || 0,
      MultiLargePortion: parseInt(product.categories[0].portionSizes[0].smallEquivalent) || 0,
      TwinLargePortion: parseInt(product.categories[0].portionSizes[1].smallEquivalent) || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };

  const downloadDemoFile = () => {
    const demoData = [
      {
        MultiProductCode: "MULTI001",
        TwinProductCode: "TWIN001",
        MultiStandardPortion: 2,
        TwinStandardPortion: 1,
        MultiLargePortion: 4,
        TwinLargePortion: 2
      },
      {
        MultiProductCode: "MULTI002",
        TwinProductCode: "TWIN002",
        MultiStandardPortion: 3,
        TwinStandardPortion: 1,
        MultiLargePortion: 6,
        TwinLargePortion: 2
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(demoData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Demo");
    XLSX.writeFile(workbook, "product-template.xlsx");
    toast.success("Demo template downloaded successfully");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <SidebarTrigger />
          </div>
             
          <div className="container mx-auto max-w-6xl space-y-8">
            <div className="text-left">
              <h1 className="text-3xl font-bold text-purple-600 mb-2">Product Management</h1>
              <p className="text-gray-600">Import and export product data</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Import Products</CardTitle>
                  <CardDescription>Upload your product data in Excel format</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Your Excel file should contain these columns:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>MultiProductCode (text)</li>
                        <li>TwinProductCode (text)</li>
                        <li>MultiStandardPortion (number)</li>
                        <li>TwinStandardPortion (number)</li>
                        <li>MultiLargePortion (number)</li>
                        <li>TwinLargePortion (number)</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => document.getElementById('fileInput')?.click()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Excel
                    </Button>
                    <Button
                      onClick={downloadDemoFile}
                      variant="outline"
                      className="border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Export Products</CardTitle>
                  <CardDescription>Download your product data as Excel file</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleExport}
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={products.length === 0}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export to Excel
                  </Button>
                </CardContent>
              </Card>
            </div>

            {products.length > 0 && (
              <ProductTable products={products} />
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProductsPage;
