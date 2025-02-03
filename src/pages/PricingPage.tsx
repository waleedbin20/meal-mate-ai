import { AppSidebar } from "@/components/AppSidebar";
import { PricingTable } from "@/components/pricing/PricingTable";
import { SidebarProvider } from "@/components/ui/sidebar";

const PricingPage = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-left mb-8">
              <h1 className="text-3xl font-bold text-purple-600 mb-2">Pricing Management</h1>
              <p className="text-gray-600">Manage meal category prices and customer base percentages</p>
            </div>
            <PricingTable />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PricingPage;