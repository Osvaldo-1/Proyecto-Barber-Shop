// components/ServicesManagement.jsx
import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import {
  fetchData,
  insertData,
  updateData,
  deleteData
} from '../supabaseService.js';

export default function ServicesManagement() {
  const [datos, setDatos]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // — Carga inicial y recargas —
  const loadDatos = async () => {
    setLoading(true);
    const { data, error } = await fetchData('servicio');
    if (error) {
      console.error('Error al obtener servicios:', error);
      setError('Hubo un error al cargar los servicios.');
    } else {
      setDatos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDatos();
  }, []);

  // — Crear nuevo servicio —
  const handleCreate = async () => {
    const nombre = window.prompt('Nombre del servicio:');
    if (!nombre) return;
    const descripcion = window.prompt('Descripción:') || '';
    const precioStr   = window.prompt('Precio (ej. 250.00):');
    if (!precioStr) return;
    const durStr      = window.prompt('Duración en minutos:') || '0';
    const imagenURL   = window.prompt('URL de la imagen:') || '';

    const precio = parseFloat(precioStr);
    const duracion = parseInt(durStr, 10);

    const { error } = await insertData('servicio', {
      nombreservicio: nombre,
      descripcion,
      precio,
      duracionminutos: duracion,
      imagen: imagenURL
    });
    if (error) {
      console.error('Error creando servicio:', error);
      alert('No se pudo crear el servicio.');
    } else {
      loadDatos();
    }
  };

  // — Editar servicio —
  const handleEdit = async (svc) => {
    const nombre = window.prompt('Nombre del servicio:', svc.nombreservicio);
    if (nombre === null) return;
    const descripcion = window.prompt('Descripción:', svc.descripcion) ?? svc.descripcion;
    const precioStr   = window.prompt('Precio (ej. 250.00):', svc.precio.toString());
    if (precioStr === null) return;
    const durStr      = window.prompt('Duración en minutos:', svc.duracionminutos?.toString() || '0');
    if (durStr === null) return;
    const imagenURL   = window.prompt('URL de la imagen:', svc.imagen || '') ?? svc.imagen;

    const precio = parseFloat(precioStr);
    const duracion = parseInt(durStr, 10);

    const { error } = await updateData(
      'servicio',
      'idservicio',
      svc.idservicio,
      {
        nombreservicio: nombre,
        descripcion,
        precio,
        duracionminutos: duracion,
        imagen: imagenURL
      }
    );
    if (error) {
      console.error('Error editando servicio:', error);
      alert('No se pudo guardar los cambios.');
    } else {
      loadDatos();
    }
  };

  // — Eliminar servicio —
  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este servicio?')) return;
    const { error } = await deleteData('servicio', 'idservicio', id);
    if (error) {
      console.error('Error eliminando servicio:', error);
      alert('No se pudo eliminar el servicio.');
    } else {
      loadDatos();
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div>
      <h2 id='Servicios'>Gestión de Servicios</h2>
      <Button variant="success" className="mb-3" onClick={handleCreate}>
        Añadir Nuevo Servicio
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre del Servicio</th>
            <th>Descripción</th>
            <th>Duración (min)</th>
            <th>Precio</th>
            <th>Imagen</th>
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
                {service.imagen
                  ? <img src={service.imagen} alt="" style={{ height: 40 }} />
                  : '—'
                }
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEdit(service)}
                >
                  Editar
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(service.idservicio)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
