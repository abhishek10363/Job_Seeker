import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cv: { type: String },
  coverLetter: { type: String },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
