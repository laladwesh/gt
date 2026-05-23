import { Router } from 'express';
import Profile from '../models/Profile.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
