import Application from '../models/Application.js';
import Job from '../models/Job.js';

// @desc Submit job application
export const submitApplication = async (req, res) => {
  const { name, email, coverLetter } = req.body;
  const jobId = req.params.jobId;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const application = await Application.create({
      name,
      email,
      coverLetter,
      cv: req.file ? req.file.path : '',
      jobId
    });
    
    

    res.status(201).json({ message: 'Application submitted', application });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application', error });
  }
};