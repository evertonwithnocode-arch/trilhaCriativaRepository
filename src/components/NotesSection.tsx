import React from "react";
import { Avatar } from "@/components/ui/avatar"; // se não tiver, pode trocar por <img />
import { Button } from "@/components/ui/button";

interface Note {
  id: number;
  text: string;
  date: string;
}

const notes: Note[] = [
  {
    id: 1,
    text: "Progresso excelente em jogos visuais. Mostra maior interesse em atividades colaborativas. Demonstra melhora significativa na concentração e tempo de atenção.",
    date: "Há 1 semana atrás",
  },
  {
    id: 2,
    text: "Excelente para trabalhar memória. Meus pacientes adoram!",
    date: "Há 1 semana atrás",
  },
];

export default function NotesSection() {
  return (
    <div>
      <div className="border border-[#F9EECF] mt-4" />
      <div className="bg-[#FFFCF5] w-[1040px]  p-6 pb-10 mx-auto">
        
        {/* Título */}
        <h2 className="text-xl font-bold text-[#3A3A3A] mb-4">
          Notas e observações
        </h2>
        {/* Campo de input */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm w-full ">
          <Avatar className="w-8 h-8 rounded-full">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="avatar"
              className="rounded-full"
            />
          </Avatar>
          <input
            type="text"
            placeholder="Adicione notas sobre seu paciente"
            className="flex-1 bg-[#FFF9EC] rounded-xl px-4 py-2 text-sm text-[#6B6B6B] outline-none"
          />
          <Button className="bg-[#FCE699] text-gray-800 font-medium px-4 py-1 rounded-xl hover:bg-[#e2b43b]">
            Publicar
          </Button>
        </div>
        {/* Lista de notas */}
        <div className="mt-6 ">
          {notes.map((note, index) => (
            <div key={note.id} className="pt-2 pb-2">
              <div className="flex items-start gap-3">
                {/* Bolinha */}
                <div className="w-8 h-8 rounded-full bg-[#F9DFAF]" />
                {/* Conteúdo */}
                <div className="flex-1 ">
                  <p className="text-sm text-[#3A3A3A] leading-relaxed">
                    {note.text}
                  </p>
                </div>
                {/* Data */}
                <span className="text-xs text-[#6B6B6B] whitespace-nowrap">
                  {note.date}
                </span>
              </div>
              {/* Divider */}
              {index !== notes.length - 1 && (
                <div className="border-t border-[#F9EECF] mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
