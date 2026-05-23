/**
 * seed.js — Run once to migrate siteData.json → MongoDB
 * Usage:  npm run seed
 */
import 'dotenv/config';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

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

const __dirname = dirname(fileURLToPath(import.meta.url));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trivedi';

// In Docker  → copied to ./data/siteData.json by the Dockerfile
// Locally    → falls back to ../src/data/siteData.json
const localPath  = join(__dirname, './data/siteData.json');
const srcPath    = join(__dirname, '../src/data/siteData.json');
const jsonPath   = existsSync(localPath) ? localPath : srcPath;
// Strip UTF-8 BOM (﻿) if present — siteData.json is saved with BOM
const raw  = readFileSync(jsonPath, 'utf-8').replace(/^﻿/, '');
const data = JSON.parse(raw);

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // ── Clear all collections ────────────────────────────────────────────────────
  await Promise.all([
    Profile.deleteMany({}),
    HomeSettings.deleteMany({}),
    Qualification.deleteMany({}),
    Experience.deleteMany({}),
    AcademicsSettings.deleteMany({}),
    InvitedTalk.deleteMany({}),
    VisitingFaculty.deleteMany({}),
    ConferenceOrganized.deleteMany({}),
    FDP.deleteMany({}),
    WorkshopConducted.deleteMany({}),
    TrainingConducted.deleteMany({}),
    Publication.deleteMany({}),
    Project.deleteMany({}),
    Student.deleteMany({}),
    Download.deleteMany({}),
  ]);
  console.log('🗑  Cleared all collections');

  // ── 1. Profile ───────────────────────────────────────────────────────────────
  await Profile.create(data.profile);
  console.log('✔ Profile');

  // ── 2. Home settings ─────────────────────────────────────────────────────────
  await HomeSettings.create(data.home);
  console.log('✔ HomeSettings');

  // ── 3. Qualifications ────────────────────────────────────────────────────────
  // Use top-level qualifications (not the duplicate inside academics)
  await Qualification.insertMany(
    data.qualifications.map((q, i) => ({ ...q, year: String(q.year), order: i }))
  );
  console.log('✔ Qualifications');

  // ── 4. Experience ────────────────────────────────────────────────────────────
  await Experience.insertMany(
    data.experience.map((e, i) => ({ ...e, order: i }))
  );
  console.log('✔ Experience');

  // ── 5. Academics settings (singleton) ────────────────────────────────────────
  const ac = data.academics;
  await AcademicsSettings.create({
    ugCourses:                  ac.ugCourses   ?? [],
    pgCourses:                  ac.pgCourses   ?? [],
    electiveCourses:            ac.electiveCourses ?? [],
    coursesTaught:              ac.coursesTaught   ?? [],
    projectSupervision:         ac.projectSupervision ?? {},
    skillDevelopmentSummary:    ac.skillDevelopment?.summary    ?? '',
    skillDevelopmentExamples:   ac.skillDevelopment?.examples   ?? [],
    academicOutreachHighlights: ac.academicOutreach?.highlights ?? [],
    professionalMemberships:    ac.professionalActivities?.membership ?? [],
    professionalRoles:          ac.professionalActivities?.roles ?? [],
  });
  console.log('✔ AcademicsSettings');

  // ── 6. Invited Talks ─────────────────────────────────────────────────────────
  await InvitedTalk.insertMany(
    (ac.invitedTalks ?? []).map((t, i) => ({ ...t, order: i }))
  );
  console.log('✔ InvitedTalks');

  // ── 7. Visiting Faculty ──────────────────────────────────────────────────────
  await VisitingFaculty.insertMany(
    (ac.visitingFaculty ?? []).map((v, i) => ({ ...v, order: i }))
  );
  console.log('✔ VisitingFaculty');

  // ── 8. Conferences Organised ─────────────────────────────────────────────────
  await ConferenceOrganized.insertMany(
    (ac.workshops ?? []).map((w, i) => ({ ...w, order: i }))
  );
  console.log('✔ ConferencesOrganised');

  // ── 9. FDPs ──────────────────────────────────────────────────────────────────
  await FDP.insertMany(
    (ac.selectedFDPs ?? []).map((f, i) => ({ ...f, order: i }))
  );
  console.log('✔ FDPs');

  // ── 10. Workshops Conducted ──────────────────────────────────────────────────
  await WorkshopConducted.insertMany(
    (ac.workshopsConducted ?? []).map((w, i) => ({ ...w, order: i }))
  );
  console.log('✔ WorkshopsConducted');

  // ── 11. Training Conducted ───────────────────────────────────────────────────
  await TrainingConducted.insertMany(
    (ac.trainingConducted ?? []).map((t, i) => ({ ...t, order: i }))
  );
  console.log('✔ TrainingConducted');

  // ── 12. Publications ─────────────────────────────────────────────────────────
  const pubs = data.publications;

  const books = (pubs.books ?? []).map((p, i) => ({
    pubType: 'book', authors: p.authors, title: p.title,
    venue: p.venue, year: String(p.year ?? ''), note: p.note, isbn: p.isbn, order: i,
  }));

  const bookChapters = (pubs.bookChapters ?? []).map((p, i) => ({
    pubType: 'bookChapter', authors: p.authors, title: p.title,
    venue: p.venue, year: String(p.year ?? ''), pages: p.pages, doi: p.doi, note: p.note, order: i,
  }));

  const patents = (pubs.patents ?? []).map((p, i) => ({
    pubType: 'patent', inventors: p.inventors, title: p.title,
    number: p.number, status: p.status, note: p.note, order: i,
  }));

  const journals = (pubs.journals ?? []).map((p, i) => ({
    pubType: 'journal', authors: p.authors, title: p.title,
    venue: p.venue, year: String(p.year ?? ''), volume: p.volume,
    issue: p.issue, pages: p.pages, doi: p.doi, order: i,
  }));

  const conferences = (pubs.conferences ?? []).map((p, i) => ({
    pubType: 'conference', authors: p.authors, title: p.title,
    venue: p.venue, year: String(p.year ?? ''), pages: p.pages,
    doi: p.doi, note: p.note, award: p.award, order: i,
  }));

  const shortPapers = (pubs.shortPapers ?? []).map((p, i) => ({
    pubType: 'shortPaper', authors: p.authors, title: p.title,
    venue: p.venue, paperType: p.type, order: i,
  }));

  await Publication.insertMany([
    ...books, ...bookChapters, ...patents, ...journals, ...conferences, ...shortPapers,
  ]);
  console.log('✔ Publications');

  // ── 13. Projects ─────────────────────────────────────────────────────────────
  const sponsored = (data.projects?.sponsored ?? []).map((p, i) => ({
    projectType: 'sponsored', ...p, order: i,
  }));
  const consultancy = (data.projects?.consultancy ?? []).map((p, i) => ({
    projectType: 'consultancy', ...p, order: i,
  }));
  await Project.insertMany([...sponsored, ...consultancy]);
  console.log('✔ Projects');

  // ── 14. Students ─────────────────────────────────────────────────────────────
  const st = data.students;

  const ongoingPhD = (st.ongoingPhD ?? []).map((s, i) => ({
    ...s,
    level:  'PhD',
    status: s.status ?? 'Ongoing',
    order:  i,
  }));

  const completedPhD = (st.completedPhD ?? []).map((s, i) => ({
    name:          s.name,
    level:         'PhD',
    status:        'Completed',
    yearCompleted: String(s.year ?? ''),
    current:       s.current,
    area:          s.area,
    order:         i,
  }));

  const mtechOngoing = (st.mtechOngoing ?? []).map((nameOrObj, i) => ({
    name:   typeof nameOrObj === 'string' ? nameOrObj : nameOrObj.name,
    level:  'MTech',
    status: 'Ongoing',
    order:  i,
  }));

  const mtechCompleted = (st.mtechCompleted ?? []).map((nameOrObj, i) => ({
    name:   typeof nameOrObj === 'string' ? nameOrObj : nameOrObj.name,
    level:  'MTech',
    status: 'Completed',
    order:  i,
  }));

  const btechOngoing = (st.btechOngoing ?? []).map((s, i) => ({
    name:          s.name,
    level:         'BTech',
    status:        'Ongoing',
    yearOfJoining: String(s.year ?? ''),
    order:         i,
  }));

  const btechCompleted = (st.btechCompleted ?? []).map((s, i) => ({
    name:          s.name,
    level:         'BTech',
    status:        'Completed',
    yearCompleted: String(s.year ?? ''),
    note:          s.note,
    order:         i,
  }));

  await Student.insertMany([
    ...ongoingPhD, ...completedPhD,
    ...mtechOngoing, ...mtechCompleted,
    ...btechOngoing, ...btechCompleted,
  ]);
  console.log('✔ Students');

  // ── 15. Downloads ────────────────────────────────────────────────────────────
  await Download.insertMany(
    (data.downloads?.software ?? []).map((d, i) => ({ ...d, category: 'software', order: i }))
  );
  console.log('✔ Downloads');

  console.log('\n🎉 Seeding complete! All data migrated to MongoDB.');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
