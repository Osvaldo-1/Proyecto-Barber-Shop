import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fetchData } from '../supabaseService.js';

function ServicesManagement() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
      const obtenerDatos = async () => {
        setLoading(true);
        const { data, error } = await fetchData('servicio');
                                                            
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
      <h2>Gestión de Servicios</h2>
      <Button variant="success" className="mb-3">Añadir Nuevo Servicio</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre del Servicio</th>
            <th>Descripción</th>
            <th>Duración</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(service => (
            <tr key={service.idservicio}>
              <td>{service.idservicio}</td>
              <td>{service.nombreservicio}</td>
              <td>{service.descripcion}</td>
              <td>{service.duracionminutos}</td>
              <td>{service.precio}</td>
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

export default ServicesManagement;