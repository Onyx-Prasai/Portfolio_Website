import { Request, Response } from 'express';
import Skill from '../models/Skill.js';

export const getSkills = async (req: Request, res: Response) => {
    try {
        const skills = await Skill.find().sort({ category: 1, name: 1 });
        res.json(skills);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createSkill = async (req: Request, res: Response) => {
    const skill = new Skill(req.body);
    try {
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSkill = async (req: Request, res: Response) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSkill);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSkill = async (req: Request, res: Response) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
