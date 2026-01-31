import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SakuraParticles = () => {
    const ref = useRef<THREE.Points>(null!);
    const count = 1000;

    const [positions, speeds] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40; // Even wider spread
            positions[i * 3 + 1] = Math.random() * 25;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            speeds[i] = 0.02 + Math.random() * 0.04; // Faster fall
        }
        return [positions, speeds];
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;

        const time = state.clock.getElapsedTime();
        const array = ref.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Falling motion
            array[i * 3 + 1] -= speeds[i];

            // Increased swaying motion (wind effect)
            array[i * 3] += Math.sin(time * 0.6 + i) * 0.015;
            array[i * 3 + 2] += Math.cos(time * 0.4 + i) * 0.01;

            // Reset if fallen below
            if (array[i * 3 + 1] < -12) {
                array[i * 3 + 1] = 13;
                array[i * 3] = (Math.random() - 0.5) * 40;
            }
        }
        ref.current.geometry.attributes.position.needsUpdate = true;

        // Slow group rotation
        ref.current.rotation.y += 0.002;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffb7c5" // Sakura Pink
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
};

export default SakuraParticles;
