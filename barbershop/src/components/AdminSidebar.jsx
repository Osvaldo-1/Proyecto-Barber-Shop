import { Nav } from 'react-bootstrap';



function Sidebar() {
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
      </Nav>
    </div>
  );
}

export default Sidebar;
