import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useGetPatientQuery, useGetHcpQuery } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';

const SearchScreen = () => {
  const [username, setUsername] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const { data: patientData, error: patientError, refetch: refetchPatient } = useGetPatientQuery({ username }, { skip: searchType !== 'patient' });
  const { data: hcpData, error: hcpError, refetch: refetchHcp } = useGetHcpQuery({ username }, { skip: searchType !== 'hcp' });

  const handleSearch = async (type) => {
    setSearchType(type);
    setSearchResult(null);
    setError('');

    try {
      if (type === 'patient') {
        await refetchPatient();
        if (patientData) {
          setSearchResult(patientData);
        } else if (patientError) {
          setError(patientError.data?.message || 'Failed to fetch patient');
        }
      } else if (type === 'hcp') {
        await refetchHcp();
        if (hcpData) {
          setSearchResult(hcpData);
        } else if (hcpError) {
          setError(hcpError.data?.message || 'Failed to fetch healthcare provider');
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Search failed');
    }
  };

  return (
    <FormContainer>
      <h1>Search User</h1>
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

        <Button
          type='button'
          variant='primary'
          className='mt-3 me-3'
          onClick={() => handleSearch('patient')}
        >
          Search Patient
        </Button>
        <Button
          type='button'
          variant='secondary'
          className='mt-3'
          onClick={() => handleSearch('hcp')}
        >
          Search Healthcare Provider
        </Button>
      </Form>
      {error && <Alert variant='danger' className='mt-3'>{error}</Alert>}
      {searchResult && (
        <div className='mt-3'>
          <h2>Search Result</h2>
          <p><strong>Name:</strong> {searchResult.name}</p>
          <p><strong>Username:</strong> {searchResult.username}</p>
          <p><strong>National ID:</strong> {searchResult.nationalId}</p>
          {searchType === 'hcp' && <p><strong>Title:</strong> {searchResult.title}</p>}
          {searchType === 'patient' && <p><strong>Created By:</strong> {searchResult.createdBy}</p>}
        </div>
      )}
    </FormContainer>
  );
};

export default SearchScreen;
