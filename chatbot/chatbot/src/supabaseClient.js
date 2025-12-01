


/**
 * supabaseClient: Inicializa y exporta el cliente de Supabase.
 * NOTA: la `supabaseKey` está en texto plano aquí para propósitos de desarrollo,
 * se recomienda usar variables de entorno en producción.
 */
// src/supabaseClient.js (o donde inicialices Supabase)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
