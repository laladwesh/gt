import { Router } from 'express';
import Student from '../models/Student.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const all = await Student.find().sort({ order: 1 });

    res.json({
      // PhD ongoing — full objects (name, status, bio, coSupervisor, yearOfJoining, area)
      ongoingPhD: all
        .filter(s => s.level === 'PhD' && ['Ongoing', 'Thesis Submitted', 'Synopsis Held'].includes(s.status))
        .map(s => ({
          name:          s.name,
          status:        s.status,
          bio:           s.bio,
          coSupervisor:  s.coSupervisor,
          yearOfJoining: s.yearOfJoining,
          area:          s.area,
        })),

      // PhD completed — year comes from yearCompleted in DB
      completedPhD: all
        .filter(s => s.level === 'PhD' && s.status === 'Completed')
        .map(s => ({
          name:    s.name,
          year:    s.yearCompleted,   // mapped so frontend s.year works
          current: s.current,
          area:    s.area,
        })),

      // MTech — plain name strings (frontend iterates as `name` variable)
      mtechOngoing:   all.filter(s => s.level === 'MTech' && s.status === 'Ongoing').map(s => s.name),
      mtechCompleted: all.filter(s => s.level === 'MTech' && s.status === 'Completed').map(s => s.name),

      // BTech ongoing — {name, year}  (year stored as yearOfJoining)
      btechOngoing: all
        .filter(s => s.level === 'BTech' && s.status === 'Ongoing')
        .map(s => ({ name: s.name, year: s.yearOfJoining })),

      // BTech completed — {name, year, note}  (year stored as yearCompleted)
      btechCompleted: all
        .filter(s => s.level === 'BTech' && s.status === 'Completed')
        .map(s => ({ name: s.name, year: s.yearCompleted, note: s.note })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
