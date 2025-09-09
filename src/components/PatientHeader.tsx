import React from 'react';

interface PatientHeaderProps {
  onBackClick?: () => void;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({ onBackClick }) => {
  return (
    <header className="flex  gap-3 ">
      <button 
        className="flex items-center justify-center"
        aria-label="Voltar para lista de pacientes"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M15 18L9 12L15 6" 
            stroke="#F7B34D" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="overflow-hidden text-[#2C2623] text-ellipsis text-base font-extrabold leading-5 tracking-[0.16px] relative">
        Lista de pacientes
      </h1>
    </header>
  );
};
