import { Router } from 'express';
import Experience from '../models/Experience.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const items = await Experience.find().sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
