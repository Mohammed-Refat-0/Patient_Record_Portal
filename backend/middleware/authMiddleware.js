import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';
import Hcp from '../models/hcpModel.js';
import Patient from '../models/patientModel.js';

const protectAdmin = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized as admin' });
      }

      const admin = await Admin.findById(decoded.id).select('-password');

      if (!admin) {
        return res.status(401).json({ message: 'Admin not found' });
      }

      req.admin = admin;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectHcp = async (req, res, next) => {

  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== 'hcp') {
        return res.status(401).json({ message: 'Not authorized as hcp' });
      }

      const hcp = await Hcp.findById(decoded.id).select('-password');

      if (!hcp) {
        return res.status(401).json({ message: 'Hcp not found' });
      }

      req.hcp = hcp;
      next();
    }
    catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectPatient = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== 'patient') {
        return res.status(401).json({ message: 'Not authorized as patient' });
      }

      const patient = await Patient.findById(decoded.id).select('-password');

      if (!patient) {
        return res.status(401).json({ message: 'Patient not found' });
      }

      req.patient = patient;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protectAdmin, protectHcp, protectPatient };
