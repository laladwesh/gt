import { Router } from 'express';
import Download from '../models/Download.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const all = await Download.find().sort({ order: 1 });
    res.json({
      software: all.filter(d => d.category === 'software'),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
