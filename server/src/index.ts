import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabase.js';

import projectRoutes from './routes/ProjectRoutes.js';
import experienceRoutes from './routes/ExperienceRoutes.js';
import educationRoutes from './routes/EducationRoutes.js';
import skillRoutes from './routes/SkillRoutes.js';
import conferenceRoutes from './routes/ConferenceRoutes.js';
import authRoutes from './routes/AuthRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/educations', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/conferences', conferenceRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Portfolio API is running with Supabase Backend...');
});

async function autoSeed() {
    try {
        const adminEmail = `${process.env.ADMIN_USERNAME || 'onyx'}@portfolio.com`;
        const adminPass = process.env.ADMIN_PASSWORD || '1234';

        console.log(`Checking for admin account: ${adminEmail}...`);
        
        // Check if admin exists in Supabase (using listUsers admin API)
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        
        if (listError) {
            console.error('Error listing users (check if SERVICE_ROLE_KEY is correct):', listError.message);
            return;
        }

        const adminExists = users.find(u => u.email === adminEmail);

        if (!adminExists) {
            console.log('Seeding initial Supabase admin account...');
            const { error: createError } = await supabase.auth.admin.createUser({
                email: adminEmail,
                password: adminPass,
                email_confirm: true,
                user_metadata: { username: process.env.ADMIN_USERNAME || 'onyx' }
            });

            if (createError) {
                console.error('Error creating admin user:', createError.message);
            } else {
                console.log(`Admin account created: ${process.env.ADMIN_USERNAME || 'onyx'} / ${adminPass}`);
            }
        } else {
            console.log('Admin account already exists in Supabase.');
        }

        // Note: Seeding initial data (Projects, Skills, etc.) should be done 
        // via the Supabase SQL editor or a separate migration script 
        // since we are now using a persistent Postgres DB.
    } catch (err) {
        console.error('Auto-seeding error:', err);
    }
}

async function startServer() {
    // We no longer strictly need MongoDB for the main features, 
    // but keeping it optional for any legacy parts.
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to Legacy MongoDB (Optional)');
        } catch (err) {
            console.warn('Legacy MongoDB connection failed, proceeding with Supabase only.');
        }
    }

    await autoSeed();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('--- Supabase Admin Access ---');
        console.log(`Username: ${process.env.ADMIN_USERNAME || 'onyx'}`);
        console.log(`Password: ${process.env.ADMIN_PASSWORD || '1234'}`);
        console.log('-----------------------------');
    });
}

startServer();
