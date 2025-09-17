import React, { useState, useEffect } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import TeamPage from './TeamPage';
import SubscriptionPage from './SubscriptionPage';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  plano: string | null;
  id_lider_equipe: string | null;
}

interface UserData {
  dataFimTeste: string | null;
  plano: string | null;
}

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState('pessoal');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [trialExpired, setTrialExpired] = useState(false);
  const [hasPlan, setHasPlan] = useState(false); // <-- NOVO

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
          .select("dataFimTeste, plano, id, id_lider_equipe")
          .eq("id", user.id)
          .single() as { data: UserData & UserProfile | null; error: any };

        if (error) throw error;

        if (data) {
          setUserProfile(data);

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

          // Se não tem plano e o trial expirou → força aba "assinatura"
          if (!data.plano && data.dataFimTeste) {
            const now = new Date();
            const trialEnd = new Date(data.dataFimTeste);
            if (trialEnd < now) {
              setActiveTab('assinatura');
            }
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

  // Função para lidar com a mudança de aba
  const handleTabChange = (tabId: string) => {
    if (trialExpired && !hasPlan && tabId !== 'assinatura') {
      toast.error("Seu tempo de teste expirou! Por favor, acesse a aba de assinatura para renovar.", {
        description: "Você será redirecionado para a aba de assinatura.",
        duration: 5000,
      });
      setActiveTab('assinatura');
    } else {
      setActiveTab(tabId);
    }
  };

  const tabs: Tab[] = [
    { id: 'pessoal', label: 'Pessoal' },
    // Exibe aba 'Equipe' somente se plano for 'time'
    ...(userProfile?.plano === 'time' ? [{ id: 'equipe', label: 'Equipe' }] : []),
    { id: 'assinatura', label: 'Assinatura' },
  ];

  return (
    <div>
      {/* Navigation Tabs */}
      <div
        className={`flex gap-4 max-md:gap-2 max-md:left-8 max-md:top-[180px] max-sm:overflow-x-auto max-sm:flex-nowrap max-sm:gap-1 max-sm:left-6 max-sm:top-[130px] ${className}`}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            className={`flex w-[248px] h-16 justify-center items-center gap-2 shadow-[0_3px_0_0_#FEF2CC] rounded-[20px_20px_0_0] border-2 border-solid border-[#FEF2CC] max-md:w-[calc(50%_-_4px)] max-md:h-12 max-md:px-6 max-md:py-4 max-sm:min-w-[120px] max-sm:h-10 max-sm:px-4 max-sm:py-3 transition-colors hover:bg-[#FEF9E5] ${
              activeTab === tab.id ? 'bg-[#FEF2CC]' : 'bg-[#FFFCF2]'
            } ${
              trialExpired && !hasPlan && tab.id !== 'assinatura'
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleTabChange(tab.id)}
            disabled={trialExpired && !hasPlan && tab.id !== 'assinatura'}
          >
            <span className="text-[#2C2623] text-base font-bold leading-5 tracking-[0.16px] overflow-hidden text-ellipsis whitespace-nowrap max-sm:text-sm">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Conditional Rendering */}
      <div>
        {activeTab === 'pessoal' && (!trialExpired || hasPlan) && <PersonalInfoForm />}
        {activeTab === 'equipe' && (!trialExpired || hasPlan) && userProfile?.plano === 'time' && <TeamPage />}
        {activeTab === 'assinatura' && !userProfile?.id_lider_equipe && <SubscriptionPage />}
      </div>
    </div>
  );
};
