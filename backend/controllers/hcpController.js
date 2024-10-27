// hcp controller functions

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Hcp from "../models/hcpModel.js";
import Patient from "../models/patientModel.js";
import File from '../models/fileModel.js';

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

// Post /api/hcp/login
// @access Public
// @desc login HCP
const loginHcp = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }
    const hcp = await Hcp.findOne({ username });
    if (!hcp) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (!bcrypt.compareSync(password, hcp.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateToken(res, hcp._id, 'hcp');
    return res.status(200).json({
      message: "Login successful",
      username: hcp.username,
      name: hcp.name,
      role: 'HCP',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// post /api/hcp/logout
// @access Private
// @desc logout HCP
const logoutHcp = (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
    });
    return res.status(200).json({ message: 'HCP logged out' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/hcp/getpatient?username=username
// @access Private
// @desc get patient by username
const getPatient = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: "username is required in url" });
    }
    const patient = await Patient.findOne({ username }).select('-password');
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/hcp/addbloodtype
// @access Private
// @desc add blood type to patient
const addBloodType = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, bloodType } = req.body;
    if (!username || !bloodType) {
      return res.status(400).json({ message: "username and bloodType are required" });
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const bloodTypeRegex = /^(A|B|AB|O)[+-]$/;
    if (!bloodTypeRegex.test(bloodType)) {
      return res.status(400).json({ message: "Invalid blood type" });
    }
    patient.medicalInfo.bloodType = bloodType;
    await patient.save();
    return res.status(200).json({ message: "Blood type added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Post /api/hcp/addheight
// @access Private
// @desc add height to patient
const addHeight = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, height } = req.body;
    if (!username || !height) {
      return res.status(400).json({ message: "username and height are required" });
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const heightRegex = /^[0-9]*$/;
    if (!heightRegex.test(height)) {
      return res.status(400).json({ message: "Invalid height" });
    }
    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }
    patient.medicalInfo.height = height;
    await patient.save();
    return res.status(200).json({ message: "Height added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Post /api/hcp/addweight
// @access Private
// @desc add weight to patient
const addWeight = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, weight } = req.body;
    if (!username || !weight) {
      return res.status(400).json({ message: "username and weight are required" });
    }
    const weightRegex = /^[0-9]*$/;
    if (!weightRegex.test(weight)) {
      return res.status(400).json({ message: "Invalid weight" });
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }
    if (!Array.isArray(patient.medicalInfo.weight)) {
      patient.medicalInfo.weight = [];
    }
    patient.medicalInfo.weight.push({ weight, date: new Date() });
    await patient.save();
    return res.status(200).json({ message: "Weight added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/hcp/addddisability
// @access Private
// @desc add disability to patient
const addDisability = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, disability } = req.body;
    if (!username || !disability) {
      return res.status(400).json({ message: "username and disability are required" });
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }
    if (!Array.isArray(patient.medicalInfo.disabilities)) {
      patient.medicalInfo.disabilities = [];
    }
    patient.medicalInfo.disabilities.push(disability);
    await patient.save();
    return res.status(200).json({ message: "Disability added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//POST /api/hcp/addchronicillness
// @access Private
// @desc add chronic illness to patient
const addChronicIllness = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, illness } = req.body;
    if (!username || !illness) {
      return res.status(400).json({ message: "username and illness are required" });
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }
    if (!Array.isArray(patient.medicalInfo.chronicIllnesses)) {
      patient.medicalInfo.chronicIllnesses = [];
    }
    patient.medicalInfo.chronicIllnesses.push(illness);
    await patient.save();
    return res.status(200).json({ message: "Chronic illness added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// POST /api/hcp/addallergy
// @access Private
// @desc add allergy to patient
const addAllergy = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, allergy } = req.body;
    if (!username || !allergy) {
      return res.status(400).json({ message: "username and allergy are required" });
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }
    if (!Array.isArray(patient.medicalInfo.allergies)) {
      patient.medicalInfo.allergies = [];
    }
    patient.medicalInfo.allergies.push(allergy);
    await patient.save();
    return res.status(200).json({ message: "Allergy added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/hcp/addpastSurgery
// @access Private
// @desc add past surgery to patient
const addPastSurgery = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, surgery, date } = req.body;
    if (!username || !surgery || !date) {
      return res.status(400).json({ message: "username, surgery, and date are required" });
    }

    if (!dateRegex.test(date)) {
      return res.status(400).json({ message: "Invalid date. Use dd-mm-yyyy." });
    }
    const [day, month, year] = date.split('-');
    const parsedDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    if (parsedDate > currentDate) {
      return res.status(400).json({ message: "Date cannot be in the future" });
    }

    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }
    if (!Array.isArray(patient.medicalInfo.pastSurgeries)) {
      patient.medicalInfo.pastSurgeries = [];
    }
    patient.medicalInfo.pastSurgeries.push({ surgery, date: parsedDate });
    await patient.save();
    return res.status(200).json({ message: "Past surgery added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Post /api/hcp/addmedication
// @access Private
// @desc add medication to patient
const addMedication = async (req, res) => {
  try {
    let parsedEndDate = null;
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, medication, dosage, startDate, endDate } = req.body;
    if (!username || !medication || !dosage || !startDate) {
      return res.status(400).json({ message: "username, medication, dosage, and startDate are required" });
    }

    if (!dateRegex.test(startDate)) {
      return res.status(400).json({ message: "Invalid start date. Use dd-mm-yyyy." });
    }
    const [startDay, startMonth, startYear] = startDate.split('-');
    const parsedStartDate = new Date(`${startYear}-${startMonth}-${startDay}`);
    const currentDate = new Date();
    if (parsedStartDate > currentDate) {
      return res.status(400).json({ message: "Date cannot be in the future" });
    }

    if (endDate && !dateRegex.test(endDate)) {
      return res.status(400).json({ message: "Invalid end date. Use dd-mm-yyyy." });
    }

    if (endDate) {
      const [endDay, endMonth, endYear] = endDate.split('-');
      const parsedEndDate = new Date(`${endYear}-${endMonth}-${endDay}`);
      if (parsedEndDate < parsedStartDate) {
        return res.status(400).json({ message: "End date cannot be before start date" });
      }
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }
    if (!Array.isArray(patient.medicalInfo.medications)) {
      patient.medicalInfo.medications = [];
    }
    patient.medicalInfo.medications.push({
      medication,
      dosage,
      startDate: parsedStartDate,
      endDate: parsedEndDate
    });
    await patient.save();
    return res.status(200).json({ message: "Medication added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/hcp/adddiagnosis
// @access Private
// @desc add diagnosis to patient
const addDiagnosis = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, diagnosis, date } = req.body;
    if (!username || !diagnosis || !date) {
      return res.status(400).json({ message: "username, diagnosis, and date are required" });
    }

    if (!dateRegex.test(date)) {
      return res.status(400).json({ message: "Invalid date. Use dd-mm-yyyy." });
    }
    const [day, month, year] = date.split('-');
    const parsedDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    if (parsedDate > currentDate) {
      return res.status(400).json({ message: "Date cannot be in the future" });
    }

    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }
    if (!Array.isArray(patient.medicalInfo.diagnoses)) {
      patient.medicalInfo.diagnoses = [];
    }
    patient.medicalInfo.diagnoses.push({ diagnosis, date: parsedDate });
    await patient.save();
    return res.status(200).json({ message: "Diagnosis added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Post /api/hcp/addscan
// @access Private
// @desc add scan file to patient
const addScan = async (req, res) => {
  try {
    const { username, testname } = req.body;
    if (!username || !testname) {
      return res.status(400).json({ message: 'username and testname are required' });
    }

    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }

    if (!Array.isArray(patient.medicalInfo.scans)) {
      patient.medicalInfo.scans = [];
    }

    if (!req.file || req.file.fieldname !== 'file') {
      return res.status(400).json({ message: 'No file uploaded or incorrect field name' });
    }

    patient.medicalInfo.scans.push({
      name: testname,
      file: req.file.id,
      date: new Date()
    });

    await patient.save();
    return res.status(200).json({ message: 'Scan added successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/hcp/addlab
// @access Private
// @desc add lab file to patient
const addLab = async (req, res) => {
  try {
    const { username, testname } = req.body;
    if (!username || !testname) {
      return res.status(400).json({ message: 'username and testname are required' });
    }

    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (!patient.medicalInfo) {
      patient.medicalInfo = {};
    }

    if (!Array.isArray(patient.medicalInfo.labs)) {
      patient.medicalInfo.labs = [];
    }

    if (!req.file || req.file.fieldname !== 'file') {
      return res.status(400).json({ message: 'No file uploaded or incorrect field name' });
    }

    patient.medicalInfo.labs.push({
      name: testname,
      file: req.file.id,
      date: new Date()
    });

    await patient.save();
    return res.status(200).json({ message: 'Lab added successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// GET /api/hcp/file/:id
// @access Private
// @desc get file by ID
const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.set('Content-Type', file.contentType);
    res.send(file.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  loginHcp, logoutHcp, getPatient, addBloodType, addHeight, addDisability, addChronicIllness,
  addWeight, addAllergy, addPastSurgery, addMedication, addDiagnosis, addScan, addLab, getFileById
};
