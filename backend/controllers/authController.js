import Employer from '../models/Employer.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc Register a new employer
export const registerEmployer = async (req, res) => {
  const { name, company, email, password } = req.body;

  try {
    const employerExists = await Employer.findOne({ email });

    if (employerExists) {
      return res.status(400).json({ message: 'Employer already exists' });
    }

    const employer = await Employer.create({ name, company, email, password });

    res.status(201).json({
      _id: employer._id,
      name: employer.name,
      email: employer.email,
      token: generateToken(employer._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Login employer
export const loginEmployer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employer = await Employer.findOne({ email });

    if (employer && (await bcrypt.compare(password, employer.password))) {
      res.json({
        token: generateToken(employer._id),
        employer: {
          _id: employer._id,
          name: employer.name,
          email: employer.email,
          company: employer.company, // Include company if needed
        },
      });
    }
     else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional: Get employer profile
export const getEmployerProfile = async (req, res) => {
  const employer = await Employer.findById(req.user.id).select('-password');
  res.json(employer);
};
