import React, { useState, useMemo, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSideBar';
import { SearchInput } from '@/components/SearchInput';
import { FilterDropdown } from '@/components/FilterDropdown';
import { PatientCard } from '@/components/PatientCard';
import HelpButton from '@/components/HelpButton';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'sonner';
import { TablesInsert } from "@/integrations/supabase/types";
import { zodResolver } from '@hookform/resolvers/zod';

interface Patient {
  id: string;
  name: string;
  age: number;
  image: string;
  lastSession: string;
}


const pacienteSchema = z.object({
  nome: z.string({
    required_error: "Nome é obrigatório",
  }).min(3, "Nome deve ter no mínimo 3 caracteres"),

  data_nascimento: z.string({
    required_error: "Data de nascimento é obrigatória",
  }).min(1, "Data de nascimento é obrigatória"),

  genero: z.string().optional(),
  photo_url: z.string().url().nullable().optional(),
  nome_responsavel: z.string().optional(),
  email_responsavel: z.string().email("E-mail inválido").optional(),
  diagnostico: z.string().optional(),
});

type PacienteForm = z.infer<typeof pacienteSchema>;

export const PatientDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('Todas as idades');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

  // estado do Drawer
  const [openDrawer, setOpenDrawer] = useState(false);

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
            lastSession: 'Última sessão há 5 dias.'
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
    let filtered = patients;
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

  const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          setValue
      } = useForm<PacienteForm>({
          resolver: zodResolver(pacienteSchema),
          defaultValues: {
              nome: "",
              data_nascimento: "",
              genero: "",
              photo_url: "",
              nome_responsavel: "",
              email_responsavel: "",
              diagnostico: "",
          },
      });
  
      // Função para inserir paciente
      const handlePacienteImageChange = async (
          event: React.ChangeEvent<HTMLInputElement>,
      ) => {
          if (!event.target.files?.[0] || !user?.id) return;
  
          const file = event.target.files[0];
          const fileExt = file.name.split(".").pop();
          const fileName = `${user.id}-${Date.now()}.${fileExt}`;
          const filePath = `private/${fileName}`; // pasta separada para pacientes
  
          try {
              // 1. Upload no storage
              const { error: uploadError } = await supabase.storage
                  .from("TC-media")
                  .upload(filePath, file);
  
              if (uploadError) throw uploadError;
  
              // 2. Gerar URL pública
              const { data: urlData } = supabase.storage
                  .from("TC-media")
                  .getPublicUrl(filePath);
  
              const newPhotoUrl = urlData.publicUrl;
  
              // 3. Atualizar o form (react-hook-form)
              setValue("photo_url", newPhotoUrl);
              // 4. Atualizar preview da imagem
              setPreviewImage(newPhotoUrl);
  
              toast.success("Foto adicionada com sucesso!", {
                  style: {
                      background: "#FFF2CC",
                      color: "#2D2D2D",
                      border: "2px solid #FBBF24",
                      borderRadius: "12px",
                      padding: "12px",
                      fontWeight: "500",
                  }
              });
          } catch (err: any) {
              toast.error("Erro ao enviar foto: " + (err.message || "Tente novamente"), {
                  style: {
                      background: "#FFF2CC",
                      color: "#2D2D2D",
                      border: "2px solid #EF4444",
                      borderRadius: "12px",
                      padding: "12px",
                      fontWeight: "500",
                  }
              });
          }
      };
  
      const onSubmit = async (data: PacienteForm) => {
          if (!user?.id) {
              toast.error("Usuário não autenticado.", {
                  style: {
                      background: "#FFF2CC",
                      color: "#2D2D2D",
                      border: "2px solid #EF4444",
                      borderRadius: "12px",
                      padding: "12px",
                      fontWeight: "500",
                  }
              });
              return;
          }
  
          try {
              const paciente: TablesInsert<"pacientes"> = {
                  nome: data.nome,
                  data_nascimento: data.data_nascimento,
                  genero: data.genero || null,
                  photo_url: data.photo_url || null,
                  nome_responsavel: data.nome_responsavel || null,
                  email_responsavel: data.email_responsavel || null,
                  diagnostico: data.diagnostico || null,
                  profissional_associado: user.id, // 🔑 vindo direto do userAuth
              };
  
              const { error } = await supabase.from("pacientes").insert(paciente);
  
              if (error) {
                  console.error("Erro ao inserir paciente:", error.message);
                  toast.error("Erro ao cadastrar paciente", {
                      style: {
                          background: "#FFF2CC",
                          color: "#2D2D2D",
                          border: "2px solid #EF4444",
                          borderRadius: "12px",
                          padding: "12px",
                          fontWeight: "500",
                      }
                  });
              } else {
                  toast.success("Paciente cadastrado com sucesso!", {
                      style: {
                          background: "#FFF2CC",
                          color: "#2D2D2D",
                          border: "2px solid #FBBF24",
                          borderRadius: "12px",
                          padding: "12px",
                          fontWeight: "500",
                      }
                  });
                  setOpenDrawer(false);
              }
          } catch (err) {
              console.error(err);
              toast.error("Erro inesperado", {
                  style: {
                      background: "#FFF2CC",
                      color: "#2D2D2D",
                      border: "2px solid #EF4444",
                      borderRadius: "12px",
                      padding: "12px",
                      fontWeight: "500",
                  }
              });
          }
      };

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
            onClick={() => setOpenDrawer(true)}
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
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
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

      {/* Drawer/Dialog centralizado */}
      <Dialog open={openDrawer} onOpenChange={setOpenDrawer}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Cadastrar novo paciente</DialogTitle>
            <DialogDescription>
              Preencha os dados do paciente para adicioná-lo à sua lista.
            </DialogDescription>
          </DialogHeader>
          {/* Aqui você pode colocar seu formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto bg-[#FFF2CC] rounded-md p-10 space-y-8">
                    {/* Informações básicas */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                            Informações básicas
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Nome completo
                                </label>
                                <input
                                    type="text"
                                    {...register("nome")}
                                    className="rounded-xl px-3 py-2 text-sm"
                                />
                                {errors.nome && (
                                    <span className="text-red-500 text-xs">
                                        {errors.nome.message}
                                    </span>
                                )}

                                <label className="text-sm font-medium text-gray-700">
                                    Data de nascimento
                                </label>
                                <input
                                    type="date"
                                    {...register("data_nascimento")}
                                    className="rounded-xl px-3 py-2 text-sm"
                                />
                                {errors.data_nascimento && (
                                    <span className="text-red-500 text-xs">
                                        {errors.data_nascimento.message}
                                    </span>
                                )}

                                <label className="text-sm font-medium text-gray-700">
                                    Gênero
                                </label>
                                <input
                                    type="text"
                                    {...register("genero")}
                                    className="rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            {/* Foto */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-[160px] h-[160px] bg-white rounded-[65px] flex items-center justify-center overflow-hidden">
                                    {previewImage ? (
                                        <img 
                                            src={previewImage} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img src="/camera-01.png" alt="Câmera" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handlePacienteImageChange(e)}
                                    className="hidden"
                                    id="photo-upload"
                                />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('photo-upload')?.click()}
                                    className="mt-4 bg-[#FCE699] text-gray-800 text-normal font-bold px-4 py-2 rounded-md"
                                >
                                    Adicionar foto
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Responsável */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                            Responsável
                        </h2>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Nome do responsável
                                </label>
                                <input
                                    type="text"
                                    {...register("nome_responsavel")}
                                    className="w-full rounded-xl px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    E-mail do responsável
                                </label>
                                <input
                                    type="email"
                                    {...register("email_responsavel")}
                                    className="w-full rounded-xl px-3 py-2 text-sm"
                                />
                                {errors.email_responsavel && (
                                    <span className="text-red-500 text-xs">
                                        {errors.email_responsavel.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Diagnóstico */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#2D2D2D] mb-4">
                            Diagnóstico
                        </h2>
                        <textarea
                            {...register("diagnostico")}
                            placeholder="Diagnóstico"
                            className="w-full h-28 rounded-xl px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Botão */}
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#FBBF24] hover:bg-[#f59e0b] transition-colors text-white font-medium px-6 py-2 rounded-md"
                        >
                            {isSubmitting ? "Salvando..." : "Concluir cadastro"}
                        </button>
                    </div>
                </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
