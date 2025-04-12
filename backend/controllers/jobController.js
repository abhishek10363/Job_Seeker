import Job from '../models/Job.js';

// Create a new job
export const createJob = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    const job = new Job({
      title,
      description,
      location,
      employer: req.employer._id
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name company');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

// Get a job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name company');
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job' });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Fix: Ensure employer is correctly checked
    if (job.employer.toString() === req.employer._id.toString()) {
      job.title = title || job.title;
      job.description = description || job.description;
      job.location = location || job.location;

      const updatedJob = await job.save();
      res.json(updatedJob);
    } else {
      res.status(403).json({ message: 'Unauthorized to update this job' });
    }
  } catch (error) {
    console.error(error); // Log error details
    res.status(500).json({ message: 'Failed to update job' });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    // Find the job by ID
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Ensure the employer is authorized to delete the job
    if (job.employer.toString() === req.employer._id.toString()) {
      // Delete the job
      await job.deleteOne();
      res.json({ message: 'Job deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Unauthorized to delete this job' });
    }
  } catch (error) {
    console.error(error); // Log error details
    res.status(500).json({ message: 'Failed to delete job' });
  }
};


export const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.employer._id }); // Capitalized Job model
    res.json(jobs);
  } catch (error) {
    console.error(error); // Logs the error in console
    res.status(500).json({ message: "Server error" });
  }
};
