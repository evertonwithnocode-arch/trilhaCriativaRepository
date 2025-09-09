import React from "react";
import { FaRegCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";

interface SessionItem {
  title: string;
  date: string;
  duration: string;
  performance: string;
  status: "Bom" | "Ruim" | "Médio";
}

const statusColors = {
  Bom: "bg-green-100 text-green-700",
  Médio: "bg-yellow-100 text-yellow-700",
  Ruim: "bg-red-100 text-red-700",
};

export const SessionHistory: React.FC = () => {
  // Dados fictícios dentro do próprio componente
  const sessions: SessionItem[] = [
    { title: "Memória visual", date: "25 Jul", duration: "15 min", performance: "85%", status: "Bom" },
    { title: "Atenção concentrada", date: "26 Jul", duration: "20 min", performance: "70%", status: "Médio" },
    { title: "Raciocínio lógico", date: "27 Jul", duration: "25 min", performance: "90%", status: "Bom" },
  ];

  return (
    <div className="max-w-[1040px] mx-auto min-h-[528px]">
      <div className="flex justify-between items-center mb-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800">
          Histórico de sessões
        </h2>
        <select className="bg-[#FFF9F0] w-[248px] h-[48px] border border-yellow-200 rounded-lg px-3 py-1 text-gray-800">
          <option>Geral</option>
        </select>
      </div>
      <div className="p-6 bg-[#FFF9F0] rounded-xl w-full  mx-auto min-h-[528px] border-2 border-yellow-200">

        <div className="space-y-2">
          {sessions.map((session, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-yellow-100 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-xl text-yellow-600">
                  <FaRegCalendarAlt size={20} />
                </div>
                <span className="font-semibold text-gray-800">
                  {session.title}
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-orange-400 font-medium">
                <span className="flex items-center gap-1">
                  <FaRegCalendarAlt className="text-orange-300" /> {session.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock className="text-orange-300" /> {session.duration}
                </span>
                <span className="flex items-center gap-1">📈 {session.performance}</span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold ${statusColors[session.status]
                    }`}
                >
                  {session.status}
                </span>
                <FaArrowRight className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
