import { Request, Response } from 'express';
import Education from '../models/Education.js';

export const getEducations = async (req: Request, res: Response) => {
    try {
        const educations = await Education.find().sort({ createdAt: -1 });
        res.json(educations);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createEducation = async (req: Request, res: Response) => {
    const education = new Education(req.body);
    try {
        const newEducation = await education.save();
        res.status(201).json(newEducation);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateEducation = async (req: Request, res: Response) => {
    try {
        const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEducation);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEducation = async (req: Request, res: Response) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Education deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
