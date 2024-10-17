import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch } from 'react-redux';
import { useDeletePatientMutation, useDeleteHcpMutation } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';

const DeleteScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const [deletePatient, { isLoading: isLoadingPatient }] = useDeletePatientMutation();
  const [deleteHcp, { isLoading: isLoadingHcp }] = useDeleteHcpMutation();

  const handleDeletePatient = async (e) => {
    e.preventDefault();
    try {
      await deletePatient({ username, password }).unwrap();
      setShowSuccess(true);
      setSuccessMessage('Patient deleted successfully');
      toast.success('Patient deleted successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete patient');
    }
  };

  const handleDeleteHcp = async (e) => {
    e.preventDefault();
    try {
      await deleteHcp({ username, password }).unwrap();
      setShowSuccess(true);
      setSuccessMessage('Healthcare Provider deleted successfully');
      toast.success('Healthcare Provider deleted successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete healthcare provider');
    }
  };

  return (
    <FormContainer>
      <h1>Delete User</h1>
      {showSuccess && <Alert variant='success'>{successMessage}</Alert>}
      <Form>
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

        <Button
          type='button'
          variant='danger'
          className='mt-3 me-3'
          onClick={handleDeletePatient}
          disabled={isLoadingPatient}
        >
          {isLoadingPatient ? 'Deleting...' : 'Delete Patient'}
        </Button>
        <Button
          type='button'
          variant='danger'
          className='mt-3'
          onClick={handleDeleteHcp}
          disabled={isLoadingHcp}
        >
          {isLoadingHcp ? 'Deleting...' : 'Delete Healthcare Provider'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default DeleteScreen;
