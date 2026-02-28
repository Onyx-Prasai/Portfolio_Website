import { Request, Response } from 'express';
import { supabase } from '../supabase.js';

export const getConferences = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('conferences')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        res.json(data.map(item => ({ ...item, _id: item.id })));
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createConference = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('conferences')
            .insert([req.body])
            .select()
            .single();
        
        if (error) throw error;
        res.status(201).json({ ...data, _id: data.id });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateConference = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('conferences')
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

export const deleteConference = async (req: Request, res: Response) => {
    try {
        const { error } = await supabase
            .from('conferences')
            .delete()
            .eq('id', req.params.id);
        
        if (error) throw error;
        res.json({ message: 'Conference deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
