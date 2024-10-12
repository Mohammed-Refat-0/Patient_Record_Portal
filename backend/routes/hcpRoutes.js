// Hcp endpoints

import express from "express"
import { protectHcp } from '../middleware/authMiddleware.js';
import {
  loginHcp, logoutHcp
} from '../controllers/hcpController.js';

const router = express.Router();

router.post("/login", loginHcp);
router.post("/logout", protectHcp, logoutHcp);

export default router;
