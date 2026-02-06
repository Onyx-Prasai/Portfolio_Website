import { Request, Response } from 'express';
import Experience from '../models/Experience.js';

export const getExperiences = async (req: Request, res: Response) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createExperience = async (req: Request, res: Response) => {
    const experience = new Experience(req.body);
    try {
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateExperience = async (req: Request, res: Response) => {
    try {
        const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExperience);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteExperience = async (req: Request, res: Response) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Experience deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
