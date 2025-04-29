import React, { useState } from 'react';
import supabase from '../supabaseClient.js'; // Importa tu cliente de Supabase

function RegistroUsuario() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrando, setRegistrando] = useState(false);
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [error, setError] = useState(null);
  const rol = 2
  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegistrando(true);
    setMensajeRespuesta('');
    setError(null);

    const { data, error } = await supabase.from('usuario').insert([
        { nombreusuario: nombreUsuario, correousuario: email, contrasenausuario: password, rolidrol: rol }
    ]);

    setRegistrando(false);

    if (error) {
      console.error('Error al registrar usuario:', error);
      setError(error.message || 'Hubo un error al registrar la cuenta. Por favor, intenta de nuevo.');
    } else {
      console.log('Usuario registrado correctamente:', data);
      setMensajeRespuesta('Cuenta creada exitosamente. Por favor, revisa tu correo electrónico para verificarla.');
      setNombreUsuario('');
      setEmail('');
      setPassword('');
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