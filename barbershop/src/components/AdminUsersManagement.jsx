import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap';
import { fetchData } from '../supabaseService.js';


function UsersManagement() {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const obtenerDatos = async () => {
          setLoading(true);
          const { data, error } = await fetchData('usuario');
                                                              
          if (error) {
            console.error('Error al obtener datos:', error);
            setError('Hubo un error al cargar los datos.');
          } else {
            setDatos(data || []);
          }
          setLoading(false);
        };
    
        obtenerDatos();
      }, []); 

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <Link to="/register"><Button variant="success" className="mb-3">Añadir Nuevo Usuario</Button></Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre de Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(user => (
            <tr key={user.idusuario}>
              <td>{user.idusuario}</td>
              <td>{user.nombreusuario}</td>
              <td>{user.correousuario}</td>
              <td>{user.rolidrol}</td>
              <td>
                <Button variant="primary" size="sm">Editar</Button>{' '}
                <Button variant="danger" size="sm">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UsersManagement;