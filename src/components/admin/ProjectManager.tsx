import { useState, useEffect } from 'react';
import api from '../../api';
import { Plus, Trash2, Edit2, Github, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    githubLink?: string;
    demoLink?: string;
}

const ProjectManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({ tags: [] });
    const [tagInput, setTagInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentProject._id) {
                await api.put(`/projects/${currentProject._id}`, currentProject);
            } else {
                await api.post('/projects', currentProject);
            }
            setIsEditing(false);
            setCurrentProject({ tags: [] });
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                fetchProjects();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const addTag = () => {
        if (tagInput && !currentProject.tags?.includes(tagInput)) {
            setCurrentProject({ ...currentProject, tags: [...(currentProject.tags || []), tagInput] });
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setCurrentProject({ ...currentProject, tags: currentProject.tags?.filter(tag => tag !== tagToRemove) });
    };

    return (
        <div className="space-y-16">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-light uppercase tracking-tight text-secondary leading-none">
                        Project <span className="font-bold">Archive</span>
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-tertiary opacity-40 italic">Curation of architectural assets</p>
                </div>
                <button
                    onClick={() => { setIsEditing(true); setCurrentProject({ tags: [] }); }}
                    className="bg-secondary px-8 py-5 text-primary font-bold uppercase tracking-[0.3em] text-[10px] shadow-lg shadow-secondary/10 transition-all hover:bg-secondary/90 active:scale-95 flex items-center gap-4 rounded-sm"
                >
                    <Plus size={16} /> New Asset
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
                    {projects.map((project, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.8 }}
                            key={project._id}
                            className="bg-primary border border-secondary/5 p-10 group hover:border-secondary/10 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] transition-all rounded-sm relative"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <h3 className="text-xl font-bold text-secondary tracking-tight group-hover:opacity-60 transition-all">{project.title}</h3>
                                <div className="flex gap-4">
                                    <button onClick={() => { setCurrentProject(project); setIsEditing(true); }} className="text-tertiary hover:text-secondary p-2 transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(project._id)} className="text-tertiary hover:text-red-600 p-2 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-tertiary text-xs leading-[2] mb-10 line-clamp-3 italic opacity-60 font-serif">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 bg-secondary/[0.02] border border-secondary/5 text-tertiary font-bold opacity-60">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-secondary/5 flex gap-10">
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase font-bold text-secondary flex items-center gap-3 hover:opacity-100 opacity-40 transition-opacity tracking-[0.2em]">
                                        <Github size={12} /> Source
                                    </a>
                                )}
                                {project.demoLink && (
                                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase font-bold text-secondary flex items-center gap-3 hover:opacity-100 opacity-40 transition-opacity tracking-[0.2em]">
                                        <ExternalLink size={12} /> Portal
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    {projects.length === 0 && (
                        <div className="md:col-span-2 border border-dashed border-secondary/10 p-20 text-center rounded-sm">
                            <p className="text-tertiary text-[10px] uppercase tracking-[0.6em] opacity-40 italic">Empty Archive</p>
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
                            className="bg-primary border border-secondary/10 p-12 max-w-2xl w-full relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-sm my-auto"
                        >
                            <button onClick={() => setIsEditing(false)} className="absolute top-10 right-10 text-tertiary hover:text-secondary opacity-40 hover:opacity-100 transition-all"><X size={20} /></button>

                            <div className="mb-16">
                                <h2 className="text-3xl font-light uppercase tracking-tight text-secondary leading-none">
                                    {currentProject._id ? 'Refine' : 'Form'} <span className="font-bold">Asset</span>
                                </h2>
                                <p className="text-[9px] uppercase tracking-[0.4em] text-tertiary mt-4 opacity-40 italic">Configuration Matrix</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Asset Title</label>
                                        <input
                                            value={currentProject.title || ''}
                                            onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                                            className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif"
                                            placeholder="Asset Name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Source Link</label>
                                        <input
                                            value={currentProject.githubLink || ''}
                                            onChange={e => setCurrentProject({ ...currentProject, githubLink: e.target.value })}
                                            className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="space-y-4 md:col-span-2">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Description</label>
                                        <textarea
                                            value={currentProject.description || ''}
                                            onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                                            className="w-full bg-secondary/[0.01] border border-secondary/5 p-6 text-secondary focus:border-secondary/20 outline-none transition-all h-32 resize-none text-[13px] leading-relaxed font-serif italic"
                                            placeholder="Narrative summary..."
                                            required
                                        />
                                    </div>
                                    <div className="space-y-4 md:col-span-2">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-tertiary font-bold opacity-60">Tags</label>
                                        <div className="flex gap-6">
                                            <div className="flex-grow">
                                                <input
                                                    value={tagInput}
                                                    onChange={e => setTagInput(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                                    className="w-full bg-transparent border-b border-secondary/10 py-3 text-secondary focus:border-secondary outline-none transition-all text-sm font-serif"
                                                    placeholder="Type and press Enter"
                                                />
                                            </div>
                                            <button type="button" onClick={addTag} className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-secondary/5 px-6 transition-all border border-secondary/5 rounded-sm">Add</button>
                                        </div>
                                        <div className="flex flex-wrap gap-3 mt-6">
                                            {currentProject.tags?.map(tag => (
                                                <span key={tag} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-secondary/10 text-tertiary font-bold hover:border-secondary/30 transition-all cursor-default">
                                                    {tag}
                                                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors"><X size={12} /></button>
                                                </span>
                                            ))}
                                        </div>
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

export default ProjectManager;
