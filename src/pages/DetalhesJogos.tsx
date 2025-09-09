import { AppSidebar } from "@/components/AppSideBar";
import React, { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const DetalhesJogos: React.FC = () => {
    const [reviewText, setReviewText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Review submitted:", reviewText);
        setReviewText("");
    };

    const reviews = [
        {
            name: "Dra. Ana Costa",
            time: "Há 1 semana atrás",
            text: "Excelente para trabalhar memória. Meus pacientes adoram!",
            rating: 5.0,
        },
        {
            name: "Dra. Ana Costa",
            time: "Há 1 semana atrás",
            text: "Excelente para trabalhar memória. Meus pacientes adoram!",
            rating: 5.0,
        },
    ];

    const objectives = [
        "Desenvolver memória de curto prazo",
        "Melhorar atenção visual",
        "Fortalecer concentração",
    ];

    const instructions = [
        { number: 1, text: "Observe as cartas viradas" },
        { number: 2, text: "Clique em duas cartas e forme pares" },
        { number: 3, text: "Complete todos os pares" },
    ];

    return (
        <main className="min-h-screen bg-[#FFFCF2] flex w-full font-sans text-gray-800 ">
            {/* Header */}
            <AppSidebar />
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 justify-between ml-10 mr-[200px] mt-10 ">
                    <div className="flex gap-2 items-center">
                        <IoIosArrowBack className="text-[#FBBF24] text-xl"/>
                        <span className="text-[#2C2623] font-extrabold text-base">
                            Galeria de jogos
                        </span>
                    </div>

                    <div className="flex gap-6">
                        {/* Ícone de coração */}
                        <div className="w-[50px] h-[50px] flex items-center justify-center rounded-[40%] border-[2px] border-[#FFF5D6] bg-white shadow-sm">
                            <FaRegHeart className="text-[#FBBF24] text-xl" />
                        </div>

                        {/* Ícone de aviãozinho */}
                        <div className="w-[50px] h-[50px] flex items-center justify-center rounded-[40%] border-[2px] border-[#FFF5D6] bg-white shadow-sm">
                            <FaRegPaperPlane className="text-[#FBBF24] text-xl" />
                        </div>
                    </div>
                </div>
                <header className="w-full max-w-5xl mx-auto ">
                    {/* Voltar */}

                    {/* Título + Categorias */}
                    <div className="flex flex-col items-center text-center gap-6 mb-[150px]">
                        <h1 className="text-[#2C2623] text-4xl md:text-5xl font-extrabold leading-tight">
                            Memória visual
                        </h1>
                        {/* Categorias */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Trilha Cognitiva", "Memória"].map((cat, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 bg-[#FFFCF2] px-4 py-2 rounded-xl border-2 border-[#FBDEB1] shadow-[0_3px_0_0_#FFE0B2]"
                                >
                                    <span className="text-[#2C2623] font-bold text-sm md:text-base">
                                        {cat}
                                    </span>
                                </div>
                            ))}
                            <div className="flex items-center gap-2 bg-[#FFFCF2] px-3 py-2 rounded-xl border-2 border-[#FBDEB1] shadow-[0_3px_0_0_#FFE0B2]">
                                <span className="text-[#2C2623] font-bold text-sm md:text-base">
                                    5.0 ⭐
                                </span>
                            </div>
                        </div>
                        {/* Descrição */}
                        <p className="  max-w-3xl text-[#2C2623] text-sm md:text-lg font-medium leading-relaxed">
                            Jogo de memória com cartas para desenvolver a capacidade de
                            memorização e atenção visual. Ao iniciar o jogo, você precisará
                            selecionar um paciente. Todos os dados da sessão serão
                            automaticamente registrados no perfil do paciente escolhido.
                        </p>
                    </div>
                </header>
                {/* Objetivos & Instruções */}
                <div className="bg-[#FEF2CC]  relative h-[1300px] pt-[500px] w-full">
                    <div className="w-[864px] h-[487px] absolute bottom-[870px] left-1/2 -translate-x-1/2 max-md:w-full max-md:bottom-[00px]">
                        <div className="w-[864px] h-[487px] shadow-[0_3px_0_0_#FFE0B2] absolute bg-white rounded-3xl border-2 border-[#FBDEB1] max-md:w-full" />
                        <div className="w-[824px] h-[447px] absolute bg-[#FEF2CC] rounded-2xl left-5 top-5 max-md:w-full flex items-center justify-center">
                            <button className="flex items-center justify-center w-[248px] h-[64px] gap-2 bg-[#FBB040] text-white font-bold text-lg  rounded-full shadow-md hover:opacity-90 transition">
                                {/* Ícone Play */}
                                <FaCirclePlay color="white" />
                                Iniciar jogo
                            </button>
                        </div>

                    </div>
                    <section className=" flex justify-center gap-[180px]  py-10">
                        {/* Objetivos */}
                        <div className="space-y-4 ">
                            <h2 className="text-[#2C2623] text-xl font-extrabold">
                                Objetivos terapêuticos
                            </h2>
                            <ul className="space-y-3">
                                {objectives.map((obj, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <span className="w-6 h-6 rounded-full bg-[#FAD34D] flex items-center justify-center text-xs font-bold text-[#BB9205]">
                                            ✓
                                        </span>
                                        <span className="text-[#2C2623] text-base md:text-lg font-medium">
                                            {obj}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Instruções */}
                        <div className="space-y-4 ">
                            <h2 className="text-[#2C2623] text-xl font-extrabold">Como usar</h2>
                            <ul className="space-y-3">
                                {instructions.map((step, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <span className="w-7 h-7 rounded-full bg-[#FAD34D] flex items-center justify-center font-bold text-[#BB9205]">
                                            {step.number}
                                        </span>
                                        <span className="text-[#2C2623] text-base md:text-lg font-medium">
                                            {step.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    {/* Avaliações */}
                    <section className="w-full max-w-5xl mx-auto py-10 space-y-6">
                        <h2 className="text-[#2C2623] text-2xl font-extrabold">
                            Avaliações de Profissionais
                        </h2>
                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-xl p-4 shadow"
                        >
                            <img
                                src="https://api.builder.io/api/v1/image/assets/TEMP/ca7f8883f98949dc5843cac8c53ac749ea844887?width=96"
                                alt="User avatar"
                                className="w-12 h-12 rounded-xl"
                            />
                            <input
                                type="text"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Compartilhe sua dica ou opinião sobre o jogo"
                                className="flex-1 p-3 rounded-xl bg-[#FEF9E5] text-[#BB9205] text-sm md:text-base font-medium outline-none"
                            />
                            <button
                                type="submit"
                                className="px-5 py-2 bg-[#FCE699] text-[#2C2623] font-bold rounded-xl hover:bg-[#F0D885] transition"
                            >
                                Publicar
                            </button>
                        </form>
                        {/* Lista de reviews */}
                        <div className="flex flex-col gap-6">
                            {reviews.map((r, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col md:flex-row gap-6 p-4 rounded-xl "
                                >
                                    <div className="flex gap-3 items-center">
                                        <div className="w-12 h-12 bg-[#FBDEB1] rounded-xl" />
                                        <div>
                                            <p className="font-extrabold text-[#2C2623] text-base md:text-lg">
                                                {r.name}
                                            </p>
                                            <p className="text-sm text-[#2C2623]">{r.time}</p>
                                        </div>
                                    </div>
                                    <p className="flex-1 text-[#2C2623] text-sm md:text-lg font-medium">
                                        {r.text}
                                    </p>
                                    <span className="text-[#F7B34D] font-bold">⭐ {r.rating}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default DetalhesJogos;
