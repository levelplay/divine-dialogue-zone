import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart-context";
import AppLayout from "@/components/AppLayout";
import DesktopNav from "@/components/DesktopNav";
import Index from "./pages/Index";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import FeedPage from "./pages/FeedPage";
import HymnsPage from "./pages/HymnsPage";
import EventsPage from "./pages/EventsPage";
import PrayerWallPage from "./pages/PrayerWallPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <BrowserRouter>
          <DesktopNav />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/hymns" element={<HymnsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/prayer-wall" element={<PrayerWallPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
