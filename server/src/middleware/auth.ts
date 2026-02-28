import { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabase.js';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        // Use Supabase to verify the token and get the user
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        (req as any).user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authorization error' });
    }
};
