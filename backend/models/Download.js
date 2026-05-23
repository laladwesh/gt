import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: String,
  link:        String,
  category:    { type: String, default: 'software' },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Download', downloadSchema);
