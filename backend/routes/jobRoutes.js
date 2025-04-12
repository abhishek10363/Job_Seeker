import express from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getEmployerJobs, // ✅ Import here
} from '../controllers/jobController.js';

import protect from '../middleware/authMddleware.js';

const router = express.Router();

// Public - Get all jobs
router.get('/', getJobs);

// Protected - Get jobs for logged-in employer
router.get('/employer', protect, getEmployerJobs);

// Public - Get one job
router.get('/:id', getJobById);

// Protected - Create, Update, Delete jobs
router.post('/', protect, createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

export default router;
