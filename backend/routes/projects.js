import { Router } from 'express';
import Project from '../models/Project.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const all = await Project.find().sort({ order: 1 });
    res.json({
      sponsored:   all.filter(p => p.projectType === 'sponsored'),
      consultancy: all.filter(p => p.projectType === 'consultancy'),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
