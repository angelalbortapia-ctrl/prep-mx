/**
 * Tipos generados manualmente (equivalente a `supabase gen types`).
 * Mantener sincronizado con supabase/migrations/.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_id: string | null;
          email: string;
          full_name: string | null;
          exam_target: string | null;
          exam_date: string | null;
          status: string | null;
          xp_total: number | null;
          current_streak_days: number | null;
          last_study_date: string | null;
          exam_tokens: number | null;
          stripe_customer_id: string | null;
          subscription_status: string | null;
          premium_scope: string | null;
          is_premium: boolean;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          clerk_id?: string | null;
          email: string;
          full_name?: string | null;
          exam_target?: string | null;
          exam_date?: string | null;
          status?: string | null;
          xp_total?: number | null;
          current_streak_days?: number | null;
          last_study_date?: string | null;
          exam_tokens?: number | null;
          stripe_customer_id?: string | null;
          subscription_status?: string | null;
          premium_scope?: string | null;
          is_premium?: boolean;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          clerk_id?: string | null;
          email?: string;
          full_name?: string | null;
          exam_target?: string | null;
          exam_date?: string | null;
          status?: string | null;
          xp_total?: number | null;
          current_streak_days?: number | null;
          last_study_date?: string | null;
          exam_tokens?: number | null;
          stripe_customer_id?: string | null;
          subscription_status?: string | null;
          premium_scope?: string | null;
          is_premium?: boolean;
          created_at?: string | null;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          id: string;
          universidad: string;
          materia: string;
          tema: string;
          pregunta: string;
          opciones: Json;
          opcion_correcta: string;
          explicacion: string;
          dificultad: string | null;
          active: boolean | null;
          is_premium: boolean;
          import_key: string | null;
          media: Json;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          universidad: string;
          materia: string;
          tema: string;
          pregunta: string;
          opciones: Json;
          opcion_correcta: string;
          explicacion: string;
          dificultad?: string | null;
          active?: boolean | null;
          is_premium?: boolean;
          import_key?: string | null;
          media?: Json;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          universidad?: string;
          materia?: string;
          tema?: string;
          pregunta?: string;
          opciones?: Json;
          opcion_correcta?: string;
          explicacion?: string;
          dificultad?: string | null;
          active?: boolean | null;
          is_premium?: boolean;
          import_key?: string | null;
          media?: Json;
          created_at?: string | null;
        };
        Relationships: [];
      };
      user_bookmarks: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          materia: string;
          tema: string;
          saved_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id: string;
          materia: string;
          tema: string;
          saved_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          question_id?: string;
          materia?: string;
          tema?: string;
          saved_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_bookmarks_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
        ];
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string | null;
          question_id: string | null;
          exam_session_id: string | null;
          opcion_elegida: string | null;
          is_correct: boolean;
          time_spent_seconds: number | null;
          next_review_at: string | null;
          interval_days: number | null;
          ease_factor: number | null;
          answered_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          question_id?: string | null;
          exam_session_id?: string | null;
          opcion_elegida?: string | null;
          is_correct: boolean;
          time_spent_seconds?: number | null;
          next_review_at?: string | null;
          interval_days?: number | null;
          ease_factor?: number | null;
          answered_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          question_id?: string | null;
          exam_session_id?: string | null;
          opcion_elegida?: string | null;
          is_correct?: boolean;
          time_spent_seconds?: number | null;
          next_review_at?: string | null;
          interval_days?: number | null;
          ease_factor?: number | null;
          answered_at?: string | null;
        };
        Relationships: [];
      };
      exam_draft_sessions: {
        Row: {
          id: string;
          user_id: string;
          exam_session_id: string;
          exam_id: string | null;
          mode: string;
          current_index: number;
          status: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exam_session_id: string;
          exam_id?: string | null;
          mode: string;
          current_index?: number;
          status?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exam_session_id?: string;
          exam_id?: string | null;
          mode?: string;
          current_index?: number;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      exam_answers_draft: {
        Row: {
          id: string;
          user_id: string;
          exam_session_id: string;
          question_id: string;
          opcion_elegida: string | null;
          is_correct: boolean;
          time_spent_seconds: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exam_session_id: string;
          question_id: string;
          opcion_elegida?: string | null;
          is_correct: boolean;
          time_spent_seconds?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exam_session_id?: string;
          question_id?: string;
          opcion_elegida?: string | null;
          is_correct?: boolean;
          time_spent_seconds?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      exams: {
        Row: {
          id: string;
          name: string;
          universidad: string;
          area: string | null;
          total_questions: number | null;
          duration_mins: number | null;
          active: boolean | null;
        };
        Insert: {
          id?: string;
          name: string;
          universidad: string;
          area?: string | null;
          total_questions?: number | null;
          duration_mins?: number | null;
          active?: boolean | null;
        };
        Update: {
          id?: string;
          name?: string;
          universidad?: string;
          area?: string | null;
          total_questions?: number | null;
          duration_mins?: number | null;
          active?: boolean | null;
        };
        Relationships: [];
      };
      study_plans: {
        Row: {
          id: string;
          user_id: string | null;
          exam_target: string;
          exam_date: string;
          plan_data: Json;
          completion_pct: number | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          exam_target: string;
          exam_date: string;
          plan_data: Json;
          completion_pct?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          exam_target?: string;
          exam_date?: string;
          plan_data?: Json;
          completion_pct?: number | null;
        };
        Relationships: [];
      };
      user_course_state: {
        Row: {
          user_id: string;
          current_lesson_id: string | null;
          just_completed_lesson_id: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          current_lesson_id?: string | null;
          just_completed_lesson_id?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          current_lesson_id?: string | null;
          just_completed_lesson_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_course_state_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      user_lessons_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          checked_steps: Json;
          active_step_index: number;
          completed_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          completed?: boolean;
          checked_steps?: Json;
          active_step_index?: number;
          completed_at?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          completed?: boolean;
          checked_steps?: Json;
          active_step_index?: number;
          completed_at?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_lessons_progress_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type DbQuestionRow = Database['public']['Tables']['questions']['Row'];
export type DbUserRow = Database['public']['Tables']['users']['Row'];
export type DbBookmarkRow = Database['public']['Tables']['user_bookmarks']['Row'];
export type DbUserLessonProgressRow = Database['public']['Tables']['user_lessons_progress']['Row'];
export type DbUserCourseStateRow = Database['public']['Tables']['user_course_state']['Row'];
