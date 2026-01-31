import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [points, setPoints] = useState<{ x: number, y: number, id: number, pressure: number }[]>([]);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 40, stiffness: 450, mass: 0.2 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Physics Ref for velocity tracking
    const physics = useRef({
        lastX: 0,
        lastY: 0,
        vx: 0,
        vy: 0,
        rotation: 15
    });

    const [vState, setVState] = useState({ vx: 0, vy: 0 });

    useEffect(() => {
        const updatePos = (clientX: number, clientY: number) => {
            mouseX.set(clientX);
            mouseY.set(clientY);

            const dx = clientX - physics.current.lastX;
            const dy = clientY - physics.current.lastY;

            physics.current.vx = physics.current.vx * 0.8 + dx * 0.2;
            physics.current.vy = physics.current.vy * 0.8 + dy * 0.2;

            setVState({ vx: physics.current.vx, vy: physics.current.vy });

            const speed = Math.sqrt(dx * dx + dy * dy);
            const pressure = Math.min(Math.max(speed / 8, 0.4), 2.5);

            const newPoint = { x: clientX, y: clientY, id: Date.now(), pressure };
            setPoints(prev => [...prev.slice(-30), newPoint]);

            physics.current.lastX = clientX;
            physics.current.lastY = clientY;
        };

        const onMouseMove = (e: MouseEvent) => updatePos(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                updatePos(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchstart', onTouchMove, { passive: true });

        const interval = setInterval(() => setPoints(prev => prev.slice(1)), 25);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchstart', onTouchMove);
            clearInterval(interval);
        };
    }, [mouseX, mouseY]);

    const pathData = points.length > 1
        ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
        : '';

    return (
        <div className="fixed inset-0 pointer-events-none z-[1001]">
            <svg className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                    <filter id="shodo-ink">
                        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
                    </filter>
                </defs>
                <motion.path d={pathData} stroke="#000000" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" animate={{ opacity: 0.7 }} filter="url(#shodo-ink)" />
                <motion.path d={pathData} stroke="#000000" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" animate={{ opacity: 0.9 }} />
            </svg>

            {/* Silhouette Brush Visual - Inverted (Handle Top, Tip Bottom) */}
            <motion.div
                className="absolute pointer-events-none"
                style={{ x: cursorX, y: cursorY }}
            >
                {/* Translate such that the bottom tip (20, 80) of the SVG is at the cursor position (0, 0) */}
                <div className="relative -translate-x-[20px] -translate-y-[78px]">
                    <motion.svg
                        width="30"
                        height="70"
                        viewBox="0 0 40 80"
                        fill="black"
                        style={{
                            skewX: -vState.vx * 0.5,
                            rotate: 15, // Slanted to the right
                            scaleY: 1 + Math.abs(vState.vy) * 0.005
                        }}
                    >
                        {/* Handle - Now at the Top */}
                        <path d="M 12 5 Q 20 -2 28 5 L 30 38 L 10 38 Z" />

                        {/* Bristles - Now at the Bottom, pointing down */}
                        <path d="M 20 80 C 35 68 38 52 20 45 C 2 52 5 68 20 80 Z" />
                    </motion.svg>
                </div>
            </motion.div>
        </div>
    );
};

export default CustomCursor;
