// components/AppointmentsList.jsx
import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import {
  fetchCitas,
  insertData,
  updateCita,
  deleteCita
} from '../supabaseService.js';

export default function AppointmentsList() {
  const [datos, setDatos]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Carga inicial y recargas
  const loadDatos = async () => {
    setLoading(true);
    const { data, error } = await fetchCitas();
    if (error) {
      console.error('Error al obtener citas:', error);
      setError('Hubo un error al cargar las citas.');
    } else {
      setDatos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDatos();
  }, []);

  // Crear nueva cita
  const handleCreate = async () => {
    const usuario = window.prompt('ID de usuario:');
    if (!usuario) return;
    const fecha = window.prompt('Fecha (YYYY-MM-DD):');
    if (!fecha) return;
    const hora = window.prompt('Hora (HH:MM:SS):');
    if (!hora) return;

    const { error } = await insertData('cita', {
      usuarioidusuario: parseInt(usuario, 10),
      fechacita: fecha,
      horacita: hora,
      estadoidestado: 1  // en espera
    });
    if (error) {
      console.error('Error creando cita:', error);
      alert('No se pudo crear la cita.');
    } else {
      loadDatos();
    }
  };

  // Reagendar
  const handleEdit = async (apt) => {
    const fech = window.prompt('Nueva fecha (YYYY-MM-DD):', apt.fechacita);
    if (!fech) return;
    const hor = window.prompt('Nueva hora (HH:MM:SS):', apt.horacita);
    if (!hor) return;

    const { error } = await updateCita(apt.idcita, {
      fechacita: fech,
      horacita: hor
    });
    if (error) {
      console.error('Error al reagendar:', error);
      alert('No se pudo reagendar la cita.');
    } else {
      loadDatos();
    }
  };

  // Aceptar
  const handleAccept = async (id) => {
    const { error } = await updateCita(id, { estadoidestado: 2 });
    if (error) {
      console.error('Error al aceptar:', error);
      alert('No se pudo aceptar la cita.');
    } else {
      loadDatos();
    }
  };

  // Rechazar
  const handleReject = async (id) => {
    const { error } = await updateCita(id, { estadoidestado: 3 });
    if (error) {
      console.error('Error al rechazar:', error);
      alert('No se pudo rechazar la cita.');
    } else {
      loadDatos();
    }
  };

  // Eliminar
  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta cita?')) return;
    const { error } = await deleteCita(id);
    if (error) {
      console.error('Error al eliminar:', error);
      alert('No se pudo eliminar la cita.');
    } else {
      loadDatos();
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div>
      <h2 id='Citas'>Lista de Citas</h2>
      <Button variant="success" size="sm" onClick={handleCreate}>
        Crear Nueva Cita
      </Button>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario ID</th>
            <th>Nombre Usuario</th>
            <th>Hora</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(apt => (
            <tr key={apt.idcita}>
              <td>{apt.idcita}</td>
              <td>{apt.usuarioidusuario.idusuario}</td>
              <td>{apt.usuarioidusuario.nombreusuario}</td>
              <td>{apt.horacita}</td>
              <td>{apt.fechacita}</td>
              <td>{apt.estadoidestado.detalle}</td>
              <td>
                <Button size="sm" onClick={() => handleEdit(apt)}>
                  Editar
                </Button>{' '}
                <Button
                  variant="success"
                  size="sm"
                  disabled={apt.estadoidestado.detalle === 'Aceptado'}
                  onClick={() => handleAccept(apt.idcita)}
                >
                  Aceptar
                </Button>{' '}
                <Button
                  variant="warning"
                  size="sm"
                  disabled={apt.estadoidestado.detalle === 'Rechazado'}
                  onClick={() => handleReject(apt.idcita)}
                >
                  Rechazar
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(apt.idcita)}
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
