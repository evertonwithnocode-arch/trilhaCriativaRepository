-- Create table for email verifications with PIN codes
CREATE TABLE public.email_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  code text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone DEFAULT (now() + interval '10 minutes'),
  used boolean DEFAULT false,
  attempts integer DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies for email verifications
CREATE POLICY "Users can view their own verification codes" 
ON public.email_verifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all verification codes" 
ON public.email_verifications 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create index for performance
CREATE INDEX idx_email_verifications_user_id ON public.email_verifications(user_id);
CREATE INDEX idx_email_verifications_code ON public.email_verifications(code);
CREATE INDEX idx_email_verifications_email ON public.email_verifications(email);