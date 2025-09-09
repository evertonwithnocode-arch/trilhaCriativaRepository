import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundSVG from '@/components/BackgroundSVG';
import LoginForm from '@/components/LoginForm';
import HelpButton from '@/components/HelpButton';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <main className="w-full h-screen relative overflow-hidden bg-[#FFFCF2] flex flex-col items-center justify-center max-md:p-5 max-sm:p-4">


      <div className='z-10 absolute bottom-0 w-full'>
        <div className=" min-w-[1000px] h-[400px] bg-[#FEF2CC] flex justify-between items-start overflow-hidden">
        </div>
        {/* Círculos da esquerda */}
        <div className="flex bottom-[350px] absolute bottom-[10px]">
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div> 
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div>
        </div>
        {/* Círculos da direita */}
        <div className="flex absolute right-0 bottom-[350px] gap-[-20px]">
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div>
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div>
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div>
        </div>
      </div>
      <header>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/09b8c8b2251ba50585cbbd8ee69d204f9ad06348?width=240"
          alt="Logo da empresa"
          className="w-[120px] h-[78px] absolute left-10 top-10 max-md:w-[100px] max-md:h-[65px] max-md:left-5 max-md:top-5 max-sm:w-20 max-sm:h-[52px] max-sm:left-4 max-sm:top-4"
        />
      </header>

      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto z-10">
        <section className="text-center mb-8">
          <h1 className="text-[#2C2623] text-center text-[32px] font-extrabold leading-8 tracking-[-0.32px] mb-4 max-md:text-[28px] max-md:leading-7 max-sm:text-2xl max-sm:leading-6 max-sm:px-4">
            Bem-vindo de volta!
          </h1>

          <p className="text-[#2C2623] text-center text-lg font-medium leading-6 tracking-[0.18px] max-md:text-base max-md:leading-[22px] max-sm:text-sm max-sm:leading-5 max-sm:px-4">
            Acesse sua conta.
          </p>
        </section>

        <LoginForm />

        <footer className="text-center text-base leading-5 tracking-[0.16px] mt-8 max-md:mt-6 max-sm:text-sm max-sm:px-4">
          <span className="text-[#2C2623] font-normal">
            Não possui conta ainda?{' '}
          </span>
          <button
            onClick={handleSignUp}
            className="text-[#EEA63B] font-extrabold cursor-pointer hover:text-[#d4951f] transition-colors"
          >
            Cadastre-se agora!
          </button>
        </footer>
      </div>


      <HelpButton />
    </main>
  );
};

export default Index;
