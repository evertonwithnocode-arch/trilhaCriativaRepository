import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (formData.password !== formData.confirmPassword) {
    toast.error('As senhas não coincidem');
    return;
  }

  if (!formData.acceptTerms) {
    toast.error('Você deve aceitar os termos e condições');
    return;
  }

  setLoading(true);

  try {
    // 1. Cria usuário no Auth
    const { data: signUpData, error: signUpError } = await signUp(formData.email, formData.password);

    if (signUpError) {
      if (signUpError.message.includes('User already registered')) {
        toast.error('Este email já está cadastrado');
      } else {
        toast.error('Erro ao criar conta: ' + signUpError.message);
      }
      setLoading(false);
      return;
    }

    const user = signUpData.user;
    if (!user) throw new Error('Usuário não retornado pelo Supabase');

    // 2. Cria registro na tabela public.usuarios
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert([
        {
          id: user.id,
          nome: formData.name,
          email: formData.email,
          especialidade: '', // pode deixar vazio ou adicionar campo no formulário
          telefone: '',      // idem
          registro_profissional: '' // idem
        }
      ]);

    if (insertError) {
      toast.error('Erro ao criar registro no banco: ' + insertError.message);
      setLoading(false);
      return;
    }

    toast.success('Conta criada com sucesso! Verifique seu email para confirmar.');
    navigate('/verify-email', { state: { email: formData.email } });

  } catch (error) {
    console.error(error);
    toast.error('Erro inesperado ao criar conta');
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[512px] flex-col items-start gap-6 shadow-[0_3px_0_0_#FFE0B2] bg-white p-8 rounded-3xl border-2 border-solid border-[#FBDEB1] max-md:w-[calc(100%_-_40px)] max-md:max-w-[480px] max-md:p-6 max-sm:w-[calc(100%_-_32px)] max-sm:p-5 max-sm:rounded-2xl"
    >
      <div className="flex w-[448px] flex-col items-start gap-5 max-md:w-full">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <label
            htmlFor="name"
            className="h-5 self-stretch text-[#BB9205] text-sm font-medium leading-5 tracking-[0.14px] max-sm:text-xs"
          >
            Nome completo
          </label>
          <div className="flex h-12 items-center gap-2 self-stretch bg-[#FEF9E5] p-4 rounded-2xl max-sm:h-11 max-sm:p-3 max-sm:rounded-xl">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite seu nome completo"
              className="flex-[1_0_0] text-[#BB9205] text-base font-medium leading-5 tracking-[0.16px] bg-transparent border-none outline-none placeholder:opacity-60 max-sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 self-stretch">
          <label
            htmlFor="email"
            className="h-5 self-stretch text-[#BB9205] text-sm font-medium leading-5 tracking-[0.14px] max-sm:text-xs"
          >
            E-mail
          </label>
          <div className="flex h-12 items-center gap-2 self-stretch bg-[#FEF9E5] p-4 rounded-2xl max-sm:h-11 max-sm:p-3 max-sm:rounded-xl">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Digite seu e-mail"
              className="flex-[1_0_0] text-[#BB9205] text-base font-medium leading-5 tracking-[0.16px] bg-transparent border-none outline-none placeholder:opacity-60 max-sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 self-stretch">
          <label
            htmlFor="password"
            className="h-5 self-stretch text-[#BB9205] text-sm font-medium leading-5 tracking-[0.14px] max-sm:text-xs"
          >
            Senha
          </label>
          <div className="flex h-12 items-center gap-2 self-stretch bg-[#FEF9E5] p-4 rounded-2xl max-sm:h-11 max-sm:p-3 max-sm:rounded-xl">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Digite sua senha"
              className="flex-[1_0_0] text-[#BB9205] text-base font-medium leading-5 tracking-[0.16px] bg-transparent border-none outline-none placeholder:opacity-60 max-sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 self-stretch">
          <label
            htmlFor="confirmPassword"
            className="h-5 self-stretch text-[#BB9205] text-sm font-medium leading-5 tracking-[0.14px] max-sm:text-xs"
          >
            Confirmar senha
          </label>
          <div className="flex h-12 items-center gap-2 self-stretch bg-[#FEF9E5] p-4 rounded-2xl max-sm:h-11 max-sm:p-3 max-sm:rounded-xl">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirme sua senha"
              className="flex-[1_0_0] text-[#BB9205] text-base font-medium leading-5 tracking-[0.16px] bg-transparent border-none outline-none placeholder:opacity-60 max-sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-4 self-stretch">
          <div className="relative">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="w-6 h-6 rounded bg-white border-2 border-solid border-[#FBDEB1] appearance-none checked:bg-[#F7B34D] checked:border-[#F7B34D] cursor-pointer"
              required
            />
            {formData.acceptTerms && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          <label
            htmlFor="acceptTerms"
            className="text-[#999694] text-base font-medium leading-5 tracking-[0.16px] cursor-pointer max-sm:text-sm"
          >
            Aceito os termos e condições
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-16 justify-center items-center gap-4 self-stretch cursor-pointer bg-[#F7B34D] pl-5 pr-6 py-2 rounded-[20px] hover:bg-[#e6a043] transition-colors disabled:opacity-50 disabled:cursor-not-allowed max-sm:h-14 max-sm:rounded-2xl"
        >
          <span className="text-white text-lg font-extrabold leading-6 tracking-[0.18px] max-sm:text-base">
            {loading ? 'Criando conta...' : 'Criar conta'}
          </span>
        </button>
      </div>
    </form>
  );
};