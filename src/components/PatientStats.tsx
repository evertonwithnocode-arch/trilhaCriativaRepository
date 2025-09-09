import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PatientStatsProps {
  description: string;
  sessionsCompleted: number;
  averageScore: string;
  totalTime: string;
}

export const PatientStats: React.FC<PatientStatsProps> = ({
  description,
  sessionsCompleted,
  averageScore,
  totalTime,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className={`flex w-[588px] mx-auto flex-col gap-10 pt-4 pb-10 transition-all duration-300`}
    >
      <article className="flex flex-col items-start gap-4">
        {/* Texto animado */}
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.p
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="self-stretch text-[#2C2623] text-center text-lg font-medium leading-6 tracking-[0.38px] overflow-hidden"
            >
              {description}
            </motion.p>
          ) : (
            <motion.p
              key="collapsed"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "4.5rem", opacity: 1 }} // altura fixa equivalente a ~4 linhas
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="self-stretch text-[#2C2623] text-center text-lg font-medium leading-6 tracking-[0.38px] overflow-hidden line-clamp-4"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Botão Expandir/Recolher */}
        <div className="flex justify-center items-center gap-4 self-stretch">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 relative"
            aria-label={isExpanded ? "Recolher descrição" : "Expandir descrição"}
          >
            <span className="text-[#2C2623] text-center text-base font-bold leading-5 tracking-[0.16px] relative">
              {isExpanded ? "Recolher" : "Expandir"}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#F7B34D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </article>

      {/* Estatísticas */}
      <div className="flex items-center self-stretch">
        <div className="flex flex-col items-start gap-2 flex-1 relative">
          <h3 className="self-stretch text-[#2C2623] text-center text-lg font-extrabold leading-6 tracking-[0.18px]">
            Sessões realizadas
          </h3>
          <div className="self-stretch text-[#2C2623] text-center text-[32px] font-extrabold leading-8 tracking-[-0.32px]">
            {sessionsCompleted}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 flex-1 relative">
          <h3 className="self-stretch text-[#2C2623] text-center text-lg font-extrabold leading-6 tracking-[0.18px]">
            Pontuação média
          </h3>
          <div className="self-stretch text-[#2C2623] text-center text-[32px] font-extrabold leading-8 tracking-[-0.32px]">
            {averageScore}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 flex-1 relative">
          <h3 className="self-stretch text-[#2C2623] text-center text-lg font-extrabold leading-6 tracking-[0.18px]">
            Tempo total
          </h3>
          <div className="self-stretch text-[#2C2623] text-center text-[32px] font-extrabold leading-8 tracking-[-0.32px]">
            {totalTime}
          </div>
        </div>
      </div>
    </section>
  );
};
