import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PatientHeader } from '@/components/PatientHeader';
import { PatientProfile } from '@/components/PatientProfile';
import { PatientStats } from '@/components/PatientStats';
import PerformanceChart from '@/components/PerformanceChart';
import { SessionHistory } from '@/components/SessionHistory';
import NotesSection from '@/components/NotesSection';
import { AppSidebar } from '@/components/AppSideBar';
import HelpButton from '@/components/HelpButton';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Patient {
  id: string;
  name: string;
  age: number;
  image: string;
  lastSession: string;
  diagnostico: string;
}

const PacienteDetalhes = () => {
  const { id } = useParams<{ id: string }>(); // ← pega o ID da URL
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!user || !id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('pacientes')
          .select(`id, nome, data_nascimento, photo_url, diagnostico`)
          .eq('id', id)
          .single(); // pega apenas 1 paciente

        if (error) throw error;

        if (data) {
          const birthDate = new Date(data.data_nascimento);
          const ageDifMs = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDifMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);

          setPatient({
            id: data.id,
            name: data.nome,
            age,
            image: data.photo_url || 'https://via.placeholder.com/160',
            lastSession: 'Última sessão há 5 dias.',
            diagnostico: data.diagnostico // ajustar conforme seu campo
          });
        }
      } catch (err: any) {
        console.error('Erro ao buscar paciente:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [user, id]);

  if (loading) return <div>Carregando...</div>;
  if (!patient) return <div>Paciente não encontrado</div>;

  const handleBackClick = () => console.log('Navegando de volta para lista de pacientes');
  const handlePatientEdit = () => console.log('Editando paciente');
  const handleDownloadReport = () => console.log('Baixando relatório');
  const handleStartSession = () => console.log('Iniciando nova sessão');
  const handleAddNote = (content: string) => console.log('Adicionando nota:', content);
  const handleSidebarItemClick = (item: string) => console.log('Item do menu clicado:', item);
  const handleHelpClick = () => console.log('Abrindo ajuda');

  return (
    <main className="w-full bg-[#FFFCF2] flex min-h-screen flex">
      <AppSidebar />
      <HelpButton />
      <div className='w-full'>
        <PatientProfile
          name={patient.name}
          age={patient.age}
          avatarUrl={patient.image}
          onEdit={handlePatientEdit}
          onDownload={handleDownloadReport}
          onPlay={handleStartSession}
        />
        <PatientStats
          description={patient.diagnostico}
          sessionsCompleted={12}
          averageScore="77%"
          totalTime="4h32m"
        />
        <PerformanceChart />
        <SessionHistory />
        <NotesSection />
      </div>
    </main>
  );
};

export default PacienteDetalhes;
