import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useCreatePatientMutation } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';

const CreatePatientScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [gender, setGender] = useState('male');
  const [dateOfBirth, setDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [createPatient, { isLoading }] = useCreatePatientMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createPatient({ name, username, password, nationalId, gender, dateOfBirth }).unwrap();
      setShowSuccess(true);
      toast.success('Patient added successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add patient');
    }
  };

  return (
    <FormContainer>
      <h1>Add Patient</h1>
      {showSuccess && <Alert variant='success'>Patient added successfully</Alert>}
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

        <Form.Group className='my-2' controlId='gender'>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as='select'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='dateOfBirth'>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Date of Birth'
            value={dateOfBirth}
            onChange={(e) => setDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Patient'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreatePatientScreen;
