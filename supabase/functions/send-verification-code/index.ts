
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerificationRequest {
  email: string;
  type: 'signup' | 'resend';
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const resendApiKey = Deno.env.get('SENDGRID_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, type }: VerificationRequest = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email é obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Processing verification request for:', email);

    // Generate 6-digit code
    const code = generateVerificationCode();

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
    console.log('Found user ID:', userId);

    // Mark existing codes as used
    await supabase
      .from('email_verifications')
      .update({ used: true })
      .eq('user_id', userId)
      .eq('used', false);

    // Insert new verification code
    const { error: insertError } = await supabase
      .from('email_verifications')
      .insert({
        user_id: userId,
        email: email,
        code: code,
      });

    if (insertError) {
      console.error('Error inserting verification code:', insertError);
      return new Response(JSON.stringify({ error: 'Erro ao salvar código de verificação' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Verification code saved, attempting to send email...');

    // Send email with verification code
    try {
      const emailResponse = await resend.emails.send({
        from: 'Verificação <onboarding@resend.dev>',
        to: [email],
        subject: 'Código de verificação - TC Project',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Código de Verificação</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              Olá! Use o código abaixo para verificar seu email:
            </p>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #333; letter-spacing: 5px;">${code}</span>
            </div>
            <p style="color: #666; font-size: 14px;">
              Este código expira em 10 minutos. Se você não solicitou este código, pode ignorar este email.
            </p>
          </div>
        `,
      });

      if (emailResponse.error) {
        console.error('Error sending email:', emailResponse.error);
        
        // Check if it's a domain verification error
        if (emailResponse.error.message && emailResponse.error.message.includes('verify a domain')) {
          return new Response(JSON.stringify({ 
            error: 'Para enviar emails, você precisa verificar um domínio no Resend. Acesse https://resend.com/domains para configurar.' 
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        return new Response(JSON.stringify({ error: 'Erro ao enviar email: ' + emailResponse.error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('Verification code sent successfully:', { email, codeId: emailResponse.data?.id });

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Código de verificação enviado com sucesso' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (emailError: any) {
      console.error('Exception while sending email:', emailError);
      
      // Handle specific Resend errors
      if (emailError.message && emailError.message.includes('verify a domain')) {
        return new Response(JSON.stringify({ 
          error: 'Para enviar emails, você precisa verificar um domínio no Resend. Acesse https://resend.com/domains para configurar.' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ 
        error: 'Erro ao enviar email. Verifique se o domínio está configurado no Resend.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in send-verification-code function:', error);
    return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
