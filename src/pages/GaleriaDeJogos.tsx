import React from "react";
import { ChevronDown, Star, Play } from "lucide-react";
import { AppSidebar } from "@/components/AppSideBar";
import { useLocation, useNavigate } from 'react-router-dom';

const GaleriaDeJogos: React.FC = () => {
    const navigate = useNavigate();
    return (
        <main className="flex flex-row min-h-screen bg-[#FEF9E5]  font-sans text-gray-800 w-full">
            {/* Header */}
            <AppSidebar />
            <div className=" w-full">
                <div className="pl-20 pr-20 pt-10">
                    <header>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C2623]">
                            Galeria de jogos
                        </h1>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">
                            Explore jogos terapêuticos organizados por trilhas de desenvolvimento.
                        </p>
                    </header>
                    {/* Filtros */}
                    <div className="mt-6 flex flex-wrap gap-3 items-center">
                        {["Trilha 1", "Trilha 2", "Trilha 3", "Trilha 4", "Trilha 5"].map(
                            (label, i) => (
                                <button
                                    key={i}
                                    className="px-6 py-2 rounded-xl bg-white border-2 border-[#FBDEB1] shadow-[0_2px_0_0_#FBDEB1] font-bold text-sm text-[#2C2623] hover:shadow-[0_4px_0_0_#FBDEB1] transition"
                                >
                                    {label}
                                </button>
                            )
                        )}
                        <button className="ml-auto flex items-center justify-between px-4 py-2 w-[150px] rounded-xl bg-white border-2 border-[#FBDEB1] shadow-[0_2px_0_0_#FBDEB1] text-sm font-bold text-gray-700">
                            Categorias
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
                {/* Grid de jogos */}
                <section className=" bg-[#FEF2CC] min-h-[800px] p-20 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(1)].map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col justify-between p-5 bg-white rounded-2xl border-2 border-[#FBDEB1] shadow-[0_3px_0_0_#FFE0B2] w-[336px] h-[376px]"
                        >
                            {/* Thumbnail */}
                            <div className="w-full h-32 flex items-center justify-center rounded-xl bg-[#FEF9E5]">
                                <Play className="w-10 h-10 text-[#F9D55B]" />
                            </div>
                            {/* Texto */}
                            <div className="mt-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex">
                                        <h3 className="font-extrabold text-[#2C2623] text-sm sm:text-[14px]">
                                            {i % 2 === 0
                                                ? "Título com até duas linhas de conteúdo..."
                                                : "Título"}
                                        </h3>
                                        <div className="flex items-center gap-1 text-[#2C2623] font-bold text-sm">
                                            <Star size={14} fill="#F9B233" strokeWidth={0} />
                                            5.0
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 leading-snug">
                                        Descrição em uma ou duas linhas de conteúdo.
                                    </p>
                                </div>
                                {/* Rodapé */}
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FEF9E5] text-[#D49C22] border border-[#F9D55B]">
                                        Categoria
                                    </span>

                                    <button
                                    onClick={() => navigate('/jogos/detalhes')}
                                     className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F9B233] text-white shadow-md">
                                        <Play size={16} fill="white" strokeWidth={0} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
};

export default GaleriaDeJogos;
