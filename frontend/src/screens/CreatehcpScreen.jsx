import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateHcpMutation } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';

const CreatehcpScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [title, setTitle] = useState('Doctor');
  const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createHcp, { isLoading }] = useCreateHcpMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createHcp({ name, username, password, nationalId, title }).unwrap();
      setShowSuccess(true);
      toast.success('Healthcare Provider added successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add Healthcare Provider');
    }
  };

  return (
    <FormContainer>
      <h1>Add Healthcare Provider</h1>
      {showSuccess && <Alert variant='success'>Healthcare Provider added successfully</Alert>}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='nationalId'>
          <Form.Label>National ID</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter National ID'
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            as='select'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            <option value='Doctor'>Doctor</option>
            <option value='Nurse'>Nurse</option>
            <option value='Pharmacist'>Pharmacist</option>
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Healthcare Provider'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreatehcpScreen;
