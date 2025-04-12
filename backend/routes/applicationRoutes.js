
import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { submitApplication } from '../controllers/applicationController.js';

const router = express.Router();

// POST /api/applications/:jobId
router.post('/:jobId', upload.single('cv'), submitApplication);

export default router