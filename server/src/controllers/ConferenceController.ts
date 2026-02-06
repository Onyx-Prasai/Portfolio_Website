import { Request, Response } from 'express';
import Conference from '../models/Conference.js';

export const getConferences = async (req: Request, res: Response) => {
    try {
        const conferences = await Conference.find().sort({ createdAt: -1 });
        res.json(conferences);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createConference = async (req: Request, res: Response) => {
    const conference = new Conference(req.body);
    try {
        const newConference = await conference.save();
        res.status(201).json(newConference);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateConference = async (req: Request, res: Response) => {
    try {
        const updatedConference = await Conference.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedConference);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteConference = async (req: Request, res: Response) => {
    try {
        await Conference.findByIdAndDelete(req.params.id);
        res.json({ message: 'Conference deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
