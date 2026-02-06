import { useState, useEffect } from 'react';
import api from '../../api';
import { Plus, Trash2, Edit2, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Conference {
    _id: string;
    name: string;
    date?: string;
    description?: string;
}

const ConferenceManager = () => {
    const [conferences, setConferences] = useState<Conference[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentConf, setCurrentConf] = useState<Partial<Conference>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchConferences();
    }, []);

    const fetchConferences = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/conferences');
            setConferences(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentConf._id) {
                await api.put(`/conferences/${currentConf._id}`, currentConf);
            } else {
                await api.post('/conferences', currentConf);
            }
            setIsEditing(false);
            setCurrentConf({});
            fetchConferences();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await api.delete(`/conferences/${id}`);
                fetchConferences();
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
                        Public <span className="font-bold">Aether</span>
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-tertiary opacity-40 italic">Registry of public engagements</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setCurrentConf({}); }}
                    className="bg-secondary px-8 py-5 text-primary font-bold uppercase tracking-[0.3em] text-[10px] shadow-lg shadow-secondary/10 transition-all hover:bg-secondary/90 active:scale-95 flex items-center gap-4 rounded-sm"
                >
                    <Plus size={16} /> New Engagement
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
                    {conferences.map((conf, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.8 }}
                            key={conf._id}
                            className="bg-primary border border-secondary/5 p-10 group hover:border-secondary/10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] transition-all rounded-sm flex flex-col justify-between"
                        >
                            <div className="space-y-8">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-bold text-secondary tracking-tight group-hover:opacity-60 transition-all font-serif max-w-[80%] leading-tight">{conf.name}</h3>
                                    <div className="flex gap-4">
                                        <button onClick={() => { setCurrentConf(conf); setIsEditing(true); }} className="text-tertiary hover:text-secondary p-2 transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(conf._id)} className="text-tertiary hover:text-red-600 p-2 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-tertiary/60">
                                    <div className="flex items-center gap-3 px-4 py-2 bg-secondary/[0.02] border border-secondary/5 rounded-full">
                                        <Calendar size={12} className="text-secondary opacity-40" />
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60">{conf.date || 'TBA'}</span>
                                    </div>
                                </div>
                                <p className="text-tertiary text-[13px] leading-[2.2] italic opacity-60 font-serif">
                                    {conf.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    {conferences.length === 0 && (
                        <div className="md:col-span-2 border border-dashed border-secondary/10 p-20 text-center rounded-sm">
                            <p className="text-tertiary text-[10px] uppercase tracking-[0.6em] opacity-40 italic">Registry Empty</p>
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
                                    {currentConf._id ? 'Refine' : 'Form'} <span className="font-bold">Entry</span>
                                </h2>
                                <p className="text-[9px] uppercase tracking-[0.4em] text-tertiary mt-4 opacity-40 italic">Aether Registration</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Engagement Name</label>
                                        <input
                                            value={currentConf.name || ''}
                                            onChange={e => setCurrentConf({ ...currentConf, name: e.target.value })}
                                            className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif"
                                            placeholder="Event Title"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Era / Date</label>
                                        <input
                                            value={currentConf.date || ''}
                                            onChange={e => setCurrentConf({ ...currentConf, date: e.target.value })}
                                            className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif uppercase tracking-[0.1em]"
                                            placeholder="e.g. October 2024"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Narrative Summary</label>
                                        <textarea
                                            value={currentConf.description || ''}
                                            onChange={e => setCurrentConf({ ...currentConf, description: e.target.value })}
                                            className="w-full bg-secondary/[0.01] border border-secondary/5 p-6 text-secondary focus:border-secondary/20 outline-none transition-all h-32 resize-none text-[13px] leading-relaxed font-serif italic"
                                            placeholder="Context and impact..."
                                            required
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

export default ConferenceManager;
