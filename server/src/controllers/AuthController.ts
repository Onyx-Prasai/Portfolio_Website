import { Request, Response } from 'express';
import { supabase } from '../supabase.js';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        // Supabase Auth typically uses email. If the user uses username, 
        // we might need to map it or use a custom table.
        // For this integration, we'll assume the username is used as the email or 
        // that the user has set up Supabase Auth accordingly.
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: `${username}@portfolio.com`, // Mocking email if only username is provided
            password: password,
        });

        if (error) return res.status(401).json({ message: error.message });

        res.json({ 
            token: data.session?.access_token, 
            user: { 
                id: data.user?.id, 
                username: username 
            } 
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signUp({
            email: `${username}@portfolio.com`,
            password: password,
        });

        if (error) return res.status(400).json({ message: error.message });
        
        res.status(201).json({ message: 'User registered', user: data.user });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
