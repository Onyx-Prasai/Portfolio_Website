import { Request, Response } from 'express';
import Project from '../models/Project.js';

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
