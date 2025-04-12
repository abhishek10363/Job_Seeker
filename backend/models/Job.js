import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
},{ timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
