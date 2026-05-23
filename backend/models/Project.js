import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectType: {
    type:     String,
    enum:     ['sponsored', 'consultancy'],
    required: true,
  },
  title:   { type: String, required: true },
  joint:   String,
  agency:  String,
  duration: String,
  status:  String,
  note:    String,
  website: String,
  order:   { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
