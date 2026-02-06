import { useState, useEffect } from 'react';
import api from '../../api';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
    _id: string;
    name: string;
    category: string;
    level?: number;
}

const SkillManager = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/skills');
            setSkills(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentSkill._id) {
                await api.put(`/skills/${currentSkill._id}`, currentSkill);
            } else {
                await api.post('/skills', currentSkill);
            }
            setIsEditing(false);
            setCurrentSkill({});
            fetchSkills();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await api.delete(`/skills/${id}`);
                fetchSkills();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="space-y-16">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-light uppercase tracking-tight text-secondary leading-none">
                        Technical <span className="font-bold">Aura</span>
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-tertiary opacity-40 italic">Inventory of core proficiencies</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setCurrentSkill({ category: 'Frontend', level: 80 }); }}
                    className="bg-secondary px-8 py-5 text-primary font-bold uppercase tracking-[0.3em] text-[10px] shadow-lg shadow-secondary/10 transition-all hover:bg-secondary/90 active:scale-95 flex items-center gap-4 rounded-sm"
                >
                    <Plus size={16} /> New Skill
                </button>
            </header>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-6 opacity-20">
                    <div className="w-16 h-[1px] bg-secondary/10 relative overflow-hidden">
                        <motion.div
                            animate={{ x: [-80, 80] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-1/2 h-full bg-secondary"
                        />
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.6em]">Synchronizing Aura</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skill, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03, duration: 0.8 }}
                            key={skill._id}
                            className="bg-primary border border-secondary/5 p-8 group hover:border-secondary/10 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.02)] transition-all rounded-sm"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-1 rounded-full bg-secondary opacity-20" />
                                        <span className="text-[9px] uppercase font-bold text-tertiary tracking-[0.3em] opacity-40 italic">{skill.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary tracking-tight group-hover:opacity-60 transition-all font-serif">{skill.name}</h3>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => { setCurrentSkill(skill); setIsEditing(true); }} className="text-tertiary hover:text-secondary p-1 transition-colors">
                                        <Edit2 size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(skill._id)} className="text-tertiary hover:text-red-600 p-1 transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-[9px] uppercase font-bold tracking-[0.3em] text-tertiary opacity-40 italic">
                                    <span>Mastery Depth</span>
                                    <span>{skill.level || 80}%</span>
                                </div>
                                <div className="h-[2px] w-full bg-secondary/[0.03] overflow-hidden rounded-full">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level || 80}%` }}
                                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="h-full bg-secondary opacity-20"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {skills.length === 0 && (
                        <div className="lg:col-span-3 border border-dashed border-secondary/10 p-20 text-center rounded-sm">
                            <p className="text-tertiary text-[10px] uppercase tracking-[0.6em] opacity-40 italic">Registry Static</p>
                        </div>
                    )}
                </div>
            )}

            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-primary/90 flex items-center justify-center p-6 backdrop-blur-2xl overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-primary border border-secondary/10 p-12 max-w-md w-full relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-sm my-auto"
                        >
                            <button onClick={() => setIsEditing(false)} className="absolute top-10 right-10 text-tertiary hover:text-secondary opacity-40 hover:opacity-100 transition-all"><X size={20} /></button>

                            <div className="mb-16">
                                <h2 className="text-3xl font-light uppercase tracking-tight text-secondary leading-none">
                                    {currentSkill._id ? 'Refine' : 'Form'} <span className="font-bold">Skill</span>
                                </h2>
                                <p className="text-[9px] uppercase tracking-[0.4em] text-tertiary mt-4 opacity-40 italic">Proficiency Synthesis</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Skill Nomenclature</label>
                                        <input
                                            value={currentSkill.name || ''}
                                            onChange={e => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                                            className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif uppercase tracking-[0.2em]"
                                            placeholder="e.g. REACT JS"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Category</label>
                                        <select
                                            value={currentSkill.category || ''}
                                            onChange={e => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                                            className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif uppercase tracking-[0.1em]"
                                            required
                                        >
                                            {['Frontend', 'Backend', 'Tools', 'Languages', 'Design', 'Other'].map(cat => (
                                                <option key={cat} value={cat} className="bg-primary text-secondary">{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">
                                            <label>Depth of Mastery</label>
                                            <span className="text-secondary opacity-100">{currentSkill.level || 80}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value={currentSkill.level || 80}
                                            onChange={e => setCurrentSkill({ ...currentSkill, level: parseInt(e.target.value) })}
                                            className="w-full h-[2px] bg-secondary/10 appearance-none cursor-pointer accent-secondary"
                                        />
                                    </div>
                                </div>
                                <div className="pt-10 flex gap-8">
                                    <button
                                        type="submit"
                                        className="flex-grow bg-secondary text-primary font-bold py-5 uppercase tracking-[0.4em] text-[10px] transition-all hover:bg-secondary/90 shadow-lg shadow-secondary/10 rounded-sm"
                                    >
                                        Manifest
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-10 border border-secondary/10 text-tertiary font-bold py-5 uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-secondary/5 hover:text-secondary rounded-sm"
                                    >
                                        Abort
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SkillManager;
