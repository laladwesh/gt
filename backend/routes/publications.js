import { Router } from 'express';
import Publication from '../models/Publication.js';

const router = Router();

// GET /api/publications — returns all pubs grouped by type
router.get('/', async (req, res) => {
  try {
    const all = await Publication.find().sort({ order: 1 });

    res.json({
      journals:     all.filter(p => p.pubType === 'journal'),
      conferences:  all.filter(p => p.pubType === 'conference'),
      books:        all.filter(p => p.pubType === 'book'),
      bookChapters: all.filter(p => p.pubType === 'bookChapter'),
      patents:      all.filter(p => p.pubType === 'patent'),
      shortPapers:  all.filter(p => p.pubType === 'shortPaper'),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/publications/:type — returns pubs of a specific type
router.get('/:type', async (req, res) => {
  const validTypes = ['journal', 'conference', 'book', 'bookChapter', 'patent', 'shortPaper'];
  if (!validTypes.includes(req.params.type)) {
    return res.status(400).json({ error: 'Invalid publication type' });
  }
  try {
    const items = await Publication.find({ pubType: req.params.type }).sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
