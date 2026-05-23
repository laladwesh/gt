import { Router } from 'express';
import Qualification from '../models/Qualification.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const items = await Qualification.find().sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
