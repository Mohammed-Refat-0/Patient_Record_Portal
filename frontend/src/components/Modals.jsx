import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useGetFileByIdhcpQuery } from '../slices/hcpApiSlice';

export const BloodTypeModal = ({ show, onHide, bloodType, setBloodType, handleAddBloodType }) => (
    <Modal show={show} onHide={onHide}>
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
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddBloodType}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export const WeightModal = ({ show, onHide, weight, setWeight, handleAddWeight }) => (
    <Modal show={show} onHide={onHide}>
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
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddWeight}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export const ChronicIllnessModal = ({ show, onHide, chronicIllness, setChronicIllness, handleAddChronicIllness }) => (
    <Modal show={show} onHide={onHide}>
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
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddChronicIllness}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export const DisabilityModal = ({ show, onHide, disability, setDisability, handleAddDisability }) => (
    <Modal show={show} onHide={onHide}>
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
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddDisability}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export const AllergyModal = ({ show, onHide, allergy, setAllergy, handleAddAllergy }) => (
    <Modal show={show} onHide={onHide}>
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
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddAllergy}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export const MedicationModal = ({ show, onHide, medication, setMedication, dosage, setDosage, startDate, setStartDate, endDate, setEndDate, handleAddMedication }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Add Medication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="medication">
                <Form.Label>Medication</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter medication"
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="dosage">
                <Form.Label>Dosage</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter dosage"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter start date (dd-mm-yyyy)"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter end date (dd-mm-yyyy)"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddMedication}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export const PastSurgeryModal = ({ show, onHide, pastSurgery, setPastSurgery, date, setDate, handleAddPastSurgery }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Add Past Surgery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="pastSurgery">
                <Form.Label>Past Surgery</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter past surgery"
                    value={pastSurgery}
                    onChange={(e) => setPastSurgery(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter date (dd-mm-yyyy)"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddPastSurgery}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export const DiagnosisModal = ({ show, onHide, diagnosis, setDiagnosis, date, setDate, handleAddDiagnosis }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Add Diagnosis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="diagnosis">
                <Form.Label>Diagnosis</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter date (dd-mm-yyyy)"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddDiagnosis}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export const ScanModal = ({ show, onHide, handleAddScan }) => {
    const [testname, setTestname] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Scan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="testname">
                    <Form.Label>Test Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter test name"
                        value={testname}
                        onChange={(e) => setTestname(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="file">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleAddScan(testname, file)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export const LabModal = ({ show, onHide, handleAddLab }) => {
    const [testname, setTestname] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Lab</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="testname">
                    <Form.Label>Test Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter test name"
                        value={testname}
                        onChange={(e) => setTestname(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="file">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleAddLab(testname, file)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export const FileViewerModal = ({ show, onHide, fileId }) => {
    const { data: fileData, error, isLoading } = useGetFileByIdhcpQuery(fileId, { skip: !fileId });

    const getFileUrl = (fileData) => {
        const blob = new Blob([fileData], { type: fileData.type });
        return URL.createObjectURL(blob);
    };

    console.log('fileId:', fileId);
    console.log('fileData:', fileData);
    console.log('error:', error);

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>View File</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-danger">Failed to load file</p>}
                {fileData && (
                    <>
                        <h4>File Details:</h4>
                        <p>Type: {fileData.type}</p>
                        <p>Size: {fileData.size} bytes</p>
                        <hr />
                        <h4>File Content:</h4>
                        <embed
                            src={getFileUrl(fileData)}
                            type={fileData.type}
                            width="100%"
                            height="500px"
                        />
                    </>
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
