import { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface EducationData {
    degree: string;
    institution: string;
    year: string;
}

interface SkillData {
    name: string;
    category: string;
}

const DEFAULT_EDUCATION: EducationData[] = [
    { degree: "Computer Engineering", institution: "Kantipur Engineering College", year: "2024 Present" },
    { degree: "Science", institution: "Urbana School of Science", year: "2022" },
    { degree: "Schooling", institution: "The Excelsior School", year: "2013 2022" }
];

const DEFAULT_SKILLS: SkillData[] = [
    { name: 'Git/GitHub', category: 'Technical' },
    { name: 'C/C++', category: 'Technical' },
    { name: 'Docker', category: 'Technical' },
    { name: 'Python', category: 'Technical' },
    { name: 'HTML/CSS/JS', category: 'Technical' },
    { name: 'Figma', category: 'Technical' },
    { name: 'Canva', category: 'Technical' },
    { name: 'Teamwork', category: 'Soft Skills' },
    { name: 'Time Management', category: 'Soft Skills' },
    { name: 'Effective Communication', category: 'Soft Skills' },
    { name: 'Critical Thinking', category: 'Soft Skills' },
    { name: 'Writing', category: 'Soft Skills' },
    { name: 'Reading', category: 'Soft Skills' }
];

const About = () => {
    const [educations, setEducations] = useState<EducationData[]>(DEFAULT_EDUCATION);
    const [skills, setSkills] = useState<SkillData[]>(DEFAULT_SKILLS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eduRes, skillRes] = await Promise.all([
                    api.get('/educations'),
                    api.get('/skills')
                ]);
                if (eduRes.data && eduRes.data.length > 0) setEducations(eduRes.data);
                if (skillRes.data && skillRes.data.length > 0) setSkills(skillRes.data);
            } catch (err) {
                console.error("Failed to fetch about data, using fallbacks:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <section id="about" className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-transparent relative z-10">
            <motion.div
                className="max-w-4xl w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-secondary/10 flex-grow"></div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-4xl font-bold text-secondary font-serif uppercase tracking-wider">About Me</h2>
                        {loading && <Loader2 size={16} className="text-accent animate-spin mt-2" />}
                    </div>
                    <div className="h-px bg-secondary/10 flex-grow"></div>
                </div>

                <div className="border border-secondary/10 bg-primary/50 backdrop-blur-sm p-8 rounded-sm shadow-sm">
                    <p className="text-lg text-secondary/80 leading-relaxed mb-6 font-serif">
                        I am a Computer Engineering student at Kantipur Engineering College focused on <span className="text-accent italic">AI, Machine Learning, and DevOps</span>.
                        I strive to find harmony between complex logic and minimalist design, believing that the most powerful systems are those that feel natural and intuitive.
                    </p>
                    <p className="text-lg text-secondary/80 leading-relaxed mb-6 font-serif border-l-2 border-secondary/5 pl-6 italic">
                        Beyond the code, I am fascinated by the intersection of traditional artistry and modern computation. Whether I'm optimizing a neural network or fine tuning a user interface, my goal is to create digital experiences that resonate with a sense of purpose and peace.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        {educations.length > 0 && (
                            <div className="p-6 border-l-2 border-accent">
                                <h3 className="font-semibold text-accent mb-4 font-serif text-xl border-b border-accent/20 pb-2">Education</h3>
                                <ul className="text-sm text-tertiary space-y-3 font-serif">
                                    {educations.map((edu, i) => (
                                        <li key={i}>
                                            <span className="text-secondary font-bold block">{edu.year}</span> {edu.institution}
                                            <div className="text-accent/70 text-xs italic">{edu.degree}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {Object.keys(skillsByCategory).length > 0 && (
                            <div className="p-6 border-l-2 border-accent">
                                <h3 className="font-semibold text-accent mb-4 font-serif text-xl border-b border-accent/20 pb-2">Skills</h3>
                                <div className="space-y-6">
                                    {Object.entries(skillsByCategory).map(([category, names]) => (
                                        <div key={category}>
                                            <h4 className="text-xs uppercase tracking-[0.2em] text-tertiary mb-3 font-sans opacity-70">{category}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {names.map((skill) => (
                                                    <span key={skill} className="px-3 py-1 border border-secondary/20 text-secondary/80 rounded-sm text-xs font-serif hover:border-accent hover:text-accent transition-all duration-300">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
