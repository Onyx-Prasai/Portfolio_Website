import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ShieldAlert, Loader2, Command } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuthenticating(true);
        setError('');
        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            setTimeout(() => navigate('/admin/dashboard'), 500);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
            setIsAuthenticating(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-primary p-6 relative overflow-hidden font-serif selection:bg-accent/20">
            {/* Subtle Texture Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_1px,transparent_1px,transparent_10px)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-md w-full relative z-10"
            >
                <div className="relative bg-primary border border-secondary/5 p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] rounded-sm">
                    {/* Minimal Branding */}
                    <div className="flex flex-col items-center mb-16">
                        <motion.div
                            initial={{ rotate: -10, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-14 h-14 bg-secondary/5 flex items-center justify-center mb-6 rounded-sm border border-secondary/5"
                        >
                            <Command size={22} className="text-secondary opacity-60" />
                        </motion.div>
                        <h1 className="text-3xl font-light text-secondary uppercase tracking-[0.5em] mb-1">Admin</h1>
                        <p className="text-[9px] text-tertiary uppercase tracking-[0.3em] opacity-40">Zen Management Suite</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-accent/5 border border-accent/10 text-accent p-4 mb-8 flex items-center gap-3 rounded-sm overflow-hidden"
                            >
                                <ShieldAlert size={16} className="shrink-0" />
                                <span className="text-[10px] uppercase font-bold tracking-widest">{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleLogin} className="space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] text-tertiary uppercase tracking-[0.3em] font-bold flex items-center gap-3 opacity-60">
                                <User size={12} /> Identity
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-transparent border-b border-secondary/10 py-4 text-secondary focus:border-secondary outline-none transition-all placeholder:text-secondary/10 text-sm font-serif"
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] text-tertiary uppercase tracking-[0.3em] font-bold flex items-center gap-3 opacity-60">
                                <Lock size={12} /> Passphrase
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-secondary/10 py-4 text-secondary focus:border-secondary outline-none transition-all placeholder:text-secondary/10 text-sm font-serif font-bold tracking-[0.2em]"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isAuthenticating}
                            className="w-full relative group bg-secondary px-8 py-5 transition-all hover:bg-secondary/90 active:scale-[0.99]"
                        >
                            <div className="relative flex items-center justify-center gap-4 text-primary font-bold uppercase tracking-[0.4em] text-[10px]">
                                {isAuthenticating ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin opacity-40" />
                                        Authenticating
                                    </>
                                ) : (
                                    "Enter Sanctuary"
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Minimal Footer Decoration */}
                    <div className="mt-16 flex justify-center items-center gap-4 opacity-10">
                        <div className="h-[1px] w-8 bg-secondary" />
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <div className="h-[1px] w-8 bg-secondary" />
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-[8px] text-tertiary uppercase tracking-[0.6em] opacity-30">Protected by Neural Encryption</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
