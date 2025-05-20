import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fetchData, updateData, deleteData } from '../supabaseService';

function AdminUsersManagement() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarUsuarios = async () => {
    setLoading(true);
    const { data, error } = await fetchData('usuario');
    if (!error) setUsuarios(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

const handleEliminar = async (id) => {
  const confirmar = window.confirm('¿Estás seguro de eliminar este usuario?');
  if (!confirmar) return;

  const { error } = await deleteData('usuario', 'idusuario', id);
  if (error) {
    console.error('Error al eliminar:', error);
  } else {
    cargarUsuarios();
  }
};

  const handleEditar = async (usuario) => {
    const nuevoNombre = window.prompt('Nuevo nombre:', usuario.nombreusuario);
    const nuevoCorreo = window.prompt('Nuevo correo:', usuario.correousuario);
    const nuevaContrasena = window.prompt('Nueva contraseña:', usuario.contrasenausuario);

    if (!nuevoNombre || !nuevoCorreo || !nuevaContrasena) return;

    const { error } = await updateData('usuario', 'idusuario', usuario.idusuario, {
      nombreusuario: nuevoNombre,
      correousuario: nuevoCorreo,
      contrasenausuario: nuevaContrasena,
    });

    if (!error) cargarUsuarios();
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => {
            console.log(user); // ← Aquí puedes ver en la consola si hay usuarios con ID faltante o valores extraños
            return (
              <tr key={user.idusuario}>
                <td>{user.idusuario}</td>
                <td>{user.nombreusuario}</td>
                <td>{user.correousuario}</td>
                <td>{user.contrasenausuario}</td>
                <td>{user.rolidrol}</td>
                <td>
                  <Button size="sm" variant="primary" onClick={() => handleEditar(user)}>Editar</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => handleEliminar(user.idusuario)}>Eliminar</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminUsersManagement;
