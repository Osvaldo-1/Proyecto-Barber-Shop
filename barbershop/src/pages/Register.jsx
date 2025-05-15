import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import Btn from '../components/Btn.jsx';
import supabase from '../supabaseClient.js';
import { useAuth } from "../context/AuthContext"; // Importamos el contexto
import '../Styles/Register.css'; // Importa tu cliente de Supabase

function RegistroUsuario() {
  const { user } = useAuth();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('2');
  const [registrando, setRegistrando] = useState(false);
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRolChange = (event) => {
    setRol(event.target.value);
  };

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
    <>
    <Form onSubmit={handleSubmit} className='container my-3 w-75'>
      <h2>Registro</h2>
      <Form.Group className='my-3'>
            <Form.Label htmlFor="nombreUsuario">Nombre de Usuario:</Form.Label>
            <Form.Control
              className='p-2'
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required />
          </Form.Group>
      <Row>
        <Col>
          <Form.Group className='my-3'>
            <Form.Label htmlFor="email">Correo Electrónico:</Form.Label>
            <Form.Control 
              className='p-2'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='my-3'>
            <Form.Label htmlFor="password">Contraseña:</Form.Label>
            <Form.Control 
              className='p-2'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </Form.Group>
        </Col>
        {user ? (
          <Col>
          <Form.Group className='my-3'>
            <Form.Label htmlFor="password" >Rol:</Form.Label>
            <Form.Select htmlFor="rol" id="rol" className='p-2' value={rol} onChange={handleRolChange}>
              <option value="2">Usuario</option>
              <option value="1">Admin</option>
            </Form.Select>
          </Form.Group>
        </Col>
        ) : (
          ""
        ) }
        
      </Row>
      <div>
        <Btn tp="submit" text={registrando ? 'Registrando...' : 'Crear usuario'} classStyle="btn-color" disabled={registrando}/>
      </div>
      
      {mensajeRespuesta && <p className="success">{mensajeRespuesta}</p>}
      {error && <p className="error">{error}</p>}
    </Form>
    </>
  );
}

export default RegistroUsuario;