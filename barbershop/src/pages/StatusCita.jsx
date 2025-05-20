import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient.js';
import { useAuth } from '../context/AuthContext';

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

  if (loading) return <p>Cargando cita…</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;
  if (!cita)   return <p>No tienes citas programadas.</p>;

  return (
    <div>
      <h2>Estado de tu cita</h2>
      <p><strong>Servicio:</strong> {cita.servicioidservicio?.nombreservicio}</p>
      <p><strong>Fecha:</strong> {cita.fechacita}</p>
      <p><strong>Hora:</strong> {cita.horacita}</p>
      <p><strong>Estado:</strong> {cita.estadoidestado?.detalle}</p>
    </div>
  );
}

export default StatusCita;
