import express from 'express';
import { getConferences, createConference, updateConference, deleteConference } from '../controllers/ConferenceController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getConferences);
router.post('/', auth, createConference);
router.put('/:id', auth, updateConference);
router.delete('/:id', auth, deleteConference);

export default router;
