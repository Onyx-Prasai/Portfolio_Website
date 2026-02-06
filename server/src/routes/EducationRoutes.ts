import express from 'express';
import { getEducations, createEducation, updateEducation, deleteEducation } from '../controllers/EducationController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEducations);
router.post('/', auth, createEducation);
router.put('/:id', auth, updateEducation);
router.delete('/:id', auth, deleteEducation);

export default router;
