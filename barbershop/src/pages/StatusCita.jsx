import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient.js';
import { useAuth } from '../context/AuthContext';
import "../Styles/Status.css";

function StatusCita() {
  const { user } = useAuth();
  const [cita, setCita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarCita() {
      setLoading(true);
      const { data, error: selectError } = await supabase
        .from('cita')
        .select(`
          idcita,
          fechacita,
          horacita,
          estadoidestado (detalle),
          servicioidservicio (nombreservicio)
        `)
        .eq('usuarioidusuario', user.idusuario)
        .order('fechacita', { ascending: false })
        .limit(1)
        .single();

      if (selectError) {
        console.error(selectError);
        setError('No se pudo cargar tu cita');
        setCita(null);
      } else {
        setCita(data);
      }
      setLoading(false);
    }

    cargarCita();
  }, [user]);

const getEstadoClase = (estado) => {
  const limpio = (estado || '').trim().toLowerCase();

  switch (limpio) {
    case 'en espera':
      return 'estado-espera';
    case 'aceptado':
      return 'estado-aceptado';
    case 'rechazado':
      return 'estado-rechazado';
    case 'reagendado':
      return 'estado-reagendado';
    default:
      return 'estado-desconocido';
  }
};

  if (loading) return <p className="mensaje">Cargando cita…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!cita) return <p className="mensaje">No tienes citas programadas.</p>;

  return (
    <div className="cita-container">
      <div className="cita-card">
        <h2>Estado de tu cita</h2>
        <p><strong>Servicio:</strong> {cita.servicioidservicio?.nombreservicio}</p>
        <p><strong>Fecha:</strong> {cita.fechacita}</p>
        <p><strong>Hora:</strong> {cita.horacita}</p>
        <p>
          <strong>Estado:</strong>{' '}
          <span className={`estado ${getEstadoClase(cita.estadoidestado?.detalle)}`}>
            {cita.estadoidestado?.detalle}
          </span>
        </p>
      </div>
    </div>
  );
}

export default StatusCita;
