import React from 'react';
import { motion } from 'framer-motion';

const MedicalFloatingBackground = () => {
    // Shapes configuration: White, very low opacity
    const shapes = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        type: ['plus', 'hexagon', 'circle'][Math.floor(Math.random() * 3)],
        x: Math.random() * 100, // %
        y: Math.random() * 100, // %
        scale: Math.random() * 1 + 0.5, // 0.5 to 1.5
        duration: Math.random() * 15 + 10, // 10s to 25s
        delay: Math.random() * 5,
        blur: Math.random() > 0.5 ? '1px' : '0px'
    }));

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
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
    const { type, x, y, scale, duration, delay, blur } = shape;

    const anim = {
        y: ['110%', '-10%'], // Move from bottom to top
        x: [x + '%', (x + (Math.random() * 10 - 5)) + '%'], // Slight horizontal drift
        rotate: [0, 360],
        opacity: [0, 0.1, 0.1, 0] // Fade in, stay, fade out
    };

    const style = {
        position: 'absolute',
        left: 0, // We use x in animate to position
        bottom: 0, // Start from bottom conceptually
        width: '40px', // Base size
        height: '40px',
        color: '#FFFFFF',
        opacity: 0.1,
        filter: `blur(${blur})`,
        transformOrigin: 'center center'
    };

    return (
        <motion.div
            style={style}
            animate={{
                y: [100 + Math.random() * 500, -100], // Start below, go above. This overrides the basic calc above for better distribution if needed, but let's stick to simple
                top: [y + '%', (y - 100) + '%'], // Let's try a simpler approach: fixed pos moving up
            }}
            // Actually, best "bubble" effect is usually top: 100% to -20%
            initial={{ top: '100%', left: `${x}%`, opacity: 0, scale: scale }}
            animate={{
                top: '-20%',
                opacity: [0, 0.08, 0.08, 0],
                rotate: 360
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
            }}
        >
            {type === 'plus' && (
                <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
            )}
            {type === 'hexagon' && (
                <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                    <path d="M12 2l8.66 5v10L12 22 3.34 17V7L12 2z" />
                </svg>
            )}
            {type === 'circle' && (
                <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            )}
        </motion.div>
    );
};

export default MedicalFloatingBackground;
