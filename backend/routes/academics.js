import { Router } from 'express';
import AcademicsSettings   from '../models/AcademicsSettings.js';
import InvitedTalk         from '../models/InvitedTalk.js';
import VisitingFaculty     from '../models/VisitingFaculty.js';
import ConferenceOrganized from '../models/ConferenceOrganized.js';
import FDP                 from '../models/FDP.js';
import WorkshopConducted   from '../models/WorkshopConducted.js';
import TrainingConducted   from '../models/TrainingConducted.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [settings, invitedTalks, visitingFaculty, workshops, fdps, workshopsConducted, training] =
      await Promise.all([
        AcademicsSettings.findOne(),
        InvitedTalk.find().sort({ order: 1 }),
        VisitingFaculty.find().sort({ order: 1 }),
        ConferenceOrganized.find().sort({ order: 1 }),
        FDP.find().sort({ order: 1 }),
        WorkshopConducted.find().sort({ order: 1 }),
        TrainingConducted.find().sort({ order: 1 }),
      ]);

    res.json({
      ...(settings?.toObject() ?? {}),
      invitedTalks,
      visitingFaculty,
      workshops,
      selectedFDPs:       fdps,
      workshopsConducted,
      trainingConducted:  training,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
