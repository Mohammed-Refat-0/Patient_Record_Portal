// admin endpoints

import express from 'express';
import { createHcp } from '../controllers/adminController.js';

const router = express.Router();

router.post('/createhcp', createHcp);

export default router;
