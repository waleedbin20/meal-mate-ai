import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuotePage from "./pages/QuotePage";
import Landing from "./pages/Landing";
import SavedQuotesPage from "./components/SavedQuotePage";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatPage from "./pages/chatPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/quote/:id" element={<QuotePage />} />
          <Route path="/saved-quotes" element={<SavedQuotesPage />} />
          <Route path="/quote/:id/chat" element={<ChatPage />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;