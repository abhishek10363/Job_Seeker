import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define schema for Employer
const employerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},{ timestamps: true });

// Hash password before saving to database
employerSchema.pre('save', async function () {
  // Only hash if password is newly set or changed
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create and export the model correctly
const Employer = mongoose.model('Employer', employerSchema);
export default Employer;
