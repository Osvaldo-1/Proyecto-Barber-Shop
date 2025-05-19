import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabaseClient.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUserWithRole = async (sessionUser) => {
    if (!sessionUser) {
      setUser(null);
      return;
    }

    // Asegurar que haya sesión real antes de buscar en la DB
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setUser(null);
      return;
    }

    const { data: userRoleData, error } = await supabase
      .from('usuario')
      .select('rolidrol')
      .eq('correousuario', sessionUser.email)
      .single();

    if (error) {
      console.error('Error obteniendo rol:', error);
      setUser(sessionUser); // Al menos guarda al usuario
    } else {
      setUser({ ...sessionUser, rol: userRoleData.rolidrol });
    }
  };

  useEffect(() => {
    // Verificar sesión al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) fetchUserWithRole(session.user);
    });

    // Escuchar cambios reales de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        supabase.auth.getSession().then(({ data }) => {
          if (data.session) fetchUserWithRole(data.session.user);
          else setUser(null);
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
