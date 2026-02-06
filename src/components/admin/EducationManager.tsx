import { useState, useEffect } from 'react';
import api from '../../api';
import { Plus, Trash2, Edit2, X, School, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Education {
    _id: string;
    degree: string;
    institution: string;
    year: string;
    description?: string;
}

const EducationManager = () => {
    const [educations, setEducations] = useState<Education[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEdu, setCurrentEdu] = useState<Partial<Education>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchEducations();
    }, []);

    const fetchEducations = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/educations');
            setEducations(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentEdu._id) {
                await api.put(`/educations/${currentEdu._id}`, currentEdu);
            } else {
                await api.post('/educations', currentEdu);
            }
            setIsEditing(false);
            setCurrentEdu({});
            fetchEducations();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this education entry?')) {
            try {
                await api.delete(`/educations/${id}`);
                fetchEducations();
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
                        Academic <span className="font-bold">Aura</span>
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-tertiary opacity-40 italic">Registry of intellectual milestones</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setCurrentEdu({}); }}
                    className="bg-secondary px-8 py-5 text-primary font-bold uppercase tracking-[0.3em] text-[10px] shadow-lg shadow-secondary/10 transition-all hover:bg-secondary/90 active:scale-95 flex items-center gap-4 rounded-sm"
                >
                    <Plus size={16} /> New Credential
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {educations.map((edu, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05, duration: 0.8 }}
                            key={edu._id}
                            className="bg-primary border border-secondary/5 p-10 group hover:border-secondary/10 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] transition-all rounded-sm relative"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-secondary tracking-tight group-hover:opacity-60 transition-all font-serif leading-tight">{edu.degree}</h3>
                                    <div className="flex items-center gap-4 text-tertiary/60">
                                        <div className="flex items-center gap-3">
                                            <School size={14} className="text-secondary opacity-30" />
                                            <span className="text-[11px] uppercase font-bold tracking-[0.3em]">{edu.institution}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => { setCurrentEdu(edu); setIsEditing(true); }} className="text-tertiary hover:text-secondary p-2 transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(edu._id)} className="text-tertiary hover:text-red-600 p-2 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-secondary/5 flex items-center gap-4">
                                <Calendar size={12} className="text-secondary opacity-20" />
                                <span className="text-[10px] uppercase font-bold text-tertiary/70 tracking-[0.3em] opacity-60">{edu.year}</span>
                            </div>
                        </motion.div>
                    ))}
                    {educations.length === 0 && (
                        <div className="md:col-span-2 border border-dashed border-secondary/10 p-20 text-center rounded-sm">
                            <p className="text-tertiary text-[10px] uppercase tracking-[0.6em] opacity-40 italic">Empty Registry</p>
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
                            className="bg-primary border border-secondary/10 p-12 max-w-xl w-full relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-sm my-auto"
                        >
                            <button onClick={() => setIsEditing(false)} className="absolute top-10 right-10 text-tertiary hover:text-secondary opacity-40 hover:opacity-100 transition-all"><X size={20} /></button>

                            <div className="mb-16">
                                <h2 className="text-3xl font-light uppercase tracking-tight text-secondary leading-none">
                                    {currentEdu._id ? 'Refine' : 'Form'} <span className="font-bold">Credential</span>
                                </h2>
                                <p className="text-[9px] uppercase tracking-[0.4em] text-tertiary mt-4 opacity-40 italic">Academic Registry Expansion</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Degree / Program</label>
                                        <input
                                            value={currentEdu.degree || ''}
                                            onChange={e => setCurrentEdu({ ...currentEdu, degree: e.target.value })}
                                            className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif"
                                            placeholder="Academic Distinction"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Institution</label>
                                        <input
                                            value={currentEdu.institution || ''}
                                            onChange={e => setCurrentEdu({ ...currentEdu, institution: e.target.value })}
                                            className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif uppercase"
                                            placeholder="Alma Mater"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Graduation Era</label>
                                        <input
                                            value={currentEdu.year || ''}
                                            onChange={e => setCurrentEdu({ ...currentEdu, year: e.target.value })}
                                            className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif uppercase"
                                            placeholder="e.g. 2020 - 2024"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="pt-10 flex gap-8">
                                    <button
                                        type="submit"
                                        className="flex-grow bg-secondary text-primary font-bold py-5 uppercase tracking-[0.4em] text-[10px] transition-all hover:bg-secondary/90 shadow-lg shadow-secondary/10 rounded-sm"
                                    >
                                        Commit
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

export default EducationManager;
