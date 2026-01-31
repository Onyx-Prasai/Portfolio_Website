import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ZenLoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800); // Slight delay before unmounting
                    return 100;
                }
                return prev + Math.random() * 5;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
            <div className="relative mb-8">
                {/* Red Circle / Sun */}
                <motion.div
                    className="w-24 h-24 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </div>

            <div className="w-64 h-1 bg-primary/10 rounded-full overflow-hidden mb-4">
                <motion.div
                    className="h-full bg-primary"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <motion.p
                className="text-primary font-serif italic tracking-widest text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {Math.round(progress)}%
            </motion.p>

            <motion.p
                className="text-tertiary font-serif text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                Finding Harmony...
            </motion.p>
        </motion.div>
    );
};

export default ZenLoadingScreen;
