import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  age: number;
  image: string;
  lastSession: string;
}

interface PatientCardProps {
  patient: Patient;
  onViewPatient: (patientId: string) => void;
  className?: string;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onViewPatient, className = '' }) => {
  const navigate = useNavigate();
  return (
    <article className={`flex w-[336px] flex-col items-center gap-6 shadow-[0_3px_0_0_#FFE0B2] bg-white pb-6 rounded-3xl border-2 border-solid border-[#FBDEB1] max-sm:w-full ${className}`}>
      <header className="flex w-[336px] items-center gap-5 bg-white pl-2 pr-5 pt-2 pb-0 rounded-[24px_24px_0_0] border-t-2 border-t-[#FBDEB1] border-x-2 border-x-[#FBDEB1] border-solid max-sm:w-full">
        <img
          src={patient.image}
          alt={`Foto de ${patient.name}`}
          className="w-20 h-20 shrink-0 rounded-2xl object-cover"
        />
        <div className="flex h-16 flex-col justify-between items-start flex-[1_0_0]">
          <h3 className="overflow-hidden text-[#2C2623] text-ellipsis text-lg font-extrabold leading-6 tracking-[0.18px] pb-14">
            {patient.name}
          </h3>
          <div className="flex justify-center items-center gap-2 border bg-[#FFFCF2] px-3 py-1 rounded-[100px] border-solid border-[#FCE699]">
            <span className="text-[#2C2623] text-sm font-bold leading-5 tracking-[0.14px]">
              {patient.age} anos
            </span>
          </div>
        </div>
      </header>

      <div className="flex w-72 flex-col items-start gap-6 sm:pl-0 pl-2" >
        <div className="flex items-center gap-2">
          <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3482_734)">
                <path d="M9.99984 4.99999V9.99999L13.3332 11.6667M18.3332 9.99999C18.3332 14.6024 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6024 1.6665 9.99999C1.6665 5.39762 5.39746 1.66666 9.99984 1.66666C14.6022 1.66666 18.3332 5.39762 18.3332 9.99999Z" stroke="#F7B34D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
              <defs>
                <clipPath id="clip0_3482_734">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <span className="text-[#2C2623] text-lg font-medium leading-6 tracking-[0.18px]">
            {patient.lastSession}
          </span>
        </div>

        <button
          onClick={() => {
            onViewPatient(patient.id);
            navigate(`/pacientes/detalhes/${patient.id}`);
          }}
          className="flex h-10 justify-center items-center gap-2 bg-[#FCE699] px-5 py-2 rounded-xl hover:bg-[#F7B34D] transition-colors"
        >
          <span className="text-[#2C2623] text-sm font-extrabold leading-5 tracking-[0.14px]">
            Ver paciente
          </span>
        </button>
      </div>
    </article>
  );
};
