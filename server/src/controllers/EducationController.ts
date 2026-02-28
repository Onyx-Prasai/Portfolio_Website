import { Request, Response } from 'express';
import { supabase } from '../supabase.js';

export const getEducations = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('educations')
            .select('*')
            .order('year', { ascending: false });
        
        if (error) throw error;
        res.json(data.map(item => ({ ...item, _id: item.id })));
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createEducation = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('educations')
            .insert([req.body])
            .select()
            .single();
        
        if (error) throw error;
        res.status(201).json({ ...data, _id: data.id });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateEducation = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('educations')
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

export const deleteEducation = async (req: Request, res: Response) => {
    try {
        const { error } = await supabase
            .from('educations')
            .delete()
            .eq('id', req.params.id);
        
        if (error) throw error;
        res.json({ message: 'Education deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
