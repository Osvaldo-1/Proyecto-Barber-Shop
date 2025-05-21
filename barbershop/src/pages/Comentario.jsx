import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';
import "../Styles/Comentario.css";

export function Comentario() {
  const { user } = useAuth();
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerComentarios();
  }, []);

  const obtenerComentarios = async () => {
    setCargando(true);
    const { data, error } = await supabase
      .from('comentario')
      .select(`
        idcomentario,
        descripcioncomentario,
        fecha,
        usuario:usuarioidusuario (
          nombreusuario
        )
      `)
      .order('fecha', { ascending: false });

    if (!error) setComentarios(data);
    setCargando(false);
  };

  const enviarComentario = async (e) => {
    e.preventDefault();

    if (!nuevoComentario.trim()) return;

    const { data: usuarioData, error: userError } = await supabase
      .from('usuario')
      .select('idusuario')
      .eq('correousuario', user.email)
      .single();

    if (userError) {
      alert('Error al obtener datos de usuario');
      return;
    }

    const { error } = await supabase.from('comentario').insert([
      {
        descripcioncomentario: nuevoComentario,
        usuarioidusuario: usuarioData.idusuario,
      },
    ]);

    if (!error) {
      setNuevoComentario('');
      obtenerComentarios();
    } else {
      alert('Error al enviar comentario');
    }
  };

  return (
    <div className="comentarios-container">
      <h3 className='comen2'>Sube un comentario!!!</h3>
      <h2 className='comen'>Comentarios de Clientes</h2>

      {user ? (
        <form onSubmit={enviarComentario} className="formulario-comentario">
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="Escribe tu comentario..."
            required
          />
          <button type="submit">Enviar</button>
        </form>
      ) : (
        <p>Inicia sesión para dejar un comentario.</p>
      )}

      <div className="lista-comentarios">
        {cargando ? (
          <p>Cargando comentarios...</p>
        ) : comentarios.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comentarios.map((c) => (
            <div key={c.idcomentario} className="comentario">
              <p>
                <strong>{c.usuario?.nombreusuario || 'Anónimo'}</strong>{' '}
                <small>{new Date(c.fecha).toLocaleString()}</small>
              </p>
              <p>{c.descripcioncomentario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
