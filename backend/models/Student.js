import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  level: {
    type:     String,
    enum:     ['PhD', 'MTech', 'BTech'],
    required: true,
  },
  status: {
    type:    String,
    enum:    ['Ongoing', 'Completed', 'Thesis Submitted', 'Synopsis Held'],
    default: 'Ongoing',
  },
  // PhD ongoing fields
  bio:           String,
  coSupervisor:  String,
  yearOfJoining: String,
  // PhD completed fields
  yearCompleted: String,
  current:       String,
  area:          String,
  // General note (e.g. GATE AIR 1 for BTech)
  note:  String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
