// Hcp endpoints

import express from "express"
import { protectPatient } from '../middleware/authMiddleware.js';
import {
  loginPatient, logoutPatient
} from '../controllers/patientController.js';

const router = express.Router();

router.post("/login", loginPatient);
router.post("/logout", protectPatient, logoutPatient);

export default router;
