import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { AppSidebar } from "@/components/AppSideBar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex w-full min-h-screen relative overflow-hidden bg-[#FFFCF2]">
      

      <div className="z-0 absolute bottom-0 w-full ">
        <div className="min-w-[1000px] h-[850px]  bg-[#FEF2CC] flex justify-between items-start overflow-hidden "></div>

        {/* Círculos da esquerda */}
        <div className="flex absolute left-0 bottom-[800px] gap-4 sm:pl-8 md:pl-[25px] lg:pl-[100px] xl:pl-[70px]">
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div>
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div>
        </div>

        {/* Círculos da direita */}
        <div className="flex absolute right-0 bottom-[800px] gap-4">
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div>
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div>
          <div className="w-[80px] h-[80px] bg-[#FEF2CC] rounded-full"></div>
        </div>
      </div>
      <AppSidebar />

      <div className="relative z-10 w-full font-sans text-gray-800 px-4 sm:px-8 md:px-16 lg:px-40">



        {/* Header */}
        <header className="pt-12 pb-20 md:pb-40">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">Olá, Maria!</h1>
              <p className="text-gray-500 text-base md:text-lg mt-1">
                Acompanhe o progresso dos seus pacientes
              </p>
            </div>

            <button className="flex items-center justify-between w-full sm:w-[336px] h-[56px] px-4 bg-white rounded-2xl border-2 border-[#FBDEB1] font-bold shadow-sm">
              <div className="flex gap-2 items-center">
                <img src="/raio.png" alt="iniciar" className="w-6 h-6" />
                Últimos 3 dias de teste
              </div>
              <ChevronRight color="#f5dc81" strokeWidth={3} size={22} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 w-full h-16 bg-white px-4 rounded-2xl border-2 border-[#FEF2CC] shadow-[0_3px_0_0_#FEF2CC] hover:shadow-[0_5px_0_0_#FEF2CC]">
              <div className="bg-[#CCEDEF] h-10 w-10 rounded-xl flex items-center justify-center">
                <img src="/iconStreaming.png" alt="iniciar" className="w-5 h-5" />
              </div>
              Iniciar sessão
            </button>

            <button className="flex items-center gap-3 w-full h-16 bg-white px-4 rounded-2xl border-2 border-[#FEF2CC] shadow-[0_3px_0_0_#FEF2CC] hover:shadow-[0_5px_0_0_#FEF2CC]">
              <div className="bg-[#D7F0DF] h-10 w-10 rounded-xl flex items-center justify-center">
                <img src="/iconSmile.png" alt="paciente" className="w-5 h-5" />
              </div>
              Adicionar paciente
            </button>

            <button className="flex items-center gap-3 w-full h-16 bg-white px-4 rounded-2xl border-2 border-[#FEF2CC] shadow-[0_3px_0_0_#FEF2CC] hover:shadow-[0_5px_0_0_#FEF2CC]">
              <div className="bg-[#FAD2E1] h-10 w-10 rounded-xl flex items-center justify-center">
                <img src="/iconGraph.png" alt="relatório" className="w-5 h-5" />
              </div>
              Gerar relatório
            </button>

            <button className="flex items-center gap-3 w-full h-16 bg-white px-4 rounded-2xl border-2 border-[#FEF2CC] shadow-[0_3px_0_0_#FEF2CC] hover:shadow-[0_5px_0_0_#FEF2CC]">
              <div className="bg-[#FEF2CC] h-10 w-10 rounded-xl flex items-center justify-center">
                <img src="/iconMedal.png" alt="conquistas" className="w-5 h-5" />
              </div>
              Ver conquistas
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col justify-between p-6 h-[232px] bg-white rounded-3xl border-2 border-[#FBDEB1] shadow-[0_3px_0_0_#FFE0B2]">
            <div className="flex justify-between">
              <p className="text-[#2C2623] text-lg font-extrabold">Pacientes cadastrados</p>
              <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full border-4 border-[#FEF9E5]">
                <img src="/face-smile.png" alt="pacientes" className="w-8 h-8" />
              </div>
            </div>
            <p className="text-[#2C2623] text-5xl md:text-7xl font-extrabold">48</p>
          </div>

          <div className="flex flex-col justify-between p-6 h-[232px] bg-white rounded-3xl border-2 border-[#FBDEB1] shadow-[0_3px_0_0_#FFE0B2]">
            <div className="flex justify-between">
              <p className="text-[#2C2623] text-lg font-extrabold">Sessões realizadas</p>
              <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full border-4 border-[#FEF9E5]">
                <img src="/calendar.png" alt="sessões" className="w-8 h-8" />
              </div>
            </div>
            <p className="text-[#2C2623] text-4xl md:text-6xl font-extrabold">56</p>
          </div>

          <div className="flex flex-col justify-between p-6 h-[232px] bg-white rounded-3xl border-2 border-[#FBDEB1] shadow-[0_3px_0_0_#FFE0B2]">
            <div className="flex justify-between">
              <p className="text-[#2C2623] text-lg font-extrabold">Média por paciente</p>
              <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full border-4 border-[#FEF9E5]">
                <img src="/chart.png" alt="média" className="w-8 h-8" />
              </div>
            </div>
            <p className="text-[#2C2623] text-4xl md:text-6xl font-extrabold">7,2</p>
          </div>
        </section>

        {/* Últimas sessões */}
        <section className="mt-10">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <h2 className="text-[#2C2623] text-2xl font-extrabold">Últimas sessões</h2>
            <div className="flex gap-2 self-end">
              <button className="bg-[#FCE699] flex justify-center items-center h-10 w-10 rounded-full shadow-sm">
                <ChevronLeft size={20} />
              </button>
              <button className="bg-[#FCE699] flex justify-center items-center h-10 w-10 rounded-full shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 overflow-x-auto pb-2">
            <div className="flex min-w-[280px] sm:min-w-[336px] h-24 items-center gap-5 bg-white p-4 rounded-3xl border-2 border-[#FBDEB1] shadow-[0_3px_0_0_#FFE0B2]">
              <div className="w-16 h-16 flex justify-center items-center">
                <img src="/ana.png" alt="Ana" className="w-10 h-10 rounded-full" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="text-[#2C2623] text-lg font-extrabold">Ana Alice</p>
                  <span className="text-sm font-bold bg-white px-2 py-0.5 rounded-full border border-[#E8E5E3]">
                    11
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 text-sm font-medium">Excelente</span>
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jogos mais populares */}
        <section className="mt-10 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[#2C2623] text-2xl font-extrabold">Jogos mais populares</h2>
            <button className="w-full sm:w-[115px] h-10 text-sm font-bold text-gray-600 bg-[#FCE699] px-4 rounded-xl">
              Ver galeria
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full max-w-[160px] aspect-square bg-white p-6 rounded-3xl border-2 border-[#FBDEB1] shadow-[0_3px_0_0_#FFE0B2]">
                  <img
                    src={`/jogo${i + 1}.png`}
                    alt={`Jogo ${i + 1}`}
                    className="w-14 h-14"
                  />
                </div>
                <p className="font-bold text-center mt-2 text-sm sm:text-base">
                  {[
                    "Memória Visual",
                    "Sequências lógicas",
                    "Reconhecimento emocional",
                    "Coordenação motora",
                    "Histórias interativas",
                    "Quebra-cabeças",
                  ][i]}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
