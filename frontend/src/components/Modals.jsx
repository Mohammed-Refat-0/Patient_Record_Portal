import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export const MedicationModal = ({ show, onHide, medication, setMedication, handleAddMedication }) => (
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

export const PastSurgeryModal = ({ show, onHide, pastSurgery, setPastSurgery, handleAddPastSurgery }) => (
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

export const DiagnosisModal = ({ show, onHide, diagnosis, setDiagnosis, handleAddDiagnosis }) => (
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
