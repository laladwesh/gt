import mongoose from 'mongoose';

const fdpSchema = new mongoose.Schema({
  title:        String,
  coordinator:  String,
  startDate:    String,
  endDate:      String,
  participants: Number,
  order:        { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('FDP', fdpSchema);
