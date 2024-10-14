// Hcp endpoints

import express from "express"
import uploadMiddleware from '../middleware/uploadMiddleware.js';
import { protectHcp } from '../middleware/authMiddleware.js';
import {
  loginHcp, logoutHcp, getPatient, addBloodType, addWeight, addChronicIllness,
  addDisability, addAllergy, addHeight, addDiagnosis, addMedication,
  addPastSurgery, addScan, addLab
} from '../controllers/hcpController.js';

const router = express.Router();

router.post("/login", loginHcp);
router.post("/logout", protectHcp, logoutHcp);

router.get("/getpatient", protectHcp, getPatient);
router.post("/addbloodtype", protectHcp, addBloodType);
router.post("/addallergy", protectHcp, addAllergy);
router.post("/addchronicillness", protectHcp, addChronicIllness);
router.post("/adddisability", protectHcp, addDisability);
router.post("/adddiagnosis", protectHcp, addDiagnosis);
router.post("/addmedication", protectHcp, addMedication);
router.post("/addpastsurgery", protectHcp, addPastSurgery);
router.post("/addweight", protectHcp, addWeight);
router.post("/addheight", protectHcp, addHeight);
router.post("/addscan", protectHcp, uploadMiddleware, addScan);
router.post("/addlab", protectHcp, uploadMiddleware, addLab);



export default router;
