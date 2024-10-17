import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useGetPatientQuery, useGetHcpQuery } from '../slices/adminApiSlice';

const SearchScreen = () => {
  const [username, setUsername] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const { data: patientData, error: patientError, refetch: refetchPatient } = useGetPatientQuery({ username }, { skip: searchType !== 'patient' });
  const { data: hcpData, error: hcpError, refetch: refetchHcp } = useGetHcpQuery({ username }, { skip: searchType !== 'hcp' });

  useEffect(() => {
    if (searchType === 'patient' && patientData) {
      setSearchResult(patientData);
    } else if (searchType === 'hcp' && hcpData) {
      setSearchResult(hcpData);
    } else if (searchType === 'patient' && patientError) {
      setError(patientError.data?.message || 'An error occurred');
    } else if (searchType === 'hcp' && hcpError) {
      setError(hcpError.data?.message || 'An error occurred');
    }
  }, [searchType, patientData, hcpData, patientError, hcpError]);

  const handleSearch = (type) => {
    setSearchType(type);
    setSearchResult(null);
    setError('');

    if (type === 'patient') {
      refetchPatient();
    } else if (type === 'hcp') {
      refetchHcp();
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Search</h1>
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
            <Button variant='primary' className='mt-3' onClick={() => handleSearch('patient')}>
              Search Patient
            </Button>
            <Button variant='secondary' className='mt-3 ms-3' onClick={() => handleSearch('hcp')}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default SearchScreen;
