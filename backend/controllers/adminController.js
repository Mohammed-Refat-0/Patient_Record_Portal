// Admin controller functions

import Admin from "../models/adminModel.js";
import Hcp from "../models/hcpModel.js";
import Patient from "../models/patientModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


const nationalIdRegex = /^\d{15}$/; //15 digits
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
// Minimum seven characters, at least one letter, one number and one special character

// Post /api/admin/login
// @access Public
// @desc login admin
const loginAdmin = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateToken(res, admin._id, 'admin');
    return res.status(200).json({
      message: "Login successful",
      username: admin.username,
      name: admin.name,
      role: 'Admin',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//post /api/admin/logout
// @access Private
// @desc logout admin
const logoutAdmin = (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
    });
    return res.status(200).json({ message: 'Admin logged out' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/admin/createhcp
// @access Private
// @desc create a new hcp
const createHcp = async (req, res) => {
  try {

    let adminId = null;
    if (req.admin) {
      adminId = req.admin._id;
    }

    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const { name, username, password, nationalId, title } = req.body;

    if (!name || !username || !password || !nationalId || !title) {
      return res.status(400).json({ message: "name, username, password, nationalId, and title are required" });
    }
    if (!nationalIdRegex.test(nationalId)) {
      return res.status(400).json({ message: "Invalid nationalId" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const existingUsername = await Hcp.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exists" });
    }

    const existingNationalId = await Hcp.findOne({ nationalId });
    if (existingNationalId) {
      return res.status(400).json({ message: "a Hcp with this nationalId already exists" });
    }

    const hashed_password = bcrypt.hashSync(String(password), 9);
    const newHcp = new Hcp({
      name: String(name),
      username: String(username),
      password: hashed_password,
      nationalId: String(nationalId),
      title: String(title),
      createdBy: adminId
    });

    const hcp = await newHcp.save();
    return res.status(201).json({ message: `Hcp created successfully, ID: ${hcp._id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/gethcp?username=<username>
// @acess Private
// @desc get HCP
const getHcp = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: "username is required in url" });
    }
    const hcp = await Hcp.findOne({ username });
    if (!hcp) {
      return res.status(404).json({ message: "Hcp not found" });
    }
    return res.status(200).json({
      name: hcp.name,
      username: hcp.username,
      nationalId: hcp.nationalId,
      title: hcp.title,
      createdBy: hcp.createdBy
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/admin/deltethcp?username=<username>
// @acess Private
// @desc delete HCP
const deleteHcp = async (req, res) => {
  try {
    const { username, password } = req.query;
    if (!username) {
      return res.status(400).json({ message: "username is required in url" });
    }
    const hcp = await Hcp.findOne({ username });
    if (!hcp) {
      return res.status(404).json({ message: "Hcp not found" });
    }
    if (!(bcrypt.compareSync(password, hcp.password))) {
      return res.status(400).json({ message: "Invalid password" });
    };
    await Hcp.findOneAndDelete({ username })
    return res.status(200).json({ message: "Hcp deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/admin/createpatient
// @access Private
// @desc create a new patient
const createPatient = async (req, res) => {
  try {
    let adminId = null;
    if (req.admin) {
      adminId = req.admin._id;
    }

    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const { name, username, password, nationalId, gender, dateOfBirth } = req.body;
    if (!name || !username || !password || !nationalId || !gender || !dateOfBirth) {
      return res.status(400).json({ message: "name, username, password, nationalId, gender, and dateOfBirth are required" });
    }
    if (!nationalIdRegex.test(nationalId)) {
      return res.status(400).json({ message: "Invalid nationalId" });
    }

    const existingUsername = await Patient.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exists" });
    }

    const existingNationalId = await Patient.findOne({ nationalId });
    if (existingNationalId) {
      return res.status(400).json({ message: "a patient with this nationalId already exists" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (gender !== 'male' && gender !== 'female') {
      return res.status(400).json({ message: "gender must be 'male' or 'female'" });
    }

    const dateOfBirthRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!dateOfBirthRegex.test(dateOfBirth)) {
      return res.status(400).json({ message: "Invalid date of birth format. Use dd-mm-yyyy." });
    }

    const [day, month, year] = dateOfBirth.split('-');
    const parsedDateOfBirth = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    if (parsedDateOfBirth > currentDate) {
      return res.status(400).json({ message: "Date of birth cannot be in the future" });
    }

    const hashed_password = bcrypt.hashSync(String(password), 9);

    const newPatient = new Patient({
      name: String(name),
      username: String(username),
      password: hashed_password,
      nationalId: String(nationalId),
      gender: String(gender),
      dateOfBirth: parsedDateOfBirth,
      createdBy: adminId
    });

    const patient = await newPatient.save();
    return res.status(201).json({ message: `Patient created successfully, ID: ${patient._id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/getpatient?username=<username>
// @acess Private
// @desc get patient
const getPatient = async (req, res) => {
  try {

    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: "username is required in url" });
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json({
      name: patient.name,
      username: patient.username,
      nationalId: patient.nationalId,
      createdBy: patient.createdBy
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/admin/deletepatient?username=<username>
// @acess Private
// @desc delete patient
const deletePatient = async (req, res) => {
  try {
    const { username, password } = req.query;
    if (!username) {
      return res.status(400).json({ message: "username is required in url" });
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!(bcrypt.compareSync(password, patient.password))) {
      return res.status(400).json({ message: "Invalid password" });
    };
    await Patient.findOneAndDelete({ username });
    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export { loginAdmin, logoutAdmin, createHcp, getHcp, deleteHcp, createPatient, getPatient, deletePatient };
