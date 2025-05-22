import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient.js';
import { useAuth } from '../context/AuthContext';

function Appointment() {
  const { user } = useAuth();
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [confirmar, setConfirmar] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  // Cargar servicios al montar
  useEffect(() => {
    supabase
      .from('servicio')
      .select('*')
      .then(({ data, error }) => {
        if (error) setError('Error cargando servicios');
        else setServicios(data);
      });
  }, []);

  // Al cambiar la fecha, obtener horarios ocupados
  useEffect(() => {
    if (fecha) {
      supabase
        .from('cita')
        .select('horacita')
        .eq('fechacita', fecha)
        .then(({ data, error }) => {
          if (!error && data) {
            const ocupadas = data.map(item => item.horacita.slice(0, 5));
            setHorasOcupadas(ocupadas);
          }
        });
    } else {
      setHorasOcupadas([]);
    }
  }, [fecha]);

  // Horas disponibles: 12:00 a 20:30 (en intervalos de 30 mins)
  const generarHoras = () => {
    const horas = [];
    for (let h = 12; h <= 20; h++) {
      horas.push(`${h.toString().padStart(2, '0')}:00`);
      if (h !== 20) horas.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return horas;
  };

  const agendarCita = async () => {
    if (!fecha || !hora || !servicioSeleccionado) {
      setError('Por favor completa todos los campos.');
      return;
    }

    const citaNueva = {
      fechacita: fecha,
      horacita: hora,
      usuarioidusuario: user.idusuario,
      estadoidestado: 1,
      servicioidservicio: servicioSeleccionado.idservicio,
    };

    const { error: insertError } = await supabase
      .from('cita')
      .insert([citaNueva]);

    if (insertError) {
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

  const hoy = new Date().toISOString().split('T')[0];

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
        min={hoy}
        onChange={e => {
          setFecha(e.target.value);
          setHora('');
          setError('');
          setExito('');
        }}
      />

      <label>Hora:</label>
      <select
        value={hora}
        onChange={e => {
          setHora(e.target.value);
          setError('');
          setExito('');
        }}
        disabled={!fecha}
      >
        <option value="">-- selecciona una hora --</option>
        {generarHoras().map(h => (
          <option key={h} value={h} disabled={horasOcupadas.includes(h)}>
            {h} {horasOcupadas.includes(h) ? ' (no disponible)' : ''}
          </option>
        ))}
      </select>

      {!confirmar ? (
        <button
          onClick={() => {
            if (!fecha || !hora || !servicioSeleccionado) {
              setError('Completa todos los campos para confirmar');
              return;
            }
            setConfirmar(true);
            setError('');
            setExito('');
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
