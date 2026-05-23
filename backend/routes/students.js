import { Router } from 'express';
import Student from '../models/Student.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const all = await Student.find().sort({ order: 1 });

    res.json({
      ongoingPhD: all.filter(s =>
        s.level === 'PhD' && ['Ongoing', 'Thesis Submitted', 'Synopsis Held'].includes(s.status)
      ),
      completedPhD:    all.filter(s => s.level === 'PhD'   && s.status === 'Completed'),
      mtechOngoing:    all.filter(s => s.level === 'MTech' && s.status === 'Ongoing'),
      mtechCompleted:  all.filter(s => s.level === 'MTech' && s.status === 'Completed'),
      btechOngoing:    all.filter(s => s.level === 'BTech' && s.status === 'Ongoing'),
      btechCompleted:  all.filter(s => s.level === 'BTech' && s.status === 'Completed'),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
