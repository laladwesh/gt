import mongoose from 'mongoose';

const visitingFacultySchema = new mongoose.Schema({
  role:   String,
  org:    String,
  period: String,
  order:  { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('VisitingFaculty', visitingFacultySchema);
