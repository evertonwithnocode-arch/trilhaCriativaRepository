import { supabase } from "@/integrations/supabase/client";

interface InviteUserProps {
  fullName: string;
  email: string;
  phone?: string;
  professionalRegistry?: string;
}

export const inviteUser = async ({
  fullName,
  email,
  phone,
  professionalRegistry,
}: InviteUserProps) => {
  try {
    const response = await supabase.functions.invoke('invite-user', {
      body: {
        fullName,
        email,
        phone: phone || null,
        professionalRegistry: professionalRegistry || null,
      },
    });

    if (!response) throw new Error('Erro desconhecido ao convidar usuário');

    return response; // já retorna o data da função: { user, invite }
  } catch (err: any) {
    console.error('Erro ao chamar Edge Function invite-user:', err.message);
    throw err;
  }
};
