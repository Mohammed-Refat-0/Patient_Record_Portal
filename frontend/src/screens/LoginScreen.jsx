import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginAdminMutation } from '../slices/adminApiSlice';
import { useLoginPatientMutation } from '../slices/patientApiSlice';
import { useLoginHcpMutation } from '../slices/hcpApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginAdmin, { isLoading: isLoadingAdmin }] = useLoginAdminMutation();
  const [loginPatient, { isLoading: isLoadingPatient }] = useLoginPatientMutation();
  const [loginHcp, { isLoading: isLoadingHcp }] = useLoginHcpMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'Admin') {
        navigate('/admindashboard');
      } else if (userInfo.role === 'Patient'){
        naviagte('/patientdashboard');
      } 
      else {
        navigate('/');
      }
    }
  }, [userInfo, navigate]);
  
  const handleLogin = async (loginFunc) => {
    try {
      const userData = await loginFunc({ username, password }).unwrap();
      dispatch(setCredentials(userData));
      if (userData.role === 'Admin') {
        navigate('/admindashboard');
      } 
      else if (userData.role === 'Patient') {
        navigate('/patientdashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed');
    }
  };

  const isLoading = isLoadingAdmin || isLoadingPatient || isLoadingHcp;

  return (
    <FormContainer>
      <h1>Log In</h1>
      <Form>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row className='mt-3'>
  <Col>
    <Button
      type='button'
      variant='primary'
      onClick={() => handleLogin(loginAdmin)}
      disabled={isLoading}
      className='w-100 text-nowrap'
    >
      {isLoadingAdmin ? 'Loading...' : 'Login as Admin'}
    </Button>
  </Col>
  <Col>
    <Button
      type='button'
      variant='secondary'
      onClick={() => handleLogin(loginHcp)}
      disabled={isLoading}
      className='w-100 text-nowrap'
    >
      {isLoadingHcp ? 'Loading...' : 'Login as Healthcare Provider'}
    </Button>
  </Col>
  <Col>
    <Button
      type='button'
      variant='success'
      onClick={() => handleLogin(loginPatient)}
      disabled={isLoading}
      className='w-100 text-nowrap'
    >
      {isLoadingPatient ? 'Loading...' : 'Login as Patient'}
    </Button>
  </Col>
</Row>
      </Form>

      <Row className='py-3'>
        <Col>
        Default Admin login credentials: <br></br>
        Username: admin <br></br>
        Password: admin
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
