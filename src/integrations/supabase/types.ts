export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.4";
  };
  public: {
    Tables: {
      email_verifications: {
        Row: {
          attempts: number | null;
          code: string;
          created_at: string | null;
          email: string;
          expires_at: string | null;
          id: string;
          used: boolean | null;
          user_id: string | null;
        };
        Insert: {
          attempts?: number | null;
          code: string;
          created_at?: string | null;
          email: string;
          expires_at?: string | null;
          id?: string;
          used?: boolean | null;
          user_id?: string | null;
        };
        Update: {
          attempts?: number | null;
          code?: string;
          created_at?: string | null;
          email?: string;
          expires_at?: string | null;
          id?: string;
          used?: boolean | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      usuarios: {
        Row: {
          id: string;
          nome: string;
          especialidade: string | null;
          email: string;
          telefone: string | null;
          registro_profissional: string | null;
          created_at: string;
          updated_at: string;
          photo_url: string | null;
          plano: string | null;
          id_lider_equipe: string | null;
          dataFimTeste: string | null; // já existente
        };
        Insert: {
          id?: string;
          nome: string;
          especialidade?: string | null;
          email: string;
          telefone?: string | null;
          registro_profissional?: string | null;
          created_at?: string;
          updated_at?: string;
          photo_url?: string | null;
          plano?: string | null;
          id_lider_equipe?: string | null;
          dataFimTeste?: string | null;
        };
        Update: {
          id?: string;
          nome?: string;
          especialidade?: string | null;
          email?: string;
          telefone?: string | null;
          registro_profissional?: string | null;
          created_at?: string;
          updated_at?: string;
          photo_url?: string | null;
          plano?: string | null;
          id_lider_equipe?: string | null;
          dataFimTeste?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "usuarios_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "usuarios_team_leader_fkey";
            columns: ["id_lider_equipe"];
            referencedRelation: "usuarios";
            referencedColumns: ["id"];
          }
        ];
      };
      pacientes: {
        Row: {
          id: string;
          nome: string;
          data_nascimento: string;
          genero: string | null;
          photo_url: string | null;
          nome_responsavel: string | null;
          email_responsavel: string | null;
          diagnostico: string | null;
          profissional_associado: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          data_nascimento: string;
          genero?: string | null;
          photo_url?: string | null;
          nome_responsavel?: string | null;
          email_responsavel?: string | null;
          diagnostico?: string | null;
          profissional_associado: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          data_nascimento?: string;
          genero?: string | null;
          photo_url?: string | null;
          nome_responsavel?: string | null;
          email_responsavel?: string | null;
          diagnostico?: string | null;
          profissional_associado?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pacientes_profissional_associado_fkey";
            columns: ["profissional_associado"];
            referencedRelation: "usuarios";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      usuarios_view: {
        Row: {
          id: string;
          nome: string;
          especialidade: string | null;
          email: string;
          telefone: string | null;
          registro_profissional: string | null;
          created_at: string;
          updated_at: string;
          photo_url: string | null;
          plano: string | null;
          id_lider_equipe: string | null;
          dataFimTeste: string | null;
          dias_restantes: number; // campo calculado da view
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]
