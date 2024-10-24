import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdmindashboardScreen = () => {
  const navigate = useNavigate();

  return (
    <Container className='py-5'>
      <Row className='justify-content-center'>
        <Col md={8}>
          <Card className='p-5'>
            <h1 className='text-center mb-4'>Admin Dashboard</h1>
            <Row className='mb-3'>
              <Col>
                <Button
                  variant='primary'
                  className='w-100'
                  onClick={() => navigate('/createhcp')}
                >
                  Add New Healthcare Provider
                </Button>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Button
                  variant='secondary'
                  className='w-100'
                  onClick={() => navigate('/createpatient')}
                >
                  Add New Patient
                </Button>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Button
                  variant='info'
                  className='w-100'
                  onClick={() => navigate('/search')}
                >
                  Search an Existing HCPs and Patients
                </Button>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Button
                  variant='danger'
                  className='w-100'
                  onClick={() => navigate('/delete')}
                >
                  Delete an Existing HCPs and Patients
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdmindashboardScreen;
