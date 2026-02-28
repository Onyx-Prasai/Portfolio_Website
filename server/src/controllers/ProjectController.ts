import { Request, Response } from 'express';
import { supabase } from '../supabase.js';

const mapToFrontend = (data: any) => ({
    ...data,
    _id: data.id,
    githubLink: data.github_link,
    demoLink: data.demo_link
});

const mapToDB = (data: any) => {
    const { _id, githubLink, demoLink, ...rest } = data;
    return {
        ...rest,
        github_link: githubLink,
        demo_link: demoLink
    };
};

export const getProjects = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        res.json(data.map(mapToFrontend));
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .insert([mapToDB(req.body)])
            .select()
            .single();
        
        if (error) throw error;
        res.status(201).json(mapToFrontend(data));
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .update(mapToDB(req.body))
            .eq('id', req.params.id)
            .select()
            .single();
        
        if (error) throw error;
        res.json(mapToFrontend(data));
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', req.params.id);
        
        if (error) throw error;
        res.json({ message: 'Project deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
