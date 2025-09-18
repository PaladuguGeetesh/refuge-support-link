import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Login from "./pages/Login";
import RefugeeDashboard from "./pages/refugee/RefugeeDashboard";
import HealthcareDashboard from "./pages/healthcare/HealthcareDashboard";
import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  const getDashboard = () => {
    switch (user.role) {
      case 'refugee':
        return <RefugeeDashboard />;
      case 'healthcare_provider':
        return <HealthcareDashboard />;
      case 'aid_coordinator':
        return <CoordinatorDashboard />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={getDashboard()} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
