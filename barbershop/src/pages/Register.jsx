import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient.js';
import '../Styles/Register.css'; // Importa tu cliente de Supabase

function RegistroUsuario() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrando, setRegistrando] = useState(false);
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const rol = 2; // Cliente por defecto

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegistrando(true);
    setMensajeRespuesta('');
    setError(null);

    try {
      // 1. Crear usuario en Supabase Auth
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      await supabase.auth.signOut();

      // 2. Insertar datos en la tabla personalizada `usuario`
      const { error: dbError } = await supabase.from('usuario').insert([
        { nombreusuario: nombreUsuario, correousuario: email, contrasenausuario: password, rolidrol: rol }
      ]);

      if (dbError) throw dbError;

      setRegistrando(false);
      setMensajeRespuesta('Cuenta creada exitosamente. Por favor, inicia sesión.');

      setTimeout(() => {
        navigate('/login'); // Redirige al login
      }, 2000); // Espera 2 segundos antes de redirigir
    } catch (err) {
      setRegistrando(false);
      setError(err.message || 'Hubo un error al registrar la cuenta.');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
        <input
          type="text"
          id="nombreUsuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={registrando}>
        {registrando ? 'Registrando...' : 'Registrar Cuenta'}
      </button>

      {mensajeRespuesta && <p className="success">{mensajeRespuesta}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default RegistroUsuario;