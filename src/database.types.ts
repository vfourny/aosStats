export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    CompositeTypes: {
      [_ in never]: never
    },
    Enums: {
      [_ in never]: never
    },
    Functions: {
      [_ in never]: never
    }
    Tables: {
      profiles: {
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
        },
        Row: {
          id: string
          updated_at: string | null
          username: string
        },
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
        }
      }
    },
    Views: {
      [_ in never]: never
    }
  }
}

