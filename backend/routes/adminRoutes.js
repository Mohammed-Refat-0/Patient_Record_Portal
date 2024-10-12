// admin endpoints

import express from 'express';
import { protectAdmin } from '../middleware/authMiddleware.js';
import {
  loginAdmin, logoutAdmin, createHcp, getHcp, deleteHcp,
  createPatient, getPatient, deletePatient
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.post('/createhcp', protectAdmin, createHcp);
router.get('/gethcp', protectAdmin, getHcp);
router.delete('/deletehcp', protectAdmin, deleteHcp);
router.post('/createpatient', protectAdmin, createPatient);
router.get('/getpatient', protectAdmin, getPatient);
router.delete('/deletepatient', protectAdmin, deletePatient);

export default router;
