// Hcp endpoints

import express from "express"
import { protectPatient } from '../middleware/authMiddleware.js';
import {
  loginPatient, logoutPatient, patientInfo
} from '../controllers/patientController.js';

const router = express.Router();

router.post("/login", loginPatient);
router.post("/logout", protectPatient, logoutPatient);
router.get("/info", protectPatient, patientInfo);

export default router;
