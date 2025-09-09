import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface FormData {
  id: string;
  fullName: string;
  specialty: string;
  email: string;
  phone: string;
  professionalRegistry: string;
  photo_url: string | null;
}

const PersonalInfoForm: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setError('Usuário não logado');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('usuarios')
          .select('id, nome, especialidade, email, telefone, registro_profissional, photo_url')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setFormData({
          id: data.id,
          fullName: data.nome || 'não informado',
          specialty: data.especialidade || 'não informado',
          email: data.email || 'não informado',
          phone: data.telefone || 'não informado',
          professionalRegistry: data.registro_profissional || 'não informado',
          photo_url: data.photo_url || null,
        });
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Handle image upload
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0] || !user) return;

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `private/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('TC-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('TC-media').getPublicUrl(filePath);
      const newPhotoUrl = urlData.publicUrl;

      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ photo_url: newPhotoUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setFormData((prev) => (prev ? { ...prev, photo_url: newPhotoUrl } : prev));
    } catch (err: any) {
      alert('Erro ao atualizar a foto de perfil: ' + (err.message || 'Tente novamente'));
    }
  };

  // Handle form input changes
  const handleInputChange = (field: keyof Omit<FormData, 'id' | 'photo_url'>, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !user) return;

    try {
      const { error } = await supabase
        .from('usuarios')
        .update({
          nome: formData.fullName === 'não informado' ? null : formData.fullName,
          especialidade: formData.specialty === 'não informado' ? null : formData.specialty,
          email: formData.email === 'não informado' ? null : formData.email,
          telefone: formData.phone === 'não informado' ? null : formData.phone,
          registro_profissional: formData.professionalRegistry === 'não informado' ? null : formData.professionalRegistry,
        })
        .eq('id', user.id);

      if (error) throw error;

      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar alterações');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error || !formData) return <p className="text-red-500">{error || 'Dados não encontrados'}</p>;

  return (
    <section className={`${className} bg-[#FEF2CC] w-full h-[700px] pt-[70px] pr-[100px] pl-10 md:pl-40`}>
      <div className="flex flex-row items-center">
        {formData.photo_url ? (
          <img
            src={formData.photo_url}
            alt="Profile picture"
            className="w-40 h-40 object-cover rounded-[60px] max-md:w-[120px] max-md:h-[120px] max-sm:w-20 max-sm:h-20"
          />
        ) : (
          <div className="w-40 h-40 flex items-center justify-center bg-white rounded-[60px] max-md:w-[120px] max-md:h-[120px] max-sm:w-20 max-sm:h-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
              className="w-16 h-16 max-md:w-12 max-md:h-12 max-sm:w-8 max-sm:h-8"
            />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
              
            </div>
          )}
        <div className="flex flex-col justify-center w-full pl-[20px]">
          <h1 className="text-[#2C2623] text-[32px] font-bold leading-8 tracking-[-0.32px] max-md:text-[28px] max-md:leading-7 max-sm:text-xl max-sm:leading-6">
            {formData.fullName}
          </h1>
          <p className="text-[#2C2623] text-lg font-normal leading-6 pt-2 tracking-[0.18px] max-sm:text-sm">
            {formData.specialty}
          </p>
          <div className="flex flex-row gap-4 pt-4 justify-between">
            <label
              className="inline-flex h-10 justify-center items-center cursor-pointer bg-[#FCE699] py-2 rounded-xl w-[120px] hover:bg-[#FBE085] transition-colors focus:outline-none focus:ring-2 focus:ring-[#BB9205] focus:ring-offset-2"
              aria-label="Change profile photo"
            >
              <span className="text-[#2C2623] text-sm font-bold leading-5 tracking-[0.14px]">
                Alterar foto
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => console.log('Change password clicked')}
                className="inline-flex h-10 justify-center items-center cursor-pointer bg-[#FCE699] py-2 rounded-xl w-[120px] hover:bg-[#FBE085] transition-colors focus:outline-none focus:ring-2 focus:ring-[#BB9205] focus:ring-offset-2"
              >
                <span className="text-[#2C2623] text-sm font-bold leading-5 tracking-[0.14px]">
                  Alterar senha
                </span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex h-10 justify-center items-center cursor-pointer bg-[#FCE699] py-2 rounded-xl w-[120px] hover:bg-[#FBE085] transition-colors focus:outline-none focus:ring-2 focus:ring-[#BB9205] focus:ring-offset-2"
              >
                <span className="text-[#2C2623] text-sm font-bold leading-5 tracking-[0.14px]">
                  Editar perfil
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[20px]">
        <h2 className="text-[#2C2623] text-2xl font-bold leading-8 tracking-[0.24px]">
          Informações pessoais
        </h2>
        <form onSubmit={handleSubmit} className="mt-12">
          <div className="grid grid-cols-[1fr_1fr] gap-6 w-full max-md:grid-cols-[1fr] max-md:gap-4 max-sm:gap-3">
            {[
              { id: 'fullName', label: 'Nome completo', value: formData.fullName },
              { id: 'specialty', label: 'Especialidade', value: formData.specialty },
              { id: 'email', label: 'E-mail', value: formData.email, type: 'email' },
              { id: 'phone', label: 'Telefone', value: formData.phone, type: 'tel' },
              { id: 'professionalRegistry', label: 'Registro profissional', value: formData.professionalRegistry },
            ].map(({ id, label, value, type = 'text' }) => (
              <div key={id} className="flex flex-col items-start gap-2 w-[512px] max-md:w-full">
                <label htmlFor={id} className="text-[#BB9205] text-sm font-normal leading-5 tracking-[0.14px] h-5 max-sm:text-xs">
                  {label}
                </label>
                <div className="flex h-12 items-center gap-2 w-full bg-[#FEF9E5] p-4 rounded-2xl max-sm:h-10 max-sm:p-3">
                  {isEditing ? (
                    <input
                      id={id}
                      type={type}
                      value={value}
                      onChange={(e) => handleInputChange(id as keyof Omit<FormData, 'id' | 'photo_url'>, e.target.value)}
                      className="flex-1 text-[#2C2623] text-base font-normal leading-5 tracking-[0.16px] max-sm:text-sm bg-transparent border-none outline-none"
                      required
                    />
                  ) : (
                    <div className="flex-1 text-[#2C2623] text-base font-normal leading-5 tracking-[0.16px] max-sm:text-sm">
                      {value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="flex gap-4 mt-6 max-sm:flex-col">
              <button
                type="submit"
                className="inline-flex h-10 justify-center items-center gap-2 cursor-pointer bg-[#FCE699] px-5 py-2 rounded-xl hover:bg-[#FBE085] transition-colors focus:outline-none focus:ring-2 focus:ring-[#BB9205] focus:ring-offset-2"
              >
                <span className="text-[#2C2623] text-sm font-bold leading-5 tracking-[0.14px]">
                  Salvar alterações
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex h-10 justify-center items-center gap-2 cursor-pointer bg-[#FFFCF2] px-5 py-2 rounded-xl border border-[#FCE699] hover:bg-[#FEF9E5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#BB9205] focus:ring-offset-2"
              >
                <span className="text-[#2C2623] text-sm font-bold leading-5 tracking-[0.14px]">
                  Cancelar
                </span>
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default PersonalInfoForm;