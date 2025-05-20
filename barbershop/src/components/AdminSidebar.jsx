import { Nav } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; 



function Sidebar() {
    const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };
  return (
    <div className="sidebar">
      <h5 className="mb-3 bg">Navegación</h5>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link href="#" className='text-light'><span className='status'>Resumen</span></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className='text-light'><span className='status'>Citas</span></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className='text-light'><span className='status'>Servicios</span></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className='text-light'><span className='status'>Usuarios</span></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className='text-light'><span className='status'>Configuración</span></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className='text-light'><span className='status'>Comentarios</span></Nav.Link>
        </Nav.Item>
        {/* Botón de Cerrar Sesión */}
        <Nav.Item className="mt-4">
          <Nav.Link onClick={handleLogout} className='text-danger'>
            <span className='status'>Cerrar Sesión</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
