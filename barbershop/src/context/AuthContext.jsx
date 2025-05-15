import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la redirección
import  supabase  from '../supabaseClient.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

    const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setTimeout(() => {
        navigate('/home'); // Redirige al login
      }, 500); // Espera 30 segundos antes de redirigir
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
