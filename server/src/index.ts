import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { MongoMemoryServer } from 'mongodb-memory-server';

import projectRoutes from './routes/ProjectRoutes.js';
import experienceRoutes from './routes/ExperienceRoutes.js';
import educationRoutes from './routes/EducationRoutes.js';
import skillRoutes from './routes/SkillRoutes.js';
import conferenceRoutes from './routes/ConferenceRoutes.js';
import authRoutes from './routes/AuthRoutes.js';

import User from './models/User.js';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Education from './models/Education.js';
import Skill from './models/Skill.js';
import Conference from './models/Conference.js';

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
    res.send('Portfolio API is running with Zero-Config DB...');
});

async function autoSeed() {
    try {
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            console.log('Seeding initial admin account...');
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || '1234', 12);
            await User.create({
                username: process.env.ADMIN_USERNAME || 'onyx',
                password: hashedPassword
            });
            console.log('Admin account created: onyx / 1234 (Default)');

            // Seed initial data
            if (await Project.countDocuments() === 0) {
                await Project.insertMany([
                    { title: "Proxy Catcher", description: "High performance network tool designed for capturing and analyzing proxy traffic.", tags: ["C++", "Networking", "Systems"] },
                    { title: "Blood Prediction Model", description: "Machine learning model developed for predicting blood related health metrics and outcomes.", tags: ["Python", "ML", "HealthTech"] },
                    { title: "Global Weather Analyzer", description: "Created a tool to analyze global weather patterns.", tags: ["Python", "Data Analysis"] },
                    { title: "Onyx.h", description: "A C/C++ header library creation.", tags: ["C++", "Library"] },
                    { title: "Dockerized Dev_Cluster", description: "Containerized development environment set up using Docker.", tags: ["Docker", "DevOps"] },
                    { title: "learn_git", description: "A learning resource or tool associated with Git version control.", tags: ["Git", "Education"] },
                    { title: "Open Source Contribution", description: "Active contributor to open source projects.", tags: ["Open Source", "Collaboration"] }
                ]);
            }

            if (await Education.countDocuments() === 0) {
                await Education.insertMany([
                    { year: '2024 - Present', institution: 'Kantipur Engineering College', degree: 'Computer Engineering', description: 'Currently pursuing a degree in Computer Engineering.' },
                    { year: '2022', institution: 'Urbana School of Science', degree: 'Science', description: 'Completed higher secondary education in Science.' },
                    { year: '2013 - 2022', institution: 'The Excelsior School', degree: 'Schooling', description: 'Completed primary and secondary schooling.' }
                ]);
            }

            if (await Experience.countDocuments() === 0) {
                await Experience.insertMany([
                    { title: 'AI ART Prompting Competition', year: '2024', description: 'Won the competition.', organization: 'N/A' },
                    { title: 'AI Debate Competition', year: '2024', description: 'Participated as a competitor.', organization: 'N/A' },
                    { title: 'Nova Hackathon', year: '2026', description: 'Attended the hackathon.', organization: 'N/A' }
                ]);
            }

            if (await Skill.countDocuments() === 0) {
                await Skill.insertMany([
                    { name: 'Git/GitHub', category: 'Technical', level: 90 },
                    { name: 'C/C++', category: 'Technical', level: 85 },
                    { name: 'Docker', category: 'Technical', level: 80 },
                    { name: 'Python', category: 'Technical', level: 85 },
                    { name: 'HTML/CSS/JS', category: 'Technical', level: 90 },
                    { name: 'Figma', category: 'Technical', level: 75 },
                    { name: 'Canva', category: 'Technical', level: 70 },
                    { name: 'Teamwork', category: 'Soft Skills', level: 95 },
                    { name: 'Time Management', category: 'Soft Skills', level: 90 },
                    { name: 'Effective Communication', category: 'Soft Skills', level: 90 },
                    { name: 'Critical Thinking', category: 'Soft Skills', level: 85 },
                    { name: 'Writing', category: 'Soft Skills', level: 80 },
                    { name: 'Reading', category: 'Soft Skills', level: 85 }
                ]);
            }

            if (await Conference.countDocuments() === 0) {
                await Conference.insertMany([
                    { name: 'Notion workshop' },
                    { name: 'GDG conference 2025' },
                    { name: 'AI/ML bootcamp at KEC' },
                    { name: 'Bar Camp' },
                    { name: 'AWS workshops' },
                    { name: 'Antigenic AI workshop' },
                    { name: 'UBUCON ASIA 2025' },
                    { name: 'Azure and AWS cloud workshop' }
                ]);
            }
        }
    } catch (err) {
        console.error('Auto-seeding error:', err);
    }
}

async function startServer() {
    let mongoUri = process.env.MONGODB_URI;

    try {
        // Try connecting to provided URI first
        if (mongoUri) {
            await mongoose.connect(mongoUri);
            console.log('Connected to External/Local MongoDB');
        } else {
            throw new Error('No MONGODB_URI provided');
        }
    } catch (err) {
        console.log('Local/External MongoDB not found. Starting In-Memory Database...');
        const mongod = await MongoMemoryServer.create();
        mongoUri = mongod.getUri();
        await mongoose.connect(mongoUri);
        console.log('In-Memory MongoDB Started at:', mongoUri);
    }

    await autoSeed();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('--- Terminal Admin Access ---');
        console.log('Username: onyx');
        console.log('Password: 1234 (unless changed in .env)');
        console.log('-----------------------------');
    });
}

startServer();
