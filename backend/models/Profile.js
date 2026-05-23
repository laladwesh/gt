import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  gender:         String,
  dob:            String,
  title:          String,
  department:     String,
  institution:    String,
  address:        String,
  email1:         String,
  email2:         String,
  phone:          String,
  skype:          String,
  officeLocation: String,
  officeHours:    String,
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
