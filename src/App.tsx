
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TabBar from "./components/TabBar";
import { ThemeProvider } from "./components/ThemeProvider";

// Pages
import Home from "./pages/Home";
import Property from "./pages/Property";
import Payment from "./pages/Payment";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";
import AddProperty from "./pages/AddProperty";
import AddPayment from "./pages/AddPayment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="property-tracker-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property" element={<Property />} />
              <Route path="/property/add" element={<AddProperty />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment/add" element={<AddPayment />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <TabBar />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
