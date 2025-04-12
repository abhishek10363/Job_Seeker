import express from 'express';
import {
  registerEmployer,
  loginEmployer,
  getEmployerProfile,
} from '../controllers/authController.js';
import protect from '../middleware/authMddleware.js';

const router = express.Router();

router.post('/register', registerEmployer);
router.post('/login', loginEmployer);
router.get('/profile', protect, getEmployerProfile); // optional: fetch employer info

export default router;
