import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fetchData } from '../supabaseService.js';

function AppointmentsList() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
      const obtenerDatos = async () => {
        setLoading(true);
        const { data, error } = await fetchData('cita');
                                                            
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
      <h2>Lista de Citas</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Hora</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(appointment => (
            <tr key={appointment.idcita}>
              <td>{appointment.idcita}</td>
              <td>{appointment.usuarioidusuario}</td>
              <td>{appointment.horacita}</td>
              <td>{appointment.fechacita}</td>
              <td>{appointment.estadoidestado}</td>
              <td>
                <Button variant="primary" size="sm">Editar</Button>{' '}
                <Button variant="danger" size="sm">Cancelar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AppointmentsList;