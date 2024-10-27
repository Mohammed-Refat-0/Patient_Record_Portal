import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../components/styles.css';
import ScrollableList from '../components/ScrollableList';
import {
    useGetPatientInfoQuery,
    useAddBloodTypeMutation,
    useAddWeightMutation,
    useAddChronicIllnessMutation,
    useAddDisabilityMutation,
    useAddAllergyMutation,
    useAddMedicationMutation,
    useAddPastSurgeryMutation,
    useAddDiagnosisMutation,
    useAddScanMutation,
    useAddLabMutation,
    useGetFileByIdhcpQuery
} from '../slices/hcpApiSlice';
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
    handleAddScan,
    handleAddLab
} from './Hcphandlers';
import {
    BloodTypeModal, WeightModal, ChronicIllnessModal, DisabilityModal, AllergyModal,
    MedicationModal, PastSurgeryModal, DiagnosisModal, ScanModal, LabModal
} from '../components/Modals';

const FileViewerModal = ({ show, onHide, fileId }) => {
    const { data: fileData, error, isLoading } = useGetFileByIdhcpQuery(fileId, { skip: !fileId });

    const getFileUrl = (fileData) => {
        const blob = new Blob([fileData], { type: fileData.type });
        return URL.createObjectURL(blob);
    };

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
                        height="700px"
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
    const [showScanModal, setShowScanModal] = useState(false);
    const [showLabModal, setShowLabModal] = useState(false);
    const [bloodType, setBloodType] = useState('');
    const [weight, setWeight] = useState('');
    const [chronicIllness, setChronicIllness] = useState('');
    const [disability, setDisability] = useState('');
    const [allergy, setAllergy] = useState('');
    const [medication, setMedication] = useState('');
    const [pastSurgery, setPastSurgery] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [dosage, setDosage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [date, setDate] = useState('');
    const [showFileViewerModal, setShowFileViewerModal] = useState(false);
    const [fileId, setFileId] = useState(null);
    const { data: patientData, error, refetch, isFetching } = useGetPatientInfoQuery(username, {
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
    const [addScan] = useAddScanMutation();
    const [addLab] = useAddLabMutation();

    useEffect(() => {
        if (error) {
            toast.error(error.data?.message || 'Failed to fetch patient data');
        }
    }, [error]);

    useEffect(() => {
        if (search && !isFetching) {
            refetch();
        }
    }, [search, isFetching, refetch]);

    const handleFileClick = (id) => {
        setFileId(id);
        setShowFileViewerModal(true);
    };

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
                            <ListGroup.Item><strong>Name:</strong> {patientData.name}</ListGroup.Item>
                            <ListGroup.Item><strong>Gender:</strong> {patientData.gender}</ListGroup.Item>
                            <ListGroup.Item><strong>Date of Birth:</strong> {new Date(patientData.dateOfBirth).toLocaleDateString()}</ListGroup.Item>
                            <ListGroup.Item><strong>Height:</strong> {patientData.medicalInfo?.height || 'N/A'} cm</ListGroup.Item>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Blood Type:</strong></span>
                                        <span className="mx-auto">{patientData.medicalInfo?.bloodType || 'N/A'}</span>
                                        {(!patientData.medicalInfo?.bloodType || patientData.medicalInfo?.bloodType === 'N/A') && (
                                            <Button variant="link" onClick={() => setShowBloodTypeModal(true)}>
                                                Add Blood Type
                                            </Button>
                                        )}
                                    </div>
                                </ListGroup.Item>
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
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Scans:</strong></span>
                                        <ScrollableList
                                            items={patientData.medicalInfo?.scans}
                                            renderItem={(item) => (
                                                <Button variant="link" onClick={() => handleFileClick(item.file)}>
                                                    {item.name} on {new Date(item.date).toLocaleDateString()}
                                                </Button>
                                            )}
                                        />
                                        <Button variant="link" onClick={() => setShowScanModal(true)}>
                                            Add Scan
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Labs:</strong></span>
                                        <ScrollableList
                                            items={patientData.medicalInfo?.labs}
                                            renderItem={(item) => (
                                                <Button variant="link" onClick={() => handleFileClick(item.file)}>
                                                    {item.name} on {new Date(item.date).toLocaleDateString()}
                                                </Button>
                                            )}
                                        />
                                        <Button variant="link" onClick={() => setShowLabModal(true)}>
                                            Add Lab
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
            <BloodTypeModal
                show={showBloodTypeModal}
                onHide={() => setShowBloodTypeModal(false)}
                bloodType={bloodType}
                setBloodType={setBloodType}
                handleAddBloodType={() => handleAddBloodType(username, bloodType, addBloodType, setShowBloodTypeModal, refetch)}
            />

            <WeightModal
                show={showWeightModal}
                onHide={() => setShowWeightModal(false)}
                weight={weight}
                setWeight={setWeight}
                handleAddWeight={() => handleAddWeight(username, weight, addWeight, setShowWeightModal, refetch)}
            />

            <ChronicIllnessModal
                show={showChronicIllnessModal}
                onHide={() => setShowChronicIllnessModal(false)}
                chronicIllness={chronicIllness}
                setChronicIllness={setChronicIllness}
                handleAddChronicIllness={() => handleAddChronicIllness(username, chronicIllness, addChronicIllness, setShowChronicIllnessModal, refetch)}
            />

            <DisabilityModal
                show={showDisabilityModal}
                onHide={() => setShowDisabilityModal(false)}
                disability={disability}
                setDisability={setDisability}
                handleAddDisability={() => handleAddDisability(username, disability, addDisability, setShowDisabilityModal, refetch)}
            />

            <AllergyModal
                show={showAllergyModal}
                onHide={() => setShowAllergyModal(false)}
                allergy={allergy}
                setAllergy={setAllergy}
                handleAddAllergy={() => handleAddAllergy(username, allergy, addAllergy, setShowAllergyModal, refetch)}
            />

            <MedicationModal
                show={showMedicationModal}
                onHide={() => setShowMedicationModal(false)}
                medication={medication}
                setMedication={setMedication}
                dosage={dosage}
                setDosage={setDosage}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                handleAddMedication={() => handleAddMedication(username, medication, dosage, startDate, endDate, addMedication, setShowMedicationModal, refetch)}
            />

            <PastSurgeryModal
                show={showPastSurgeryModal}
                onHide={() => setShowPastSurgeryModal(false)}
                pastSurgery={pastSurgery}
                setPastSurgery={setPastSurgery}
                date={date}
                setDate={setDate}
                handleAddPastSurgery={() => handleAddPastSurgery(username, pastSurgery, date, addPastSurgery, setShowPastSurgeryModal, refetch)}
            />

            <DiagnosisModal
                show={showDiagnosisModal}
                onHide={() => setShowDiagnosisModal(false)}
                diagnosis={diagnosis}
                setDiagnosis={setDiagnosis}
                date={date}
                setDate={setDate}
                handleAddDiagnosis={() => handleAddDiagnosis(username, diagnosis, date, addDiagnosis, setShowDiagnosisModal, refetch)}
            />

            <ScanModal
                show={showScanModal}
                onHide={() => setShowScanModal(false)}
                handleAddScan={(testname, file) => handleAddScan(username, testname, file, addScan, setShowScanModal, refetch)} // Use username state
            />

            <LabModal
                show={showLabModal}
                onHide={() => setShowLabModal(false)}
                handleAddLab={(testname, file) => handleAddLab(username, testname, file, addLab, setShowLabModal, refetch)} // Use username state
            />
            <FileViewerModal
                show={showFileViewerModal}
                onHide={() => setShowFileViewerModal(false)}
                fileId={fileId}
            />
        </Container>
    );
};

export default HcpDashboardScreen;
