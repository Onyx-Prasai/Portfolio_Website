import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Briefcase, GraduationCap, Code2, Users,
    FolderKanban, LogOut, Activity, Database, ShieldCheck,
    ChevronRight, Menu, X, Command, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api';

import ProjectManager from './ProjectManager';
import ExperienceManager from './ExperienceManager';
import EducationManager from './EducationManager';
import SkillManager from './SkillManager';
import ConferenceManager from './ConferenceManager';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    const menuItems = [
        { icon: <LayoutDashboard size={18} />, label: 'Overview', path: '/admin/dashboard' },
        { icon: <FolderKanban size={18} />, label: 'Projects', path: '/admin/dashboard/projects' },
        { icon: <Briefcase size={18} />, label: 'Experience', path: '/admin/dashboard/experience' },
        { icon: <GraduationCap size={18} />, label: 'Education', path: '/admin/dashboard/education' },
        { icon: <Code2 size={18} />, label: 'Skills', path: '/admin/dashboard/skills' },
        { icon: <Users size={18} />, label: 'Conferences', path: '/admin/dashboard/conferences' },
    ];

    return (
        <div className="min-h-screen bg-primary text-secondary font-serif flex overflow-hidden selection:bg-accent/10">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed md:relative z-40 w-72 h-screen bg-primary border-r border-secondary/5 flex flex-col shadow-[20px_0_60px_-15px_rgba(0,0,0,0.02)]"
                    >
                        <div className="p-10 flex items-center gap-5 border-b border-secondary/5">
                            <motion.div
                                whileHover={{ rotate: 10 }}
                                className="w-12 h-12 bg-secondary/5 flex items-center justify-center rounded-sm border border-secondary/5"
                            >
                                <Command size={18} className="text-secondary opacity-60" />
                            </motion.div>
                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">Sanctuary</h2>
                                <p className="text-[9px] text-tertiary uppercase tracking-widest opacity-40">Administrative Hub</p>
                            </div>
                        </div>

                        <nav className="flex-grow py-10 px-6 space-y-3">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`
                                        group flex items-center justify-between p-4 rounded-sm transition-all duration-300
                                        ${location.pathname === item.path
                                            ? 'bg-secondary text-primary shadow-lg shadow-secondary/10'
                                            : 'text-tertiary hover:bg-secondary/5 hover:text-secondary'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`${location.pathname === item.path ? 'text-primary' : 'opacity-40 group-hover:opacity-100 transition-opacity'}`}>
                                            {item.icon}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{item.label}</span>
                                    </div>
                                    <ChevronRight size={12} className={`transition-all duration-300 ${location.pathname === item.path ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                                </Link>
                            ))}
                        </nav>

                        <div className="p-10 border-t border-secondary/5">
                            <button
                                onClick={handleLogout}
                                className="w-full border border-secondary/10 p-5 text-tertiary hover:text-red-600 hover:border-red-600/20 transition-all duration-300 uppercase tracking-[0.3em] text-[10px] font-bold flex items-center justify-center gap-4 rounded-sm"
                            >
                                <LogOut size={16} className="opacity-40" /> Sign Out
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-grow relative overflow-y-auto">
                {/* Minimal Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between px-10 py-8 bg-primary/80 backdrop-blur-xl border-b border-secondary/5">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-3 text-tertiary hover:text-secondary hover:bg-secondary/5 transition-all rounded-sm"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/[0.02] border border-secondary/5 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary opacity-20 animate-pulse" />
                            <span className="text-[9px] uppercase tracking-[0.2em] text-tertiary font-bold opacity-60">Status: Harmonized</span>
                        </div>
                    </div>
                </header>

                <div className="relative z-10 p-10 md:p-20 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Routes>
                                <Route path="/" element={<Overview />} />
                                <Route path="/projects" element={<ProjectManager />} />
                                <Route path="/experience" element={<ExperienceManager />} />
                                <Route path="/education" element={<EducationManager />} />
                                <Route path="/skills" element={<SkillManager />} />
                                <Route path="/conferences" element={<ConferenceManager />} />
                            </Routes>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

const Overview = () => {
    const [stats, setStats] = useState({
        projects: 0,
        experience: 0,
        skills: 0,
        latency: '...'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [p, e, s] = await Promise.all([
                    api.get('/projects'),
                    api.get('/experiences'),
                    api.get('/skills')
                ]);
                setStats({
                    projects: p.data.length,
                    experience: e.data.length,
                    skills: s.data.length,
                    latency: '14ms'
                });
            } catch (err) {
                console.error("Stats fetch failed");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Published Works', value: stats.projects, icon: <FolderKanban size={20} />, color: 'text-secondary' },
        { label: 'Lifeline Nodes', value: stats.experience, icon: <Activity size={20} />, color: 'text-secondary' },
        { label: 'Technical Arts', value: stats.skills, icon: <Cpu size={20} />, color: 'text-secondary' },
    ];

    return (
        <div className="space-y-24">
            <header className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-light text-secondary uppercase tracking-tight leading-none">
                    Zen <span className="font-bold">Sanctum</span>
                </h1>
                <p className="text-tertiary text-lg font-serif italic max-w-2xl leading-relaxed opacity-50">
                    A refined oversight of your architectural legacy and digital contributions.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {statCards.map((card, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        key={card.label}
                        className="group p-12 bg-primary border border-secondary/5 hover:border-secondary/10 transition-all rounded-sm relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.02)]"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            {card.icon}
                        </div>
                        <p className="text-[11px] uppercase font-bold tracking-[0.3em] text-tertiary mb-10 opacity-60">{card.label}</p>
                        <p className={`text-7xl font-light tracking-tighter ${card.color}`}>
                            {loading ? '...' : card.value.toString().padStart(2, '0')}
                        </p>
                        <div className="mt-12 flex items-center gap-4">
                            <div className="h-[1px] w-10 bg-secondary/10" />
                            <span className="text-[9px] uppercase text-secondary font-bold tracking-[0.4em] opacity-40">Balanced</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-10">
                <div className="p-12 bg-primary border border-secondary/5 rounded-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-5 mb-12">
                        <Database size={18} className="text-secondary opacity-20" />
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-secondary">Aura Metrics</h3>
                    </div>
                    <div className="space-y-10">
                        {['Clarity', 'Stability', 'Efficiency'].map(item => (
                            <div key={item}>
                                <div className="flex justify-between text-[10px] uppercase mb-4 font-bold tracking-[0.3em]">
                                    <span className="text-tertiary opacity-60">{item}</span>
                                    <span className="text-secondary opacity-40 italic">Optimal</span>
                                </div>
                                <div className="h-[1px] w-full bg-secondary/5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.random() * 30 + 70}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-secondary opacity-20"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-12 bg-primary border border-secondary/5 rounded-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.02)] flex flex-col justify-center">
                    <div className="flex items-center gap-5 mb-10">
                        <ShieldCheck size={18} className="text-secondary opacity-20" />
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-secondary">Integrity Journal</h3>
                    </div>
                    <p className="text-[10px] text-tertiary uppercase leading-[2.5] tracking-[0.2em] opacity-50 font-serif italic">
                        Session: {new Date().toLocaleDateString('en-GB')} <br />
                        Connection: Encrypted Zen Link <br />
                        Clearance: Grand Architect
                    </p>
                    <div className="mt-12">
                        <span className="text-[9px] border border-secondary/5 px-6 py-3 text-secondary font-bold uppercase tracking-[0.4em] opacity-30">
                            State: Tranquil
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
