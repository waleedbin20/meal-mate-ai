import { AppSidebar } from "@/components/AppSidebar";
import { PricingTable } from "@/components/pricing/PricingTable";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AuthGuard from "@/components/auth/AuthGuard";

const PricingPage = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#F6F6F7] to-[#F2FCE2]">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="container mx-auto max-w-6xl">
            <div className="text-left mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">Pricing Management</h1>
              <p className="text-sm md:text-base text-gray-600">Manage meal category prices and customer base percentages</p>
            </div>
            <AuthGuard>
              <PricingTable />
            </AuthGuard>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PricingPage;