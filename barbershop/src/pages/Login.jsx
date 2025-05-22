import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importando el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Para la redirección
import { Form, Row } from 'react-bootstrap';
import  supabase  from '../supabaseClient.js'; // Importando la configuración de Supabase
import Btn from '../components/Btn.jsx';

const Login = () => {
  const { setUser } = useAuth(); // Para almacenar el usuario en el contexto
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Traer el rol de la tabla usuario (campo se llama 'rolidrol')
    const { data: userRoleData, error: roleError } = await supabase
      .from('usuario')
      .select('rolidrol')
      .eq('correousuario', email)
      .single();

    if (roleError) throw roleError;

    console.log("Usuario autenticado (Supabase):", data.user);
    console.log("Rol obtenido desde la base de datos:", userRoleData.rolidrol);

    // Guardar usuario con rol en el contexto para poder usarlo después
    const fullUser = {
      ...data.user,
      rol: userRoleData.rolidrol,  // aquí mapeas el nombre correcto
    };
    setUser(fullUser);

    // Redirigir según rol
    if (userRoleData.rolidrol === 1) {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div className="d-flex justify-content-center align-content-center">
      <div className='w-50'>
        <Form onSubmit={handleLogin} className='container my-3'>
        <h2>Iniciar sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <Row>
          <Form.Group>
            <Form.Label >Correo</Form.Label>
            <Form.Control 
              className='p-2'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
              className='p-2'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </Form.Group>
        </Row>
        <Btn tp="submit" text="Login" classStyle="btn-color"/>
      </Form>
      </div>
      
      
    </div>
  );
};

export default Login;