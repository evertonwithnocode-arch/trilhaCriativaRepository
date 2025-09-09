import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import HelpButton from "@/components/HelpButton";
import { BackgroundConfirmEmail } from "@/components/BackgroundConfirmEmail";

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, resendOtp } = useAuth();

  // Get email from navigation state
  const email = location.state?.email || "seu-email@email.com";

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        nextInput?.focus();
      }

      // Auto submit when all fields are filled
      if (newCode.every(digit => digit !== "") && newCode[5] !== "") {
        handleVerifyCode(newCode.join(""));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyCode = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join("");

    if (codeToVerify.length !== 6) {
      toast.error("Por favor, digite o código completo");
      return;
    }

    setLoading(true);

    try {
      const { error } = await verifyOtp(email, codeToVerify);

      if (error) {
        toast.error("Código inválido ou expirado");
        // Clear the code inputs
        setCode(["", "", "", "", "", ""]);
        document.getElementById("code-input-0")?.focus();
      } else {
        toast.success("Email verificado com sucesso!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Erro ao verificar código");
      setCode(["", "", "", "", "", ""]);
      document.getElementById("code-input-0")?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);

    try {
      const { error } = await resendOtp(email);

      if (error) {
        toast.error("Erro ao reenviar código");
      } else {
        toast.success("Código reenviado com sucesso!");
        setCode(["", "", "", "", "", ""]);
        document.getElementById("code-input-0")?.focus();
      }
    } catch (error) {
      toast.error("Erro ao reenviar código");
    } finally {
      setResending(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  // Auto focus first input on mount
  useEffect(() => {
    document.getElementById("code-input-0")?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted relative overflow-hidden">
      <BackgroundConfirmEmail />

      {/* Logo */}
      <div className="absolute top-8 left-8 md:top-10 md:left-10">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/09b8c8b2251ba50585cbbd8ee69d204f9ad06348?width=240"
          alt="Logo"
          className="w-24 h-auto md:w-32"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10">
        <div className="max-w-lg w-full text-center space-y-6 md:space-y-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            Confira seu email!
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Enviamos um código de verificação no e-mail{" "}
            <span className="font-bold text-foreground">{email}</span>
          </p>

          {/* Code Input Fields */}
          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={loading}
                className="w-12 h-16 md:w-16 md:h-20 lg:w-18 lg:h-20 text-center text-xl md:text-2xl font-semibold 
                          border-2 border-[#F9DFAF] border-border rounded-2xl md:rounded-3xl bg-background
                          focus:outline-none focus:ring-2 focus:ring-[#c79e53] focus:border-[#F9DFAF]
                          shadow-[0_3px_0_0_hsl(var(--muted))] transition-all duration-200
                          hover:shadow-[0_4px_0_0_hsl(var(--muted))] hover:translate-y-[-1px]
                          disabled:opacity-50 disabled:cursor-not-allowed"
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          {/* Manual Verify Button (if needed) */}
          {code.join("").length === 6 && !loading && (
            <button
              onClick={() => handleVerifyCode()}
              disabled={loading}
              className="w-full max-w-md mx-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verificando..." : "Verificar código"}
            </button>
          )}

          <div className="pt-20">
            {/* Resend Button */}
            <div className="mt-8 md:mt-12">
              <button
                onClick={handleResendCode}
                disabled={resending}
                className="w-full max-w-md mx-auto bg-[#FCE699] hover:bg-[#FCE699]/90 text-secondary-foreground font-bold py-3 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resending ? "Reenviando..." : "Reenviar código de verificação"}
              </button>
            </div>
            {/* Login Link */}
            <div className="mt-6 md:mt-8">
              <p className="text-sm md:text-base text-muted-foreground">
                Você já possui cadastro?{" "}
                <button
                  onClick={handleLoginClick}
                  className="text-[#EDA63B] font-bold hover:text-primary/80 transition-colors duration-200"
                >
                  Faça login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <HelpButton />
    </div>
  );
}