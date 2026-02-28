import { Request, Response } from 'express';
import { supabase } from '../supabase.js';

export const getExperiences = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .order('year', { ascending: false });
        
        if (error) throw error;
        res.json(data.map(item => ({ ...item, _id: item.id })));
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createExperience = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('experiences')
            .insert([req.body])
            .select()
            .single();
        
        if (error) throw error;
        res.status(201).json({ ...data, _id: data.id });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateExperience = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('experiences')
            .update(req.body)
            .eq('id', req.params.id)
            .select()
            .single();
        
        if (error) throw error;
        res.json({ ...data, _id: data.id });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteExperience = async (req: Request, res: Response) => {
    try {
        const { error } = await supabase
            .from('experiences')
            .delete()
            .eq('id', req.params.id);
        
        if (error) throw error;
        res.json({ message: 'Experience deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
