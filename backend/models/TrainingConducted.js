import mongoose from 'mongoose';

const trainingConductedSchema = new mongoose.Schema({
  title:        String,
  startDate:    String,
  endDate:      String,
  venue:        String,
  participants: Number,
  order:        { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('TrainingConducted', trainingConductedSchema);
