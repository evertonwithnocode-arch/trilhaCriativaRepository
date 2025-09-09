import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PatientProfileProps {
  name: string;
  age: number;
  avatarUrl: string;
  onEdit?: () => void;
  onDownload?: () => void;
  onPlay?: () => void;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({
  name,
  age,
  avatarUrl,
  onEdit,
  onDownload,
  onPlay
}) => {
   const navigate = useNavigate();
  return (
    <section className="flex w-[90%] mx-auto flex-col justify-center items-center pt-10">
      <div className='flex justify-between w-full'>
        <header className="flex items-center  gap-3 h-[40px] cursor-pointer" onClick={() => navigate('/pacientes')}>
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
        <div className="inline-flex items-center gap-2  w-52 h-16">
          <button
            onClick={onEdit}
            className="flex w-16 h-16 justify-center items-center gap-2 relative bg-white p-3 rounded-[28px] border-4 border-solid border-[#FEF9E5]"
            aria-label="Editar paciente"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_edit)">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.4286 0C7.64149 0 4.57143 3.07006 4.57143 6.85714C4.57143 10.6442 7.64149 13.7143 11.4286 13.7143C15.2157 13.7143 18.2857 10.6442 18.2857 6.85714C18.2857 3.07006 15.2157 0 11.4286 0ZM11.4286 16C5.11675 16 0 21.1168 0 27.4286V28.5714C0 29.2025 0.511675 29.7143 1.14286 29.7143H13.2828L13.793 26.0919C13.9102 25.2599 14.2945 24.4885 14.8879 23.8937L19.4671 19.3048C17.4024 17.2617 14.5628 16 11.4286 16Z" fill="#FAD34D" />
                <path fillRule="evenodd" clipRule="evenodd" d="M27.224 16C27.4949 15.9999 27.7545 16.1074 27.9461 16.2989L31.701 20.054C32.0997 20.4525 32.0997 21.0986 31.701 21.4971L22.0889 31.1093C21.9312 31.267 21.7261 31.3687 21.505 31.3989L17.1581 31.9906C16.8413 32.0338 16.5227 31.9259 16.2972 31.6994C16.0717 31.4729 15.9654 31.1538 16.01 30.8373L16.6222 26.4903C16.6531 26.2713 16.7542 26.0683 16.9104 25.9118L26.5022 16.2996C26.6935 16.1079 26.9531 16.0001 27.224 16Z" fill="#BB9205" />
              </g>
              <defs>
                <clipPath id="clip0_edit">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button
            onClick={onDownload}
            className="flex w-16 h-16 justify-center items-center gap-2 relative bg-white p-3 rounded-[28px] border-4 border-solid border-[#FEF9E5]"
            aria-label="Baixar relatório"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.42878 22.8571C4.69113 22.8571 5.7145 23.8805 5.7145 25.1429C5.7145 25.749 5.95532 26.3305 6.38396 26.7591C6.81262 27.1877 7.39399 27.4286 8.00021 27.4286H24.0002C24.6064 27.4286 25.1879 27.1877 25.6164 26.7591C26.045 26.3305 26.2859 25.749 26.2859 25.1429C26.2859 23.8805 27.3092 22.8571 28.5716 22.8571C29.834 22.8571 30.8574 23.8805 30.8574 25.1429C30.8574 26.9616 30.1348 28.7056 28.8489 29.9915C27.563 31.2775 25.819 32 24.0002 32H8.00021C6.18158 32 4.43744 31.2775 3.15148 29.9915C1.86551 28.7056 1.14307 26.9614 1.14307 25.1429C1.14307 23.8805 2.16641 22.8571 3.42878 22.8571Z" fill="#FAD34D" />
              <path fillRule="evenodd" clipRule="evenodd" d="M18.2859 2.85714C18.2859 1.59478 17.2626 0.571426 16.0002 0.571426C14.7379 0.571426 13.7145 1.59478 13.7145 2.85714V14.8571H10.286C9.82371 14.8571 9.40701 15.1356 9.23009 15.5626C9.0532 15.9897 9.15098 16.4813 9.47784 16.8081L15.1921 22.5224C15.6384 22.9687 16.3621 22.9687 16.8084 22.5224L22.5227 16.8081C22.8495 16.4813 22.9472 15.9897 22.7704 15.5626C22.5935 15.1356 22.1768 14.8571 21.7145 14.8571H18.2859V2.85714Z" fill="#BB9205" />
            </svg>
          </button>
          <button
            onClick={onPlay}
            className="flex w-16 h-16 justify-center items-center gap-2 relative bg-white p-3 rounded-[28px] border-4 border-solid border-[#FEF9E5]"
            aria-label="Iniciar sessão"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_play)">
                <path d="M0 16C3.86286e-07 7.16345 7.16345 -3.86286e-07 16 0C24.8366 3.86286e-07 32 7.16345 32 16C32 24.8366 24.8366 32 16 32C7.16345 32 -3.86286e-07 24.8366 0 16Z" fill="#FAD34D" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.1773 9.31657C12.825 9.09639 12.3809 9.08473 12.0176 9.28612C11.6542 9.48752 11.4287 9.87026 11.4287 10.2857V21.7143C11.4287 22.1297 11.6542 22.5125 12.0176 22.7139C12.3809 22.9152 12.825 22.9035 13.1773 22.6834L22.3201 16.9691C22.6543 16.7603 22.8573 16.3941 22.8573 16C22.8573 15.606 22.6543 15.2397 22.3201 15.0309L13.1773 9.31657Z" fill="#BB9205" />
              </g>
              <defs>
                <clipPath id="clip0_play">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <img
        src={avatarUrl}
        alt={`Foto de ${name}`}
        className="w-[120px] h-[120px]  rounded-[56px] object-cover"
      />
      <div className="flex flex-col justify-center items-center gap-1 self-stretch ">
        <h2 className="self-stretch text-[#2C2623] text-center text-[40px] font-extrabold leading-[48px] tracking-[-0.4px] relative">
          {name}
        </h2>
        <div className="flex justify-center items-center gap-2 border relative bg-[#FFFCF2] px-3 py-1 rounded-[100px] border-solid border-[#FCE699]">
          <span className="text-[#2C2623] text-sm font-bold leading-5 tracking-[0.14px] relative">
            {age} anos
          </span>
        </div>
      </div>


    </section>
  );
};
