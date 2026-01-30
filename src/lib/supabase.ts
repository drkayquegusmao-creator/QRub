import { createClient } from '@supabase/supabase-js'

// Supabase credentials with valid fallback for development
// Using a valid URL format to prevent SDK errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
    return process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('xyzcompany')
}

if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not configured. Using mock mode. Add credentials to .env.local to enable Supabase.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
})

// Database Types
export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string
                    name: string
                    role: 'MASTER' | 'ALUNO' | 'VISITANTE'
                    plan_level: 'FREE' | 'PREMIUM' | 'INSANO'
                    profile_completed: boolean
                    rg: string | null
                    address: string | null
                    phone: string | null
                    institution: string | null
                    graduation_year: string | null
                    specialty_of_interest: string | null
                    streak: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    email: string
                    name: string
                    role?: 'MASTER' | 'ALUNO' | 'VISITANTE'
                    plan_level?: 'FREE' | 'PREMIUM' | 'INSANO'
                    profile_completed?: boolean
                    rg?: string | null
                    address?: string | null
                    phone?: string | null
                    institution?: string | null
                    graduation_year?: string | null
                    specialty_of_interest?: string | null
                    streak?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    email?: string
                    name?: string
                    role?: 'MASTER' | 'ALUNO' | 'VISITANTE'
                    plan_level?: 'FREE' | 'PREMIUM' | 'INSANO'
                    profile_completed?: boolean
                    rg?: string | null
                    address?: string | null
                    phone?: string | null
                    institution?: string | null
                    graduation_year?: string | null
                    specialty_of_interest?: string | null
                    streak?: number
                    updated_at?: string
                }
            }
        }
    }
}
