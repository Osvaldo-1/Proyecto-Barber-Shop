import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fetchComentarios, updateComentario, deleteComentario } from '../supabaseService';

function CommentsManagement() {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarComentarios = async () => {
    setLoading(true);
    const { data, error } = await fetchComentarios();
    if (!error) setComentarios(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarComentarios();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este comentario?')) return;

    const { error } = await deleteComentario(id);
    if (!error) cargarComentarios();
  };

  const handleEditar = async (comentario) => {
    const nuevaDescripcion = window.prompt('Editar comentario:', comentario.descripcioncomentario);
    if (!nuevaDescripcion) return;

    const { error } = await updateComentario(comentario.idcomentario, {
      descripcioncomentario: nuevaDescripcion,
    });

    if (!error) cargarComentarios();
  };

  if (loading) return <p>Cargando comentarios...</p>;

  return (
    <div>
      <h2>Gestión de Comentarios</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
<tbody>
  {comentarios.map((c) => (
    <tr key={c.idcomentario}>
      <td>{c.idcomentario}</td>
      <td>{c.descripcioncomentario}</td>
      <td>{c.usuarioidusuario?.idusuario}</td> {/* ID del usuario */}
      <td>{c.usuarioidusuario?.nombreusuario}</td> {/* Nombre del usuario */}
      <td>
        <Button size="sm" variant="primary" onClick={() => handleEditar(c)}>
          Editar
        </Button>{' '}
        <Button size="sm" variant="danger" onClick={() => handleEliminar(c.idcomentario)}>
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

export default CommentsManagement;
