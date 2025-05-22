import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import Btn from '../components/Btn.jsx';
import supabase from '../supabaseClient.js';
import { useAuth } from "../context/AuthContext";
import '../Styles/Register.css';

//–––  Expresiones regulares y constantes de validación ––––––––––––––––––
const emailRegex   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;                       // formato e-mail simple
const nameRegex = /^[A-Za-z0-9._-]{1,30}$/; // Letras, números, punto, guion y guion bajo (1-50)
const passRegex    = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*?]{8,}$/;  // ≥8, letras y números (signos opcionales)
const MAX_LENGTH   = 50;
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function RegistroUsuario() {
  const { user } = useAuth();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [rol,           setRol]           = useState('2');
  const [registrando,   setRegistrando]   = useState(false);
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRolChange = (e) => setRol(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistrando(true);
    setMensajeRespuesta('');
    setError(null);

    //––– 1. Validación de datos en cliente ––––––––––––––––––––––
    if (!nameRegex.test(nombreUsuario)) {
      setError('El nombre solo puede contener letras y espacios (máx. 50 caracteres).');
      setRegistrando(false); return;
    }
    if (email.length > MAX_LENGTH || !emailRegex.test(email)) {
      setError('Introduce un correo válido (máx. 50 caracteres).');
      setRegistrando(false); return;
    }
    if (!passRegex.test(password)) {
      setError('La contraseña debe tener mínimo 8 caracteres e incluir letras y números.');
      setRegistrando(false); return;
    }
    //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    try {
      // 2. Crear usuario en Supabase Auth
      const { error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) throw authError;

      // 3. Cerrar sesión para evitar que entre directo
      await supabase.auth.signOut();

      // 4. Insertar datos en la tabla personalizada `usuario`
      const { error: dbError } = await supabase
        .from('usuario')
        .insert([{ 
          nombreusuario: nombreUsuario,
          correousuario: email,
          contrasenausuario: password,
          rolidrol: rol
        }]);
      if (dbError) throw dbError;

      setRegistrando(false);
      setMensajeRespuesta('Cuenta creada exitosamente. Por favor, inicia sesión.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setRegistrando(false);
      setError(err.message || 'Hubo un error al registrar la cuenta.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="container my-3 w-75">
      <h2>Registro</h2>

      <Form.Group className="my-3">
        <Form.Label htmlFor="nombreUsuario">Nombre de Usuario:</Form.Label>
        <Form.Control
          id="nombreUsuario"
          type="text"
          className="p-2"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          maxLength={MAX_LENGTH}
          pattern={nameRegex.source}      // validación HTML extra
          required
        />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className="my-3">
            <Form.Label htmlFor="email">Correo Electrónico:</Form.Label>
            <Form.Control
              id="email"
              type="email"
              className="p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={MAX_LENGTH}
              required
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="my-3">
            <Form.Label htmlFor="password">Contraseña:</Form.Label>
            <Form.Control
              id="password"
              type="password"
              className="p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              // placeholder para guiar al usuario
              placeholder="Mín. 8 caracteres, letras y números"
            />
          </Form.Group>
        </Col>

        {user && (
          <Col>
            <Form.Group className="my-3">
              <Form.Label htmlFor="rol">Rol:</Form.Label>
              <Form.Select
                id="rol"
                className="p-2"
                value={rol}
                onChange={handleRolChange}
              >
                <option value="2">Usuario</option>
                <option value="1">Admin</option>
              </Form.Select>
            </Form.Group>
          </Col>
        )}
      </Row>

      <Btn
        tp="submit"
        text={registrando ? 'Registrando...' : 'Crear usuario'}
        classStyle="btn-color"
        disabled={registrando}
      />

      {mensajeRespuesta && <p className="success">{mensajeRespuesta}</p>}
      {error && <p className="error">{error}</p>}
    </Form>
  );
}

export default RegistroUsuario;
