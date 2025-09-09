import React from 'react';
import { BackgroundDecoration } from '@/components/BackgroundDecoration';
import { SignupForm } from '@/components/SignupForm';
import HelpButton from '@/components/HelpButton';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/');
  };
  return <main className="w-full h-screen relative overflow-hidden bg-[#FFFCF2] flex flex-col items-center justify-center max-md:p-5 max-sm:p-4">
      <BackgroundDecoration />
      
      <header className="absolute left-10 top-10 max-md:left-5 max-md:top-5">
        <img src="https://api.builder.io/api/v1/image/assets/TEMP/09b8c8b2251ba50585cbbd8ee69d204f9ad06348?width=240" alt="Trilha Criativa Logo" className="w-[120px] h-[78px] shrink-0 aspect-[20/13] max-md:w-[100px] max-md:h-[65px] max-sm:w-20 max-sm:h-[52px]" />
      </header>

      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto z-10">
        <section className="text-center mb-8">
          <h1 className="text-[#2C2623] text-center text-[32px] font-extrabold leading-8 tracking-[-0.32px] mb-4 max-md:text-[28px] max-md:leading-7 max-sm:text-2xl max-sm:leading-6 max-sm:px-4">
            Comece sua jornada!
          </h1>
          
          <p className="text-[#2C2623] text-center text-lg font-medium leading-6 tracking-[0.18px] max-md:text-base max-md:leading-[22px] max-sm:text-sm max-sm:leading-5 max-sm:px-4">
            Cadastre-se para acessar o universo Trilha Criativa.
          </p>
        </section>

        <SignupForm />

        <footer className="text-center text-base leading-5 tracking-[0.16px] mt-8 max-md:mt-6 max-sm:text-sm max-sm:px-4">
          <span className="text-[#2C2623] font-normal">
            Você já possui cadastro?{' '}
          </span>
          <button onClick={handleLoginClick} className="text-[#EEA63B] font-extrabold cursor-pointer hover:text-[#d4951f] transition-colors">
            Faça login
          </button>
        </footer>
      </div>

      <HelpButton />
    </main>;
};
export default Signup;