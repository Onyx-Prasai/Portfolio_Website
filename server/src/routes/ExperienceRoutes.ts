import express from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/ExperienceController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getExperiences);
router.post('/', auth, createExperience);
router.put('/:id', auth, updateExperience);
router.delete('/:id', auth, deleteExperience);

export default router;
