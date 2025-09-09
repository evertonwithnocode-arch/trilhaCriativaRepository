import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  id: string;
  photo_url: string | null;
}

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // 🔹 controla o drawer no mobile
  const defaultImage =
    'https://api.builder.io/api/v1/image/assets/TEMP/639cc8e2c4a257cd8eba5d5aa28e53fa9fe56f0d?width=320';

  // Verifica se a rota atual é "/account"
  const isAccountPage = location.pathname === '/account';
   const isAccountPageinPacientes =
  location.pathname === '/pacientes' ||
  location.pathname === '/pacientes/cadastro' ||
  location.pathname.startsWith('/pacientes/detalhes/');
   const isHomePage = location.pathname === '/dashboard';
   const isGamePage = location.pathname === '/jogos' || location.pathname.startsWith('/jogos/detalhes/');;

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

  return (
    <div className='min-h-[100%] bg-white relative'>
      {/* 🔹 Sidebar para telas grandes */}
      <div className="hidden md:flex  min-w-[112px] bg-white flex-col items-center py-10 ">
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
           onClick={() => navigate('/dashboard')}
            className={`w-16 h-16 rounded-[28px] flex items-center justify-center p-4 shadow-sm transition-colors
              ${
                isHomePage
                  ? 'bg-[#FFFCF2] border-2 border-yellow-200'
                  : 'bg-white border-2 border-transparent'
              }`}>
            <img src="/iconHome.png" alt="Home" className="w-8 h-8" />
          </button>
          <button 
           onClick={() => navigate('/pacientes')}
            className={`w-16 h-16 rounded-[28px] flex items-center justify-center p-4 shadow-sm transition-colors
              ${
                isAccountPageinPacientes
                  ? 'bg-[#FFFCF2] border-2 border-yellow-200'
                  : 'bg-white border-2 border-transparent'
              }`}>
            <img src="/iconUserGroup.png" alt="Usuários" className="w-8 h-8" />
          </button>
          <button
          onClick={() => navigate('/jogos')} 
          className={`w-16 h-16 rounded-[28px] flex items-center justify-center p-4 shadow-sm transition-colors
              ${
                isGamePage
                  ? 'bg-[#FFFCF2] border-2 border-yellow-200'
                  : 'bg-white border-2 border-transparent'
              }`}
          >
            <img src="/iconPlaylist.png" alt="Playlist" className="w-8 h-8" />
          </button>
          <button
            onClick={() => navigate('/account')}
            className={`w-16 h-16 rounded-[28px] flex items-center justify-center p-4 shadow-sm transition-colors
              ${
                isAccountPage
                  ? 'bg-[#FFFCF2] border-2 border-yellow-200'
                  : 'bg-white border-2 border-transparent'
              }`}
          >
            <img src="/iconConfig.png" alt="Configurações" className="w-8 h-8" />
          </button>
        </div>

        {/* Rodapé */}
        <div className="pb-40 flex flex-col gap-4 pt-20">
          <button className="w-16 h-16 border-2 border-yellow-200 rounded-[28px] bg-white flex items-center justify-center p-4 shadow-sm">
            <img src="/iconBell.png" alt="Notificações" className="w-8 h-8" />
          </button>
          <div className="mb-12">
            {loading ? (
              <div className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse" />
            ) : userProfile?.photo_url ? (
              <img
                src={userProfile.photo_url}
                alt="Foto do usuário"
                className="w-16 h-16 rounded-[26px] object-cover"
              />
            ) : (
              <img
                src={defaultImage}
                alt="Foto padrão"
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Mobile: botão de menu hamburguer */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white rounded-full shadow-md"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 Drawer Mobile */}
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
            <button onClick={() => setIsOpen(false)} className="text-left">
              Home
            </button>
            <button onClick={() => setIsOpen(false)} className="text-left">
              Usuários
            </button>
            <button onClick={() => setIsOpen(false)} className="text-left">
              Playlist
            </button>
            <button
              onClick={() => {
                navigate('/account');
                setIsOpen(false);
              }}
              className={`text-left ${
                isAccountPage ? 'font-bold text-yellow-600' : ''
              }`}
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
              <img
                src={defaultImage}
                alt="Foto padrão"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-gray-700">Perfil</span>
          </div>
        </div>
      )}
    </div>
  );
}
