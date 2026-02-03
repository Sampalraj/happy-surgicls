import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Plus, HeartPulse, Dna, Hexagon } from 'lucide-react';

const SurgicalVectors = ({ variant = 'public' }) => {
    // Variants for opacity/intensity
    const isPublic = variant === 'public';
    const opacity = isPublic ? 0.05 : 0.03;
    // Use Deep Teal for public, Slate-Blue for admin to differentiate but keep premium
    const color = isPublic ? '#0F766E' : '#475569';

    // Animation Variants
    const float = {
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
    };

    const pulse = {
        animate: {
            scale: [1, 1.1, 1],
            opacity: [opacity, opacity * 1.5, opacity],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
    };

    const spin = {
        animate: {
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        }}>
            {/* 1. Large DNA Helix (Bottom Right) */}
            <motion.div
                style={{ position: 'absolute', bottom: '-10%', right: '-5%', color }}
                variants={float}
                animate="animate"
            >
                <Dna size={400} opacity={opacity} />
            </motion.div>

            {/* 2. Floating Plus Signs (Scatter) */}
            <motion.div style={{ position: 'absolute', top: '15%', left: '10%', color }} animate={{ y: [0, 30, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                <Plus size={60} opacity={opacity} />
            </motion.div>
            <motion.div style={{ position: 'absolute', top: '40%', right: '20%', color }} animate={{ y: [0, -40, 0] }} transition={{ duration: 7, repeat: Infinity }}>
                <Plus size={40} opacity={opacity * 0.8} />
            </motion.div>

            {/* 3. Hexagon/Cell Structure (Top Left) */}
            <motion.div
                style={{ position: 'absolute', top: '-5%', left: '-5%', color }}
                variants={spin}
                animate="animate"
            >
                <Hexagon size={300} opacity={opacity * 0.5} strokeWidth={1} />
            </motion.div>

            {/* 4. EKG Line (Bottom Overlay) */}
            <div style={{
                position: 'absolute',
                bottom: '50px',
                left: 0,
                width: '100%',
                height: '100px',
                background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,60 L200,60 L230,20 L260,100 L290,60 L400,60 L430,20 L460,100 L490,60 L1200,60' fill='none' stroke='${encodeURIComponent(color)}' stroke-width='2' stroke-opacity='${opacity * 2}' /%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat-x',
                opacity: 0.5
            }}></div>

            {/* 5. Heartbeat (Center-ish) */}
            <motion.div
                style={{ position: 'absolute', top: '20%', right: '35%', color }}
                variants={pulse}
                animate="animate"
            >
                <HeartPulse size={120} opacity={opacity * 0.6} />
            </motion.div>
        </div>
    );
};

export default SurgicalVectors;
