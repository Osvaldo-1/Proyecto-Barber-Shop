import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importando el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Para la redirección
import  supabase  from '../supabaseClient.js'; // Importando la configuración de Supabase

const Login = () => {
  const { setUser } = useAuth(); // Para almacenar el usuario en el contexto
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Autenticación con Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Obtener el rol del usuario desde la base de datos
      const { data: userRoleData, error: roleError } = await supabase
        .from('usuario')
        .select('rolidrol')
        .eq('correousuario', email)
        .single();

      if (roleError) throw roleError;

      // Establecer el usuario en el contexto
      setUser(data.user);

      // Redirigir según el rol
      if (userRoleData.rolidrol === 1) {
        // Redirigir a la vista de admin
        navigate('/adminhome');
      } else {
        // Redirigir a la vista de cliente
        navigate('/home');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Iniciar sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
