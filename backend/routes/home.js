import { Router } from 'express';
import HomeSettings from '../models/HomeSettings.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const home = await HomeSettings.findOne();
    res.json(home);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
