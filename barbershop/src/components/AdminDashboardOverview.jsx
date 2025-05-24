import { Row, Col, Card } from 'react-bootstrap';

function DashboardOverview() {
  return (
    <div>
      <h2 id="Resumen">Barber Shop Dashboard</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Citas de Hoy</Card.Title>
              <Card.Text className="h3">15</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Nuevos Usuarios</Card.Title>
              <Card.Text className="h3">5</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Ingresos del Mes</Card.Title>
              <Card.Text className="h3">$1,250</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Puedes añadir gráficos o más información aquí */}
    </div>
  );
}

export default DashboardOverview;