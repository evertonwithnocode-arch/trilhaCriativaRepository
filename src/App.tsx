import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";
import { AccountPage } from "./pages/AccountPage";
import { PatientDashboard } from "./pages/Pacientes";
import PacienteDetalhes from "@/pages/PacienteDetalhes"
import CadastroPacientes from "./pages/CadastroPacientes";
import PricingPage from "./pages/pricingPage";
import GaleriaDeJogos from "./pages/GaleriaDeJogos";
import DetalhesJogos from "./pages/DetalhesJogos";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><Index /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
    <Route path="/verify-email" element={<PublicRoute><VerifyEmail /></PublicRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
    <Route path="/pacientes" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
    <Route path="/pacientes/detalhes/:id" element={<ProtectedRoute><PacienteDetalhes /></ProtectedRoute>} />
    <Route path="/pacientes/cadastro" element={<ProtectedRoute><CadastroPacientes /></ProtectedRoute>} />
    <Route path="/planos" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
    <Route path="/jogos" element={<ProtectedRoute><GaleriaDeJogos /></ProtectedRoute>} />
    <Route path="/jogos/detalhes" element={<ProtectedRoute><DetalhesJogos /></ProtectedRoute>} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
