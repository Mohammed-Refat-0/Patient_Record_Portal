import React, { useState } from 'react';
import {
    useGetPatientInfoQuery,
    useAddBloodTypeMutation,
    useAddWeightMutation,
    useAddChronicIllnessMutation,
    useAddDisabilityMutation,
    useAddAllergyMutation,
    useAddMedicationMutation,
    useAddPastSurgeryMutation,
    useAddDiagnosisMutation
} from '../slices/hcpApiSlice';
import { Container, Row, Col, Card, ListGroup, Form, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../components/styles.css';
import ScrollableList from '../components/ScrollableList';
import {
    handleSearch,
    handleAddBloodType,
    handleAddWeight,
    handleAddChronicIllness,
    handleAddDisability,
    handleAddAllergy,
    handleAddMedication,
    handleAddPastSurgery,
    handleAddDiagnosis,
} from './hcphandlers';
import { MedicationModal, PastSurgeryModal, DiagnosisModal } from '../components/Modals';
const FileViewer = ({ fileId, fileName, fileDate }) => {
    const [fileUrl, setFileUrl] = useState(null);
    // Add the logic to fetch and display the file
};

const HcpDashboardScreen = () => {
    const [username, setUsername] = useState('');
    const [search, setSearch] = useState(false);
    const [showBloodTypeModal, setShowBloodTypeModal] = useState(false);
    const [showWeightModal, setShowWeightModal] = useState(false);
    const [showChronicIllnessModal, setShowChronicIllnessModal] = useState(false);
    const [showDisabilityModal, setShowDisabilityModal] = useState(false);
    const [showAllergyModal, setShowAllergyModal] = useState(false);
    const [showMedicationModal, setShowMedicationModal] = useState(false);
    const [showPastSurgeryModal, setShowPastSurgeryModal] = useState(false);
    const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
    const [bloodType, setBloodType] = useState('');
    const [weight, setWeight] = useState('');
    const [chronicIllness, setChronicIllness] = useState('');
    const [disability, setDisability] = useState('');
    const [allergy, setAllergy] = useState('');
    const [medication, setMedication] = useState('');
    const [pastSurgery, setPastSurgery] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const { data: patientData, error, refetch } = useGetPatientInfoQuery(username, {
        skip: !search,
    });


    const [addBloodType] = useAddBloodTypeMutation();
    const [addWeight] = useAddWeightMutation();
    const [addChronicIllness] = useAddChronicIllnessMutation();
    const [addDisability] = useAddDisabilityMutation();
    const [addAllergy] = useAddAllergyMutation();
    const [addMedication] = useAddMedicationMutation();
    const [addPastSurgery] = useAddPastSurgeryMutation();
    const [addDiagnosis] = useAddDiagnosisMutation();

    return (
        <Container className="text-center">
            <h1>Healthcare Provider Dashboard</h1>
            <Form onSubmit={(e) => handleSearch(e, username, setSearch, refetch)}>
                <Form.Group controlId="username">
                    <Form.Control
                        type="text"
                        placeholder="Enter patient username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2">
                    Search
                </Button>
            </Form>
            {error && <p className="text-danger mt-3">Patient not found</p>}
            {patientData && (
                <Row className="mt-4">
                    <Col md={12}>
                        <Card>
                            <Card.Header className="patient-info-header">Patient Information</Card.Header>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Blood Type:</strong> {patientData.medicalInfo?.bloodType || 'N/A'}</span>
                                        {(!patientData.medicalInfo?.bloodType || patientData.medicalInfo?.bloodType === 'N/A') && (
                                            <Button variant="link" onClick={() => setShowBloodTypeModal(true)}>
                                                Add Blood Type
                                            </Button>
                                        )}
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item><strong>Name:</strong> {patientData.name}</ListGroup.Item>
                                <ListGroup.Item><strong>Gender:</strong> {patientData.gender}</ListGroup.Item>
                                <ListGroup.Item><strong>Date of Birth:</strong> {new Date(patientData.dateOfBirth).toLocaleDateString()}</ListGroup.Item>
                                <ListGroup.Item><strong>Height:</strong> {patientData.medicalInfo?.height || 'N/A'} cm</ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Weight:</strong></span>
                                        <ScrollableList
                                            items={patientData.medicalInfo?.weight}
                                            renderItem={(item) => `${item.weight} kg on ${new Date(item.date).toLocaleDateString()}`}
                                        />
                                        <Button variant="link" onClick={() => setShowWeightModal(true)}>
                                            Add Weight
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Allergies:</strong></span>
                                        <ScrollableList
                                            items={patientData.medicalInfo?.allergies}
                                            renderItem={(item) => item}
                                        />
                                        <Button variant="link" onClick={() => setShowAllergyModal(true)}>
                                            Add Allergy
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Chronic Illnesses:</strong></span>
                                        <ScrollableList
                                            items={patientData.medicalInfo?.chronicIllnesses}
                                            renderItem={(item) => item}
                                        />
                                        <Button variant="link" onClick={() => setShowChronicIllnessModal(true)}>
                                            Add Chronic Illness
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Disabilities:</strong></span>
                                        <ScrollableList
                                            items={patientData.medicalInfo?.disabilities}
                                            renderItem={(item) => item}
                                        />
                                        <Button variant="link" onClick={() => setShowDisabilityModal(true)}>
                                            Add Disability
                                        </Button>
                                    </div>
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
                                            <FileViewer fileId={item.fileId} fileName={item.name} fileDate={item.date} />
                                        )}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Labs:</strong>
                                    <ScrollableList
                                        items={patientData.medicalInfo?.labs}
                                        renderItem={(item) => (
                                            <FileViewer fileId={item.fileId} fileName={item.name} fileDate={item.date} />
                                        )}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Medications:</strong></span>
                                        <ScrollableList
                                            items={patientData.medicalInfo?.medications}
                                            renderItem={(item) => `${item.medication} (${item.dosage}) from ${new Date(item.startDate).toLocaleDateString()} to ${item.endDate ? new Date(item.endDate).toLocaleDateString() : 'present'}`}
                                        />
                                        <Button variant="link" onClick={() => setShowMedicationModal(true)}>
                                            Add Medication
                                        </Button>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Past Surgeries:</strong></span>
                                        <ScrollableList
                                            items={patientData.medicalInfo?.pastSurgeries}
                                            renderItem={(item) => `${item.surgery} on ${new Date(item.date).toLocaleDateString()}`}
                                        />
                                        <Button variant="link" onClick={() => setShowPastSurgeryModal(true)}>
                                            Add Past Surgery
                                        </Button>
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Diagnoses:</strong></span>
                                        <ScrollableList
                                            items={patientData.medicalInfo?.diagnoses}
                                            renderItem={(item) => `${item.diagnosis} on ${new Date(item.date).toLocaleDateString()}`}
                                        />
                                        <Button variant="link" onClick={() => setShowDiagnosisModal(true)}>
                                            Add Diagnosis
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}

            <Modal show={showBloodTypeModal} onHide={() => setShowBloodTypeModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Blood Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="bloodType">
                        <Form.Label>Blood Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter blood type"
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBloodTypeModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAddBloodType(username, bloodType, addBloodType, setShowBloodTypeModal, refetch)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showWeightModal} onHide={() => setShowWeightModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Weight</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="weight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowWeightModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAddWeight(username, weight, addWeight, setShowWeightModal, refetch)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showChronicIllnessModal} onHide={() => setShowChronicIllnessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Chronic Illness</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="chronicIllness">
                        <Form.Label>Chronic Illness</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter chronic illness"
                            value={chronicIllness}
                            onChange={(e) => setChronicIllness(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowChronicIllnessModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAddChronicIllness(username, chronicIllness, addChronicIllness, setShowChronicIllnessModal, refetch)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDisabilityModal} onHide={() => setShowDisabilityModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Disability</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="disability">
                        <Form.Label>Disability</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter disability"
                            value={disability}
                            onChange={(e) => setDisability(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDisabilityModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAddDisability(username, disability, addDisability, setShowDisabilityModal, refetch)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAllergyModal} onHide={() => setShowAllergyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Allergy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="allergy">
                        <Form.Label>Allergy</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter allergy"
                            value={allergy}
                            onChange={(e) => setAllergy(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAllergyModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAddAllergy(username, allergy, addAllergy, setShowAllergyModal, refetch)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <MedicationModal
                show={showMedicationModal}
                onHide={() => setShowMedicationModal(false)}
                medication={medication}
                setMedication={setMedication}
                handleAddMedication={() => handleAddMedication(username, medication, addMedication, setShowMedicationModal, refetch)}
            />

            <PastSurgeryModal
                show={showPastSurgeryModal}
                onHide={() => setShowPastSurgeryModal(false)}
                pastSurgery={pastSurgery}
                setPastSurgery={setPastSurgery}
                handleAddPastSurgery={() => handleAddPastSurgery(username, pastSurgery, addPastSurgery, setShowPastSurgeryModal, refetch)}
            />

            <DiagnosisModal
                show={showDiagnosisModal}
                onHide={() => setShowDiagnosisModal(false)}
                diagnosis={diagnosis}
                setDiagnosis={setDiagnosis}
                handleAddDiagnosis={() => handleAddDiagnosis(username, diagnosis, addDiagnosis, setShowDiagnosisModal, refetch)}
            />
        </Container>
    );
};


export default HcpDashboardScreen;
