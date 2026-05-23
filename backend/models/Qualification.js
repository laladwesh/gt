import mongoose from 'mongoose';

const qualificationSchema = new mongoose.Schema({
  degree:      { type: String, required: true },
  field:       String,
  institution: String,
  year:        String,
  order:       { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Qualification', qualificationSchema);
