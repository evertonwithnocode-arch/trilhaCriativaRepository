import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyCodeRequest {
  email: string;
  code: string;
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, code }: VerifyCodeRequest = await req.json();

    if (!email || !code) {
      return new Response(JSON.stringify({ error: 'Email e código são obrigatórios' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get user ID from auth.users table using listUsers
    const { data: usersData, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('Error listing users:', userError);
      return new Response(JSON.stringify({ error: 'Erro ao buscar usuário' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const user = usersData.users.find(u => u.email === email);
    
    if (!user) {
      console.error('User not found for email:', email);
      return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = user.id;

    // Find valid verification code
    const { data: verificationData, error: verificationError } = await supabase
      .from('email_verifications')
      .select('*')
      .eq('user_id', userId)
      .eq('code', code)
      .eq('used', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (verificationError || !verificationData) {
      // Increment attempts for this email/code combination
      await supabase
        .from('email_verifications')
        .update({ attempts: supabase.rpc('increment_attempts') })
        .eq('user_id', userId)
        .eq('code', code);

      return new Response(JSON.stringify({ error: 'Código inválido ou expirado' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Mark code as used
    const { error: updateError } = await supabase
      .from('email_verifications')
      .update({ used: true })
      .eq('id', verificationData.id);

    if (updateError) {
      console.error('Error updating verification code:', updateError);
      return new Response(JSON.stringify({ error: 'Erro ao processar verificação' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update user email_confirmed_at in auth.users
    const { error: confirmError } = await supabase.auth.admin.updateUserById(userId, {
      email_confirm: true
    });

    if (confirmError) {
      console.error('Error confirming user email:', confirmError);
    }

    console.log('Email verified successfully for user:', userId);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email verificado com sucesso' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in verify-code function:', error);
    return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});