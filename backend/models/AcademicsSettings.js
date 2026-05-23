import mongoose from 'mongoose';

const supervisionCountSchema = new mongoose.Schema({
  completed: Number,
  submitted: Number,
  synopsis:  Number,
  ongoing:   Number,
}, { _id: false });

const basicCountSchema = new mongoose.Schema({
  completed: Number,
  ongoing:   Number,
}, { _id: false });

const academicsSettingsSchema = new mongoose.Schema({
  ugCourses:                   [String],
  pgCourses:                   [String],
  electiveCourses:             [String],
  coursesTaught:               [String],
  projectSupervision: {
    phd:   supervisionCountSchema,
    mtech: basicCountSchema,
    btech: basicCountSchema,
  },
  skillDevelopmentSummary:     String,
  skillDevelopmentExamples:    [String],
  academicOutreachHighlights:  [String],
  professionalMemberships:     [String],
  professionalRoles:           [String],
}, { timestamps: true });

export default mongoose.model('AcademicsSettings', academicsSettingsSchema);
