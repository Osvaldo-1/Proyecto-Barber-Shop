import { Container, Row, Col } from 'react-bootstrap';

import Sidebar from '../components/AdminSidebar';
import DashboardOverview from '../components/AdminDashboardOverview';
import AppointmentsList from '../components/AdminAppointmentsList';
import ServicesManagement from '../components/AdminServicesManagement';
import UsersManagement from '../components/AdminUsersManagement';
import Settings from '../components/AdminSettings';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Container fluid className="app-body">
        <Row className="h-100">
          <Col md={2} className="text-light p-3 fixed-left navs">
            <Sidebar />
          </Col>
          <Col md={10} className="p-4 content-area">
            <DashboardOverview />
            <AppointmentsList />
            <ServicesManagement />
            <UsersManagement />
            <Settings />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;