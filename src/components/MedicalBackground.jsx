import React from 'react';
import { motion } from 'framer-motion';

const MedicalBackground = () => {
    // Brand Colors: Deep Surgical Teal, Mint, Soft Teal, and subtle Coral accent
    const colors = ['#0F766E', '#14B8A6', '#CCFBF1', '#FDA4AF'];

    // Shape Variants
    const shapes = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        type: ['plus', 'hexagon', 'circle'][Math.floor(Math.random() * 3)],
        x: Math.random() * 100, // %
        y: Math.random() * 100, // %
        size: Math.random() * 30 + 10, // px
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10, // Seconds for float
        delay: Math.random() * 5
    }));

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: -1,
            pointerEvents: 'none',
        }}>
            {shapes.map((shape) => (
                <FloatingShape key={shape.id} shape={shape} />
            ))}
        </div>
    );
};

const FloatingShape = ({ shape }) => {
    const { type, size, color, duration, delay, x, y } = shape;

    // Movement: Upwards float
    const anim = {
        y: [y + '%', (y - 20) + '%', (y - 40) + '%'], // Drifting up
        x: [x + '%', (x + 5) + '%', (x - 5) + '%'], // Slight horizontal drift
        opacity: [0.1, 0.2, 0.05],
        rotate: [0, 90, 180]
    };

    const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: size,
        height: size,
        color: color
    };

    return (
        <motion.div
            style={style}
            animate={anim}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay
            }}
        >
            {type === 'plus' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
            )}
            {type === 'hexagon' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l8.66 5v10L12 22 3.34 17V7L12 2z" />
                </svg>
            )}
            {type === 'circle' && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            )}
        </motion.div>
    );
};

export default MedicalBackground;
