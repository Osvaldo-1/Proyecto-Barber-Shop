import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="admin-dashboard">
      <Container fluid className="app-body">
        <Row className="h-100">
          <Col md={2} className="text-light p-3 fixed-left navs">
            <Sidebar />
          </Col>
          <Col md={10} className="p-4 content-area">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminLayout;

