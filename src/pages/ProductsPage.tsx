import { useState } from "react";
import { Download, Upload, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadProducts } from "@/services/productService";

// Interface for Excel row data
interface ExcelProductData {
  MultiProductCode: string;
  TwinProductCode: string;
  MultiStandardPortion: string | number;
  TwinStandardPortion: string | number;
  MultiLargePortion: string | number;
  TwinLargePortion: string | number;
}

const ProductsPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet) as ExcelProductData[];

        console.log('Excel data parsed:', JSON.stringify(jsonData, null, 2));

        // Validate the data structure
        const isValidData = jsonData.every((item: ExcelProductData) => 
          'MultiProductCode' in item &&
          'TwinProductCode' in item &&
          'MultiStandardPortion' in item &&
          'TwinStandardPortion' in item &&
          'MultiLargePortion' in item &&
          'TwinLargePortion' in item
        );

        if (!isValidData) {
          setIsUploading(false);
          toast({
            title: "Error",
            description: 'Invalid file format. Please check the example template.',
            variant: "destructive",
          });
          return;
        }

        // Transform Excel data to API payload format, ensuring correct types
        const productsPayload = jsonData.map((item: ExcelProductData) => ({
          multiProductCode: String(item.MultiProductCode),
          twinProductCode: String(item.TwinProductCode),
          multiStandardPortion: Number(item.MultiStandardPortion),
          twinStandardPortion: Number(item.TwinStandardPortion),
          multiLargePortion: Number(item.MultiLargePortion),
          twinLargePortion: Number(item.TwinLargePortion)
        }));

        console.log('Transformed payload:', JSON.stringify(productsPayload, null, 2));

        // Send the transformed data to upload the products
        const response = await uploadProducts(productsPayload);
        
        if (response.success && response.data === true) {
          toast({
            title: "Success",
            description: "Products have been successfully uploaded",
          });
        }
      } catch (error) {
        console.error('Error processing file:', error);
        toast({
          title: "Error",
          description: 'Error uploading products. Please try again.',
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsArrayBuffer(file);
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
    toast({
      title: "Success",
      description: "Demo template downloaded successfully"
    });
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
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
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      onClick={() => document.getElementById('fileInput')?.click()}
                      className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Import Excel
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={downloadDemoFile}
                      variant="outline"
                      className="w-full sm:w-auto border-purple-600 text-purple-600 hover:bg-purple-50"
                      disabled={isUploading}
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
                      disabled={isUploading}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProductsPage;