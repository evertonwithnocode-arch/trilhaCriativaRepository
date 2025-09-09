import React, { useState, useMemo, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSideBar';
import { SearchInput } from '@/components/SearchInput';
import { FilterDropdown } from '@/components/FilterDropdown';
import { PatientCard } from '@/components/PatientCard';
import HelpButton from '@/components/HelpButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
interface Patient {
  id: string;
  name: string;
  age: number;
  image: string;
  lastSession: string;
}

export const PatientDashboard: React.FC = () => {
 const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('Todas as idades');
  const [patients, setPatients] = useState<Patient[]>([]); // <-- pacientes do Supabase
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('pacientes')
          .select(`
            id,
            nome,
            data_nascimento,
            photo_url
          `)
          .eq('profissional_associado', user.id);

        if (error) throw error;

        // transformar data do Supabase para o formato do seu PatientCard
        const formattedPatients: Patient[] = (data || []).map(p => {
          const birthDate = new Date(p.data_nascimento);
          const ageDifMs = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDifMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);

          return {
            id: p.id,
            name: p.nome,
            age,
            image: p.photo_url || 'https://via.placeholder.com/160',
            lastSession: 'Última sessão há 5 dias.' // você pode ajustar se tiver o campo
          };
        });

        setPatients(formattedPatients);

      } catch (err: any) {
        console.error('Erro ao buscar pacientes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, [user]);

  const filteredPatients = useMemo(() => {
    let filtered = patients; // <-- usar o estado real, não mock
    if (searchQuery) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (ageFilter !== 'Todas as idades') {
      switch (ageFilter) {
        case '0-5 anos':
          filtered = filtered.filter(p => p.age <= 5);
          break;
        case '6-10 anos':
          filtered = filtered.filter(p => p.age >= 6 && p.age <= 10);
          break;
        case '11-15 anos':
          filtered = filtered.filter(p => p.age >= 11 && p.age <= 15);
          break;
        case '16+ anos':
          filtered = filtered.filter(p => p.age >= 16);
          break;
      }
    }
    return filtered;
  }, [patients, searchQuery, ageFilter]);


  return (
    <div className="w-full flex min-h-screen  bg-[#ffffff]">
      <AppSidebar />
      <HelpButton />
      <div className='bg-[#FFFCF2] w-full'>
        <header className="flex sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 md:pl-[60px] mt-[80px] pl-[40px] md:pl-[20px] md:mt-[50px] md:mr-[100px]">
          <div>
            <h1 className="text-[#2C2623] text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              Pacientes
            </h1>
            <p className="text-[#2C2623] text-base sm:text-lg mt-2">
              Gerencie os pacientes e acompanhe o progresso.
            </p>
          </div>
          <button
            onClick={() => navigate('/pacientes/cadastro')}
            className="bg-[#FCE699] h-[50px] md:h-[40px] px-5 rounded-xl text-sm font-extrabold text-[#2C2623] hover:bg-[#F7B34D]  transition"
          >
            Cadastrar paciente
          </button>

        </header>
        <div className="flex flex-col mb-10 sm:flex-row gap-4 items-start sm:items-center justify-between pl-[40px] md:mr-[100px] pl-[60px]">
          <SearchInput onSearch={setSearchQuery} />
          <FilterDropdown onFilterChange={setAgeFilter} className=" sm:block" />
        </div>
        <main className="w-[100%]  bg-[#FEF2CC] h-full">

          <section className=' flex justify-center '>
            <div className="
  grid 
  gap-10 
  mt-[60px]
  grid-cols-1            /* padrão: mobile = 1 coluna */
  md:grid-cols-2         /* >=768px = 2 colunas */
  lg:grid-cols-3         /* >=1024px = 3 colunas */
">
              {filteredPatients.map(patient => (
                <PatientCard key={patient.id} patient={patient} onViewPatient={id => console.log(id)} />
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#2C2623] text-lg font-medium">
                  Nenhum paciente encontrado.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>





    </div>
  );
};
