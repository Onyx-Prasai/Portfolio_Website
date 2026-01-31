import { motion } from 'framer-motion';

const ZenShrine = ({ onEnter }: { onEnter: () => void }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[200] bg-[#d1d1d1] flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
        >
            {/* Misty Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#b8b8b8] via-[#e0e0e0] to-[#c2c2c2] opacity-80" />

            {/* Animated Mist Layers */}
            <motion.div
                className="absolute inset-0 opacity-40 bg-white/30 blur-3xl"
                animate={{
                    x: [-20, 20, -20],
                    y: [-10, 10, -10]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                className="cursor-none group relative z-10 flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                onClick={onEnter}
            >
                {/* Detailed Torii Gate (Itsukushima Style) */}
                <div className="relative">
                    <svg
                        width="300"
                        height="200"
                        viewBox="0 0 100 80"
                        className="drop-shadow-2xl"
                    >
                        {/* kasagi (Top Beam - Curved Black) */}
                        <path
                            d="M 5 15 Q 50 10 95 15 L 95 19 Q 50 14 5 19 Z"
                            fill="#1a1a1a"
                        />
                        {/* shimaki (Secondary Beam) */}
                        <path
                            d="M 10 22 Q 50 19 90 22 L 90 25 Q 50 22 10 25 Z"
                            fill="#d32f2f"
                        />
                        {/* nuki (Middle Beam) */}
                        <rect x="23" y="38" width="54" height="4" fill="#d32f2f" />

                        {/* Main Pillars (Large red) */}
                        <path d="M 33 25 L 30 70" stroke="#d32f2f" strokeWidth="6" strokeLinecap="round" />
                        <path d="M 67 25 L 70 70" stroke="#d32f2f" strokeWidth="6" strokeLinecap="round" />

                        {/* Support Pillars (Small side ones) */}
                        <rect x="27" y="55" width="4" height="15" fill="#c62828" opacity="0.8" />
                        <rect x="69" y="55" width="4" height="15" fill="#c62828" opacity="0.8" />

                        {/* Center Plate (Gaku) */}
                        <rect x="46" y="25" width="8" height="13" fill="#1a1a1a" />
                    </svg>

                    {/* Water Reflection (Inverted & Blurred) */}
                    <div className="absolute top-full left-0 w-full opacity-20 scale-y-[-0.8] blur-sm mt-1">
                        <svg width="300" height="100" viewBox="0 0 100 40">
                            <path d="M 33 0 L 30 40" stroke="#d32f2f" strokeWidth="6" />
                            <path d="M 67 0 L 70 40" stroke="#d32f2f" strokeWidth="6" />
                        </svg>
                    </div>

                    {/* Water Surface Ripple Overlay */}
                    <motion.div
                        className="absolute bottom-[-10px] left-[-20%] w-[140%] h-[20px] bg-gradient-to-b from-white/10 to-transparent blur-md"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </div>

                <motion.p
                    className="mt-24 text-black/60 font-serif tracking-[0.5em] uppercase text-xs italic bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-black/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Step Into the Silence
                </motion.p>
            </motion.div>

            {/* Bottom Mist Vignette */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#c2c2c2] to-transparent pointer-events-none" />
        </motion.div>
    );
};

export default ZenShrine;
