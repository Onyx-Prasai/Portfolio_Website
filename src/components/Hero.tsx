import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax Transforms
    const pagodaY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const samuraiY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const cliffY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

    return (
        <section
            ref={containerRef}
            className="h-[110vh] w-full flex items-center justify-center relative overflow-hidden bg-primary"
        >
            {/* 1. BACKGROUND LAYER: Soft Mist & Distance Trees */}
            <motion.div
                className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                style={{ opacity: backgroundOpacity }}
            >
                <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-t from-white/90 to-transparent blur-3xl" />
                <svg viewBox="0 0 1000 1000" className="w-full h-full">
                    {/* Far Trees (Pink Clouds) */}
                    {[...Array(6)].map((_, i) => (
                        <circle key={i} cx={100 + i * 180} cy={500 + Math.random() * 100} r={120 + Math.random() * 60} fill="#ffb7c5" opacity="0.2" filter="blur(50px)" />
                    ))}
                </svg>
            </motion.div>

            {/* 2. MIDGROUND LAYER: Japanese Pagoda/Castle - Shifted Right */}
            <motion.div
                className="absolute inset-0 z-1 flex items-center justify-end pr-[10%] pointer-events-none"
                style={{ y: pagodaY }}
            >
                <svg width="450" height="450" viewBox="0 0 100 100" className="opacity-10 text-secondary fill-current translate-y-[50px]">
                    {/* Detailed Pagoda Silhouette */}
                    <path d="M 50 5 L 48 10 L 52 10 Z" /> {/* Finial */}
                    <path d="M 35 15 Q 50 10 65 15 L 62 20 L 38 20 Z" />
                    <path d="M 32 30 Q 50 25 68 30 L 65 38 L 35 38 Z" />
                    <path d="M 28 48 Q 50 43 72 48 L 68 58 L 32 58 Z" />
                    <path d="M 22 70 Q 50 65 78 70 L 73 85 L 27 85 Z" />
                    <rect x="48" y="10" width="4" height="75" />
                </svg>
            </motion.div>

            {/* 3. FOREGROUND LAYER: The Cliff / Platform with Drips */}
            <motion.div
                className="absolute inset-x-0 bottom-0 z-3 pointer-events-none"
                style={{ y: cliffY }}
            >
                <div className="relative w-full h-[40vh]">
                    <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full text-secondary fill-current">
                        {/* Cliff Edge - High on left, dipping right */}
                        <path d="M 0 50 Q 200 60 400 100 T 700 80 T 1000 120 L 1000 300 L 0 300 Z" />
                        {/* Ink Drips / Streaks */}
                        {[...Array(15)].map((_, i) => (
                            <motion.rect
                                key={i}
                                x={i * 70 + 20}
                                y="120"
                                width="3"
                                height={80 + Math.random() * 120}
                                opacity="0.4"
                                animate={{ height: [80 + Math.random() * 120, 100 + Math.random() * 120] }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                            />
                        ))}
                    </svg>
                </div>
            </motion.div>

            {/* 4. SAMURAI ON HORSE LAYER - Positioned on the left Cliff */}
            <motion.div
                className="absolute z-4 pointer-events-none flex items-end justify-start pl-[5%] pb-[26vh] inset-0"
                style={{ y: samuraiY }}
            >
                <div className="relative">
                    <svg width="320" height="320" viewBox="0 0 100 100" className="drop-shadow-2xl fill-secondary">
                        {/* More Detailed Horse Silhouette */}
                        <path d="M 10 80 C 5 70 15 60 25 65 C 35 70 50 65 60 70 C 70 75 75 90 60 92 C 55 92 50 85 40 85 S 20 90 15 85" /> {/* Body Lower */}
                        <path d="M 25 65 C 20 40 40 30 65 40 C 75 45 85 65 72 75 T 60 70" /> {/* Body Upper/Neck */}
                        <path d="M 72 45 L 85 35 Q 92 30 88 50 L 75 45" /> {/* Head */}
                        <path d="M 28 85 L 25 98 M 42 85 L 40 98 M 58 92 L 60 100 M 68 85 L 72 100" stroke="currentColor" strokeWidth="2.5" /> {/* Detailed Legs */}
                        <path d="M 12 78 Q -5 85 2 100" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" /> {/* Tail */}

                        {/* More Detailed Samurai Silhouette */}
                        <path d="M 45 42 L 55 42 C 58 35 62 30 55 25 Q 50 20 45 25 C 38 30 42 35 45 42" /> {/* Kabuto/Helmet */}
                        <path d="M 40 42 L 60 42 L 65 65 Q 50 68 35 65 Z" /> {/* Yoroi/Torso */}
                        <path d="M 42 45 Q 35 55 38 65" stroke="currentColor" strokeWidth="3" /> {/* Left Arm */}
                        <path d="M 58 45 Q 65 55 62 65" stroke="currentColor" strokeWidth="3" /> {/* Right Arm */}
                        <path d="M 52 45 L 80 15" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" /> {/* Long Katana */}
                    </svg>
                    {/* Soft atmospheric glow */}
                    <div className="absolute inset-0 bg-accent/5 blur-3xl -z-10 rounded-full scale-150" />
                </div>
            </motion.div>

            {/* 5. TEXT CONTENT - Clean and Centered */}
            <motion.div
                className="text-center z-10 p-10 md:p-16 border-y border-secondary/5 bg-primary/80 backdrop-blur-md shadow-2xl relative"
                style={{ y: textY }}
            >
                {/* Red Seal Behind Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10" />

                <motion.h1
                    className="text-6xl md:text-9xl font-black text-secondary tracking-tighter mb-4 font-serif"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="text-accent italic uppercase">Onyx</span> Prasai
                </motion.h1>
                <div className="flex items-center justify-center gap-4 mb-6">
                    <motion.div className="h-px bg-secondary/20 flex-grow max-w-[60px]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 }} />
                    <motion.div
                        className="w-3 h-3 rotate-45 border-2 border-accent"
                        animate={{ rotate: [45, 135, 45] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div className="h-px bg-secondary/20 flex-grow max-w-[60px]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 }} />
                </div>
                <motion.p
                    className="text-xl md:text-3xl text-tertiary font-serif italic tracking-widest px-8 py-2 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    Computer Engineering <span className="text-accent not-italic font-bold uppercase">Student</span>
                </motion.p>
            </motion.div>

            {/* 6. CHERRY BLOSSOM TREE (FOREGROUND LEFT) - Static position */}
            <div className="absolute top-0 left-[-12%] w-[50%] h-full z-5 pointer-events-none origin-top-left">
                <svg viewBox="0 0 400 600" className="w-full h-full">
                    <path
                        d="M 60 0 Q 40 150 150 350 Q 220 500 150 700"
                        stroke="black"
                        strokeWidth="15"
                        fill="none"
                        strokeLinecap="round"
                        className="opacity-95 text-secondary"
                    />
                    {/* Pink Petal Clusters - Richer and fuller */}
                    <g fill="#ffb7c5" className="opacity-80">
                        <circle cx="150" cy="350" r="35" filter="blur(10px)" />
                        <circle cx="180" cy="320" r="20" />
                        <circle cx="130" cy="380" r="22" />
                        <circle cx="170" cy="400" r="15" />
                        <circle cx="190" cy="350" r="18" />
                        <circle cx="80" cy="180" r="35" filter="blur(15px)" opacity="0.6" />
                        <circle cx="110" cy="150" r="20" />
                        <circle cx="70" cy="210" r="15" />
                        {/* More blossoms scattered on trunk */}
                        <circle cx="120" cy="50" r="15" filter="blur(5px)" />
                        <circle cx="140" cy="80" r="10" />
                    </g>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
