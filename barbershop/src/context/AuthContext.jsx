// src/context/AuthContext.js
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

    // Verificar sesión activa
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setUser(null);
      return;
    }

    // Obtener idusuario y rolidrol de la tabla usuario
    const { data: userRoleData, error } = await supabase
      .from('usuario')
      .select('idusuario, rolidrol')
      .eq('correousuario', sessionUser.email)
      .single();

    if (error) {
      console.error('Error obteniendo usuario:', error);
      setUser({
        id: sessionUser.id,
        email: sessionUser.email
      });
    } else {
      setUser({
        id: sessionUser.id,
        email: sessionUser.email,
        idusuario: userRoleData.idusuario,
        rol: userRoleData.rolidrol,
      });
    }
  };

  useEffect(() => {
    // Al montar, verificar sesión
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) fetchUserWithRole(session.user);
    });

    // Listener de cambio de estado
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        fetchUserWithRole(session.user);
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
