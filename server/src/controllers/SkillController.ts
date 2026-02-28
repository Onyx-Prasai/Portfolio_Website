import { Request, Response } from 'express';
import { supabase } from '../supabase.js';

export const getSkills = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('category', { ascending: true })
            .order('name', { ascending: true });
        
        if (error) throw error;
        
        // Map id to _id for frontend compatibility if needed
        const mappedData = data.map(item => ({ ...item, _id: item.id }));
        res.json(mappedData);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createSkill = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('skills')
            .insert([req.body])
            .select()
            .single();
        
        if (error) throw error;
        res.status(201).json({ ...data, _id: data.id });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSkill = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('skills')
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

export const deleteSkill = async (req: Request, res: Response) => {
    try {
        const { error } = await supabase
            .from('skills')
            .delete()
            .eq('id', req.params.id);
        
        if (error) throw error;
        res.json({ message: 'Skill deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
