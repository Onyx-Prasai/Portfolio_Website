import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (id: string) => {
        // Basic implementation - in a real app, you might use a smooth scroll library or ref
        // For now, we assume the sections have IDs (which I need to start adding to the components!)
        const element = document.querySelector(id); // Simple Query
        // Actually our components won't have IDs by default unless we add them
        // But let's assume I will go back and add IDs to the sections.
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 border-b border-secondary/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)]' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    {/* Torii Gate Icon Logo */}
                    <div className="w-10 h-10 bg-accent flex items-center justify-center relative shadow-sm rounded-sm transform group-hover:rotate-6 transition-transform duration-300">
                        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-primary">
                            {/* Simplified Torii Gate */}
                            <path d="M 5 12 Q 20 8 35 12 L 35 15 Q 20 11 5 15 Z" /> {/* Top Beam */}
                            <path d="M 8 15 L 32 15 L 32 18 L 8 18 Z" /> {/* Second Beam */}
                            <path d="M 12 18 L 12 35 L 15 35 L 15 18 Z" /> {/* Left Pillar */}
                            <path d="M 25 18 L 25 35 L 28 35 L 28 18 Z" /> {/* Right Pillar */}
                            {/* The 'O' for Onyx */}
                            <circle cx="20" cy="24" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary opacity-90" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black text-secondary tracking-[0.2em] font-serif group-hover:text-accent transition-colors">ONYX</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.href);
                            }}
                            className="text-secondary/70 hover:text-accent transition-colors relative group cursor-pointer font-serif tracking-wide uppercase text-sm"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-secondary hover:text-accent transition-colors">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-secondary border-b border-primary/10 overflow-hidden"
                    >
                        <div className="flex flex-col items-center gap-6 py-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl text-primary/80 hover:text-accent font-serif"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
