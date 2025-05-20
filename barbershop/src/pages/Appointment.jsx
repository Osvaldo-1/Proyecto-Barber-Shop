import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient.js';
import { useAuth } from '../context/AuthContext';

function Appointment() {
  const { user } = useAuth();
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [confirmar, setConfirmar] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  // Carga servicios al montar
  useEffect(() => {
    supabase
      .from('servicio')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          setError('Error cargando servicios');
        } else {
          setServicios(data);
        }
      });
  }, []);

  // Función para insertar la cita
  const agendarCita = async () => {
    if (!fecha || !hora || !servicioSeleccionado) {
      setError('Por favor completa todos los campos.');
      return;
    }

    const citaNueva = {
      fechacita: fecha,
      horacita: hora,
      usuarioidusuario: user.idusuario,
      estadoidestado: 1, // pendiente
      servicioidservicio: servicioSeleccionado.idservicio,
    };

    const { error: insertError } = await supabase
      .from('cita')
      .insert([citaNueva]);

    if (insertError) {
      console.error(insertError);
      setError('Error creando cita');
      setExito('');
    } else {
      setExito('Cita creada correctamente');
      setError('');
      setConfirmar(false);
      setFecha('');
      setHora('');
      setServicioSeleccionado(null);
    }
  };

  return (
    <div>
      <h2>Agendar cita</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {exito && <p style={{ color: 'green' }}>{exito}</p>}

      <label>Servicio:</label>
      <select
        value={servicioSeleccionado?.idservicio || ''}
        onChange={e => {
          const id = parseInt(e.target.value, 10);
          setServicioSeleccionado(servicios.find(s => s.idservicio === id) || null);
          setError(''); setExito('');
        }}
      >
        <option value="">-- selecciona un servicio --</option>
        {servicios.map(s => (
          <option key={s.idservicio} value={s.idservicio}>
            {s.nombreservicio}
          </option>
        ))}
      </select>

      {servicioSeleccionado && (
        <div style={{ marginTop: 8 }}>
          <p><strong>Precio:</strong> ${servicioSeleccionado.precio.toFixed(2)}</p>
          <p><strong>Duración:</strong> {servicioSeleccionado.duracionminutos} min</p>
        </div>
      )}

      <label>Fecha:</label>
      <input
        type="date"
        value={fecha}
        onChange={e => { setFecha(e.target.value); setError(''); setExito(''); }}
      />

      <label>Hora:</label>
      <input
        type="time"
        value={hora}
        onChange={e => { setHora(e.target.value); setError(''); setExito(''); }}
      />

      {!confirmar ? (
        <button
          onClick={() => {
            if (!fecha || !hora || !servicioSeleccionado) {
              setError('Completa todos los campos para confirmar');
              return;
            }
            setConfirmar(true);
            setError(''); setExito('');
          }}
        >
          Confirmar datos
        </button>
      ) : (
        <div style={{ border: '1px solid #ccc', padding: 8, marginTop: 8 }}>
          <h3>Confirma tu cita</h3>
          <p><strong>Servicio:</strong> {servicioSeleccionado.nombreservicio}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Hora:</strong> {hora}</p>
          <p><strong>Precio:</strong> ${servicioSeleccionado.precio.toFixed(2)}</p>
          <p><strong>Duración:</strong> {servicioSeleccionado.duracionminutos} min</p>

          <button onClick={agendarCita}>Agendar</button>
          <button onClick={() => setConfirmar(false)} style={{ marginLeft: 8 }}>
            Editar
          </button>
        </div>
      )}
    </div>
  );
}

export default Appointment;
