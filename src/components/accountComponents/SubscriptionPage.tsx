import { ArrowRight, ChevronRight } from "lucide-react";
import React from "react";

const SubscriptionPage: React.FC = () => {
    return (
        <div className="h-[664px]  bg-[#FFF4D9] flex flex-col items-center  py-8 ">
            {/* Texto superior */}
            <p className="text-[#2C2623] text-normal font-semibold leading-6  mb-8 self-start  pl-4 sm:pl-8 md:pl-[60px] lg:pl-[100px] xl:pl-[145px] ">
                Gerencie aqui sua assinatura e informações sobre pagamentos.
            </p>

            {/* Card do plano */}
            <div className="w-full max-w-[1040px] h-[464px] shadow-[0_3px_0_0_#FFE0B2]   bg-white rounded-3xl border-2 border-solid border-[#FBDEB1]  ">
                <div className="p-10">
                    {/* Preço */}
                 
                    {/* Informações do plano */}
                    <div className="flex flex-row items-center justify-between">
                        <h2 className="text-[#2C2623] text-lg font-normal leading-6 tracking-[0.18px]">
                            Seu plano atual
                        </h2>
                           <div className="flex h-14 items-center gap-2 bg-[#FFFCF2] px-6 py-4 rounded-2xl border-2 border-solid border-[#FEF2CC]">
                        <span className="text-[#2C2623] text-base font-bold leading-5 tracking-[0.16px]">
                            R$ 69,90 por mês
                        </span>
                    </div>
                    </div>
                    <h1 className="text-[#2C2623] text-[32px] font-extrabold leading-8 tracking-[-0.32px]">
                        Plano PRO Individual
                    </h1>
                    {/* Lista de benefícios */}
                    <ul className="space-y-2 text-[#5E503F] text-sm pt-4">
                        <li className="flex items-start gap-2">
                            <span className="text-[#FBBF24]"><ChevronRight size={20}/></span> 1 profissional
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#FBBF24]"><ChevronRight size={20}/></span> Até 10 pacientes ativos
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#FBBF24]"><ChevronRight size={20}/></span> Acesso completo à biblioteca de jogos
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#FBBF24]"><ChevronRight size={20}/></span> Painel de desempenho por paciente
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#FBBF24]"><ChevronRight size={20}/></span> Relatórios exportáveis (PDF/Excel)
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#FBBF24]"><ChevronRight size={20}/></span> Suporte padrão
                        </li>
                    </ul>
                    {/* Linha divisória */}
                    <div className="w-full border-t border-[#F6E2B9] my-8" />
                    {/* Botões */}
                    <div className="flex gap-4">
                        <button className="bg-[#FBBF24] text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-[#F59E0B] transition">
                            Gerenciar assinatura
                        </button>
                        <button className="bg-[#FBBF24] text-white text-sm font-medium px-6 py-2 rounded-lg hover:bg-[#F59E0B] transition">
                            Fazer upgrade de plano
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
