import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuotePage from "./pages/QuotePage";
import Landing from "./pages/Landing";
import SavedQuotesPage from "./pages/SavedQuotePage";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatPage from "./pages/ChatPage";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import PricingPage from "./pages/PricingPage";
import { SidebarProvider } from "@/components/ui/sidebar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/quote/:id" element={<QuotePage />} />
              <Route path="/saved-quotes" element={<SavedQuotesPage />} />
              <Route path="/quote/:id/chat" element={<ChatPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Routes>
          </Router>
        </div>
      </SidebarProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;