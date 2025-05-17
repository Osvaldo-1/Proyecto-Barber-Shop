import { NavLink } from 'react-router-dom';

function AdminSidebar() {
  return (
    <nav className="d-flex flex-column">
      <NavLink to="/admin" end className="mb-2">Dashboard</NavLink>
      <NavLink to="/admin/appointments" className="mb-2">Citas</NavLink>
      <NavLink to="/admin/services" className="mb-2">Servicios</NavLink>
      <NavLink to="/admin/users" className="mb-2">Usuarios</NavLink>
      <NavLink to="/admin/settings" className="mb-2">Configuración</NavLink>
    </nav>
  );
}

export default AdminSidebar;
