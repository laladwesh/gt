import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';

// ── Import models ──────────────────────────────────────────────────────────────
import Profile             from './models/Profile.js';
import HomeSettings        from './models/HomeSettings.js';
import Qualification       from './models/Qualification.js';
import Experience          from './models/Experience.js';
import AcademicsSettings   from './models/AcademicsSettings.js';
import InvitedTalk         from './models/InvitedTalk.js';
import VisitingFaculty     from './models/VisitingFaculty.js';
import ConferenceOrganized from './models/ConferenceOrganized.js';
import FDP                 from './models/FDP.js';
import WorkshopConducted   from './models/WorkshopConducted.js';
import TrainingConducted   from './models/TrainingConducted.js';
import Publication         from './models/Publication.js';
import Project             from './models/Project.js';
import Student             from './models/Student.js';
import Download            from './models/Download.js';

// ── Import routes ──────────────────────────────────────────────────────────────
import profileRoutes       from './routes/profile.js';
import homeRoutes          from './routes/home.js';
import qualificationsRoutes from './routes/qualifications.js';
import experienceRoutes    from './routes/experience.js';
import academicsRoutes     from './routes/academics.js';
import publicationsRoutes  from './routes/publications.js';
import projectsRoutes      from './routes/projects.js';
import studentsRoutes      from './routes/students.js';
import downloadsRoutes     from './routes/downloads.js';

const PORT       = process.env.PORT       || 5000;
const MONGO_URI  = process.env.MONGO_URI  || 'mongodb://localhost:27017/trivedi';
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || 'admin@trivedi.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecret_change_me';

// ── Register AdminJS Mongoose adapter ─────────────────────────────────────────
AdminJS.registerAdapter(AdminJSMongoose);

// ── Connect to MongoDB ─────────────────────────────────────────────────────────
await mongoose.connect(MONGO_URI);
console.log('MongoDB connected');

// ── AdminJS configuration ──────────────────────────────────────────────────────
const admin = new AdminJS({
  resources: [
    // ─ Site Settings ──────────────────────────────────────────────────────────
    {
      resource: Profile,
      options:  {
        navigation: { name: 'Site Settings', icon: 'User' },
        properties: { _id: { isVisible: false } },
      },
    },
    {
      resource: HomeSettings,
      options:  {
        navigation: { name: 'Site Settings', icon: 'Home' },
        properties: { _id: { isVisible: false } },
      },
    },
    // ─ Profile ────────────────────────────────────────────────────────────────
    {
      resource: Qualification,
      options:  {
        navigation: { name: 'Profile', icon: 'Education' },
        listProperties: ['degree', 'field', 'institution', 'year', 'order'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
    {
      resource: Experience,
      options:  {
        navigation: { name: 'Profile', icon: 'Briefcase' },
        listProperties: ['role', 'nature', 'period', 'order'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
    // ─ Academics ──────────────────────────────────────────────────────────────
    {
      resource: AcademicsSettings,
      options:  {
        navigation: { name: 'Academics', icon: 'Book' },
        properties: { _id: { isVisible: false } },
      },
    },
    {
      resource: InvitedTalk,
      options:  {
        navigation: { name: 'Academics', icon: 'Microphone' },
        listProperties: ['title', 'venue', 'date', 'order'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
    {
      resource: VisitingFaculty,
      options:  {
        navigation: { name: 'Academics', icon: 'School' },
        listProperties: ['role', 'org', 'period', 'order'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
    {
      resource: ConferenceOrganized,
      options:  {
        navigation: { name: 'Academics', icon: 'Calendar' },
        listProperties: ['title', 'date', 'role', 'order'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
    {
      resource: FDP,
      options:  {
        navigation: { name: 'Academics', icon: 'ChalkboardTeacher' },
        listProperties: ['title', 'coordinator', 'startDate', 'endDate', 'participants', 'order'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
    {
      resource: WorkshopConducted,
      options:  {
        navigation: { name: 'Academics', icon: 'Wrench' },
        listProperties: ['title', 'venue', 'startDate', 'endDate', 'participants', 'order'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
    {
      resource: TrainingConducted,
      options:  {
        navigation: { name: 'Academics', icon: 'Certificate' },
        listProperties: ['title', 'venue', 'startDate', 'endDate', 'participants', 'order'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
    // ─ Publications ───────────────────────────────────────────────────────────
    {
      resource: Publication,
      options:  {
        navigation: { name: 'Publications', icon: 'Document' },
        listProperties: ['pubType', 'authors', 'title', 'venue', 'year'],
        filterProperties: ['pubType', 'year', 'award'],
        sort: { sortBy: 'year', direction: 'desc' },
      },
    },
    // ─ Projects ───────────────────────────────────────────────────────────────
    {
      resource: Project,
      options:  {
        navigation: { name: 'Projects', icon: 'Folder' },
        listProperties: ['projectType', 'title', 'agency', 'status', 'order'],
        filterProperties: ['projectType', 'status'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
    // ─ Students ───────────────────────────────────────────────────────────────
    {
      resource: Student,
      options:  {
        navigation: { name: 'Students', icon: 'Users' },
        listProperties: ['name', 'level', 'status', 'yearOfJoining', 'coSupervisor'],
        filterProperties: ['level', 'status'],
        sort: { sortBy: 'level', direction: 'asc' },
      },
    },
    // ─ Downloads ──────────────────────────────────────────────────────────────
    {
      resource: Download,
      options:  {
        navigation: { name: 'Downloads', icon: 'Download' },
        listProperties: ['name', 'description', 'category', 'link', 'order'],
        sort: { sortBy: 'order', direction: 'asc' },
      },
    },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Prof. Gaurav Trivedi — Admin',
    favicon:     '/favicon.ico',
    logo:        false,
    theme: {
      colors: {
        primary100: '#1a56db',
        primary80:  '#1c64f2',
        primary60:  '#3f83f8',
      },
    },
  },
});

// ── Build authenticated admin router ──────────────────────────────────────────
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: async (email, password) => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return { email };
      }
      return null;
    },
    cookieName:     'adminjs_session',
    cookiePassword: SESSION_SECRET,
  },
  null,
  {
    store:          MongoStore.create({ mongoUrl: MONGO_URI }),
    resave:         false,
    saveUninitialized: false,
    secret:         SESSION_SECRET,
    cookie:         { httpOnly: true, secure: false },
  },
);

// ── Express app ───────────────────────────────────────────────────────────────
const app = express();

app.use(admin.options.rootPath, adminRouter);

app.use(cors({
  origin:      true,
  credentials: true,
}));
app.use(express.json());

// ── API routes ─────────────────────────────────────────────────────────────────
app.use('/api/profile',        profileRoutes);
app.use('/api/home',           homeRoutes);
app.use('/api/qualifications', qualificationsRoutes);
app.use('/api/experience',     experienceRoutes);
app.use('/api/academics',      academicsRoutes);
app.use('/api/publications',   publicationsRoutes);
app.use('/api/projects',       projectsRoutes);
app.use('/api/students',       studentsRoutes);
app.use('/api/downloads',      downloadsRoutes);

app.get('/', (_req, res) => res.json({ message: 'Trivedi portfolio API is running' }));

// ── Start ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🛡  Admin panel at  http://localhost:${PORT}/admin`);
});
