import { useEffect, useState } from "react";
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
import PacienteDetalhes from "@/pages/PacienteDetalhes";
import CadastroPacientes from "./pages/CadastroPacientes";
import PricingPage from "./pages/pricingPage";
import GaleriaDeJogos from "./pages/GaleriaDeJogos";
import DetalhesJogos from "./pages/DetalhesJogos";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

interface UserData {
  dataFimTeste: string | null;
  plano: string | null;
}

// ProtectedRoute com verificação de trial expirado e plano
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
   const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [trialExpired, setTrialExpired] = useState(false);
  const [hasPlan, setHasPlan] = useState(false); // <-- NOVO

  useEffect(() => {
    const checkTrialAndPlan = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("usuarios")
          .select("dataFimTeste, plano")
          .eq("id", user.id)
          .single() as { data: UserData | null; error: any };

        if (error) throw error;

        if (data) {
          if (data.plano !== null) {
            setHasPlan(true); // tem plano ativo
            setTrialExpired(false);
          } else if (data.dataFimTeste) {
            const now = new Date();
            const trialEnd = new Date(data.dataFimTeste);
            setTrialExpired(trialEnd < now);
            setHasPlan(false);
          } else {
            setTrialExpired(false);
            setHasPlan(false);
          }
        } else {
          setTrialExpired(false);
          setHasPlan(false);
        }
      } catch (err: any) {
        console.error("Erro ao verificar trial ou plano:", err.message);
        setTrialExpired(false);
        setHasPlan(false);
      } finally {
        setLoading(false);
      }
    };

    checkTrialAndPlan();
  }, [user]);

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user) return <Navigate to="/" replace />;

  // Só bloqueia se o trial expirou e NÃO tiver plano
  if (trialExpired && !hasPlan && location.pathname !== "/account") {
    return <Navigate to="/account" replace />;
  }

  return <>{children}</>;
};

// PublicRoute (não logados)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

// Rotas da aplicação
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
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// App principal
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