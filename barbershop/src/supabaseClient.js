// Importar la función createClient de Supabase
import { createClient } from '@supabase/supabase-js';

// Reemplazar con tu URL y clave pública de Supabase
const supabaseUrl = 'https://aomgndsiwnnceituinzw.supabase.co'; // Tu URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvbWduZHNpd25uY2VpdHVpbnp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMDgxMzAsImV4cCI6MjA2MDY4NDEzMH0.IcDerXsHIpjIzzYL7hH2VuPRIeyR6nKT9-0V0NnEfC4'; // Tu clave pública (anon key)

// Crear el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;