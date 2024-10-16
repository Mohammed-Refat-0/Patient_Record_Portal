import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Home = () => {
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Patient Record Portal Webapp</h1>
          <div className='text-center mb-4'>
            <h4>Webapp to manage patient medical records.</h4>
            <div>
              <strong>Admin:</strong> add and delete healthcare professionals and patients accounts <br />
              <strong>Healthcare professional:</strong> upload and view medical records of patients, such as scans, diagnoses, etc...<br />
              <strong>Patient:</strong> view own medical record
            </div>
          </div>
          <div className='d-flex'>
            <LinkContainer to='/login'>
              <Button variant='primary' className='me-3'>
                Go to LogIn page
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
