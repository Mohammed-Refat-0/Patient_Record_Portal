// patient controller functions

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Patient from "../models/patientModel.js";

// Post /api/patient/login
// @access Public
// @desc login patient
const loginPatient = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }
    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (!bcrypt.compareSync(password, patient.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateToken(res, patient._id, 'patient');
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// post /api/patient/logout
// @access Private
// @desc logout patient 
const logoutPatient = (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
    });
    return res.status(200).json({ message: 'Patient logged out' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { loginPatient, logoutPatient };
