import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  photo_url: string | null;
}

interface UserData {
  dataFimTeste: string | null;
  plano: string | null;
}

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [trialExpired, setTrialExpired] = useState(false);
  const [hasPlan, setHasPlan] = useState(false); // <-- NOVO

  const defaultImage =
    'https://api.builder.io/api/v1/image/assets/TEMP/639cc8e2c4a257cd8eba5d5aa28e53fa9fe56f0d?width=320';

  // Verifica se a rota atual é "/account"
  const isAccountPage = location.pathname === '/account';
  const isAccountPageinPacientes =
    location.pathname === '/pacientes' ||
    location.pathname === '/pacientes/cadastro' ||
    location.pathname.startsWith('/pacientes/detalhes/');
  const isHomePage = location.pathname === '/dashboard';
  const isGamePage =
    location.pathname === '/jogos' ||
    location.pathname.startsWith('/jogos/detalhes/');

  // Verifica trial + plano do usuário
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
            setHasPlan(true);
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

  // Busca a photo_url do usuário
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('usuarios')
          .select('id, photo_url')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      } catch (err: any) {
        console.error('Erro ao buscar perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Função auxiliar para navegação com verificação de trial + plano
  const handleNavigation = (path: string) => {
    if (trialExpired && !hasPlan && path !== '/account') {
      toast.error("Seu tempo de teste expirou! Por favor, acesse a página da conta para renovar.", {
        description: "Você será redirecionado para a página de conta.",
        duration: 5000,
      });
      navigate('/account');
    } else {
      navigate(path);
      setIsOpen(false); // Fecha o menu mobile após navegação
    }
  };
  return (
    <div className='min-h-[100%] bg-white relative'>
      {/* Sidebar para telas grandes */}
      <div className="hidden md:flex min-w-[112px] bg-white flex-col items-center py-10">
        {/* Logo */}
        <div className="mb-12">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/242e635dad53c0fae10e7a32d26916c38b5bb6cf?width=160"
            alt="Logo"
            className="w-20 h-[52px] object-contain"
          />
        </div>

        {/* Menu principal */}
        <div className="flex flex-col items-center gap-3 flex-1">
          <button
            onClick={() => handleNavigation('/dashboard')}
            className={`w-16 h-16 rounded-[28px] flex items-center justify-center p-4 shadow-sm transition-colors
              ${isHomePage ? 'bg-[#FFFCF2] border-2 border-yellow-200' : 'bg-white border-2 border-transparent'}`}
          >
            <img src="/iconHome.png" alt="Home" className="w-8 h-8" />
          </button>
          <button
            onClick={() => handleNavigation('/pacientes')}
            className={`w-16 h-16 rounded-[28px] flex items-center justify-center p-4 shadow-sm transition-colors
              ${isAccountPageinPacientes ? 'bg-[#FFFCF2] border-2 border-yellow-200' : 'bg-white border-2 border-transparent'}`}
          >
            <img src="/iconUserGroup.png" alt="Usuários" className="w-8 h-8" />
          </button>
          <button
            onClick={() => handleNavigation('/jogos')}
            className={`w-16 h-16 rounded-[28px] flex items-center justify-center p-4 shadow-sm transition-colors
              ${isGamePage ? 'bg-[#FFFCF2] border-2 border-yellow-200' : 'bg-white border-2 border-transparent'}`}
          >
            <img src="/iconPlaylist.png" alt="Playlist" className="w-8 h-8" />
          </button>
          <button
            onClick={() => handleNavigation('/account')}
            className={`w-16 h-16 rounded-[28px] flex items-center justify-center p-4 shadow-sm transition-colors
              ${isAccountPage ? 'bg-[#FFFCF2] border-2 border-yellow-200' : 'bg-white border-2 border-transparent'}`}
          >
            <img src="/iconConfig.png" alt="Configurações" className="w-8 h-8" />
          </button>
        </div>

        {/* Rodapé */}
        <div className="pb-40 flex flex-col gap-4 pt-20">
          <button className="w-16 h-16 border-2 border-yellow-200 rounded-[28px] bg-white flex items-center justify-center p-4 shadow-sm">
            <img src="/iconBell.png" alt="Notificações" className="w-8 h-8" />
          </button>
          <div className="mb-12 flex items-center justify-center">
            {loading ? (
              <div className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse" />
            ) : userProfile?.photo_url ? (
              <img
                src={userProfile.photo_url}
                alt="Foto do usuário"
                className="w-16 h-16 rounded-[26px] object-cover"
              />
            ) : (
              <div className="w-16 h-16 border-2 border-yellow-200 rounded-[28px] bg-white flex items-center justify-center p-4 shadow-sm">
                <User size={40} className="text-yellow-300" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: botão de menu hamburguer */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white rounded-full shadow-md"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Drawer Mobile */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 flex flex-col p-6">
          <div className="mb-10">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/242e635dad53c0fae10e7a32d26916c38b5bb6cf?width=160"
              alt="Logo"
              className="w-28 object-contain"
            />
          </div>

          <nav className="flex flex-col gap-4 flex-1">
            <button onClick={() => handleNavigation('/dashboard')} className={`text-left ${isHomePage ? 'font-bold text-yellow-600' : ''}`}>
              Home
            </button>
            <button onClick={() => handleNavigation('/pacientes')} className={`text-left ${isAccountPageinPacientes ? 'font-bold text-yellow-600' : ''}`}>
              Usuários
            </button>
            <button onClick={() => handleNavigation('/jogos')} className={`text-left ${isGamePage ? 'font-bold text-yellow-600' : ''}`}>
              Playlist
            </button>
            <button
              onClick={() => handleNavigation('/account')}
              className={`text-left ${isAccountPage ? 'font-bold text-yellow-600' : ''}`}
            >
              Configurações
            </button>
          </nav>

          <div className="mt-auto flex items-center gap-3">
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            ) : userProfile?.photo_url ? (
              <img
                src={userProfile.photo_url}
                alt="Foto do usuário"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                <User size={20} className="text-gray-600" />
              </div>
            )}
            <span className="text-sm text-gray-700">Perfil</span>
          </div>
        </div>
      )}
    </div>
  );
}