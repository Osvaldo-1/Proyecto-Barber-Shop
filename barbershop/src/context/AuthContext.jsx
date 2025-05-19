import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabaseClient.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Función para obtener el rol del usuario y guardar todo junto
    const fetchUserWithRole = async (sessionUser) => {
      if (!sessionUser) {
        setUser(null);
        return;
      }
      // Consultar la tabla usuario para obtener el rol
      const { data: userRoleData, error } = await supabase
        .from('usuario')
        .select('rolidrol')
        .eq('correousuario', sessionUser.email)
        .single();

      if (error) {
        console.error('Error obteniendo rol:', error);
        // Guardamos al usuario aunque sin rol para no bloquear
        setUser(sessionUser);
      } else {
        // Guardamos el usuario junto con su rol
        setUser({ ...sessionUser, rol: userRoleData.rolidrol });
      }
    };

    // Obtener sesión inicial y obtener rol
    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchUserWithRole(session?.user || null);
    });

    // Escuchar cambios de sesión (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchUserWithRole(session?.user || null);
    });

    return () => {
      if (listener?.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
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
