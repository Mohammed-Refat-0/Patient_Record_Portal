import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetPatientFromPatientQuery, useGetFileQuery } from '../slices/patientApiSlice';
import { Container, Row, Col, Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../components/styles.css';

const ScrollableList = ({ items, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  if (!items || items.length === 0) {
    return <ListGroup.Item>N/A</ListGroup.Item>;
  }

  return (
    <div className="scrollable-list">
      <Button variant="secondary" size="sm" onClick={handlePrev} disabled={items.length <= 1}>
        &lt;
      </Button>
      {renderItem(items[currentIndex])}
      <Button variant="secondary" size="sm" onClick={handleNext} disabled={items.length <= 1}>
        &gt;
      </Button>
    </div>
  );
};

const FileViewerModal = ({ show, onHide, fileId }) => {
  const { data: fileData, error, isLoading } = useGetFileQuery(fileId, { skip: !fileId });

  const getFileUrl = (fileData) => {
    const blob = new Blob([fileData], { type: fileData.type });
    return URL.createObjectURL(blob);
  };

  console.log('fileId:', fileId);
  console.log('fileData:', fileData);
  console.log('error:', error);

  return (
    <Modal show={show && fileId} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">Failed to load file</p>}
        {fileData && (
          <iframe
            src={getFileUrl(fileData)}
            title="File Viewer"
            width="100%"
            height="500px"
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const PatientDashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: patientData, error, refetch } = useGetPatientFromPatientQuery();
  const [showFileViewerModal, setShowFileViewerModal] = useState(false);
  const [fileId, setFileId] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error.data?.message || 'Failed to fetch patient data');
    }
  }, [error]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleFileClick = (id) => {
    console.log('Clicked file ID:', id); // Debugging log
    setFileId(id);
    setShowFileViewerModal(true);
  };

  return (
    <Container className="text-center">
      <h1>Patient Dashboard</h1>
      {patientData ? (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header className="personal-info-header">Personal Information</Card.Header>
              <ListGroup variant='flush'>
                <ListGroup.Item><strong>Name:</strong> {patientData.name}</ListGroup.Item>
                <ListGroup.Item><strong>Username:</strong> {patientData.username}</ListGroup.Item>
                <ListGroup.Item><strong>National ID:</strong> {patientData.nationalId}</ListGroup.Item>
                <ListGroup.Item><strong>Gender:</strong> {patientData.gender}</ListGroup.Item>
                <ListGroup.Item><strong>Date of Birth:</strong> {new Date(patientData.dateOfBirth).toLocaleDateString()}</ListGroup.Item>
                <ListGroup.Item><strong>Contact Number:</strong> {patientData.contactNumber}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Header className="medical-info-header">Medical Information</Card.Header>
              <ListGroup variant='flush'>
                <ListGroup.Item><strong>Blood Type:</strong> {patientData.medicalInfo?.bloodType || 'N/A'}</ListGroup.Item>
                <ListGroup.Item><strong>Height:</strong> {patientData.medicalInfo?.height || 'N/A'} cm</ListGroup.Item>
                <ListGroup.Item>
                  <strong>Weight:</strong>
                  <ScrollableList
                    items={patientData.medicalInfo?.weight}
                    renderItem={(item) => `${item.weight} kg on ${new Date(item.date).toLocaleDateString()}`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Allergies:</strong>
                  <ScrollableList
                    items={patientData.medicalInfo?.allergies}
                    renderItem={(item) => item}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Chronic Illnesses:</strong>
                  <ScrollableList
                    items={patientData.medicalInfo?.chronicIllnesses}
                    renderItem={(item) => item}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Disabilities:</strong>
                  <ScrollableList
                    items={patientData.medicalInfo?.disabilities}
                    renderItem={(item) => item}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Medications:</strong>
                  <ScrollableList
                    items={patientData.medicalInfo?.medications}
                    renderItem={(item) => `${item.medication} (${item.dosage}) from ${new Date(item.startDate).toLocaleDateString()} to ${item.endDate ? new Date(item.endDate).toLocaleDateString() : 'present'}`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Past Surgeries:</strong>
                  <ScrollableList
                    items={patientData.medicalInfo?.pastSurgeries}
                    renderItem={(item) => `${item.surgery} on ${new Date(item.date).toLocaleDateString()}`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Diagnoses:</strong>
                  <ScrollableList
                    items={patientData.medicalInfo?.diagnoses}
                    renderItem={(item) => `${item.diagnosis} on ${new Date(item.date).toLocaleDateString()}`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Scans:</strong>
                  <ScrollableList
                    items={patientData.medicalInfo?.scans}
                    renderItem={(item) => (
                      <Button variant="link" onClick={() => handleFileClick(item.file)}>
                        {item.name} on {new Date(item.date).toLocaleDateString()}
                      </Button>
                    )}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Labs:</strong>
                  <ScrollableList
                    items={patientData.medicalInfo?.labs}
                    renderItem={(item) => (
                      <Button variant="link" onClick={() => handleFileClick(item.file)}>
                        {item.name} on {new Date(item.date).toLocaleDateString()}
                      </Button>
                    )}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}

      <FileViewerModal
        show={showFileViewerModal}
        onHide={() => setShowFileViewerModal(false)}
        fileId={fileId}
      />
    </Container>
  );
};

export default PatientDashboardScreen;
