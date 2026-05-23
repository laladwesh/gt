import mongoose from 'mongoose';

const conferenceOrganizedSchema = new mongoose.Schema({
  title: String,
  date:  String,
  role:  String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('ConferenceOrganized', conferenceOrganizedSchema);
