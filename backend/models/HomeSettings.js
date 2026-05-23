import mongoose from 'mongoose';

const researchAreaSchema = new mongoose.Schema({
  iconKey: String,
  title:   String,
  desc:    String,
}, { _id: false });

const statSchema = new mongoose.Schema({
  number: String,
  label:  String,
}, { _id: false });

const announcementSchema = new mongoose.Schema({
  tag:          String,
  title:        String,
  dateTime:     String,
  body:         String,
  note:         String,
  instructions: [String],
  footer:       String,
}, { _id: false });

const homeSettingsSchema = new mongoose.Schema({
  quote:         String,
  quoteAuthor:   String,
  researchAreas: [researchAreaSchema],
  stats:         [statSchema],
  announcement:  announcementSchema,
}, { timestamps: true });

export default mongoose.model('HomeSettings', homeSettingsSchema);
