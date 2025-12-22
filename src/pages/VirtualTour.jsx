import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Info, CheckCircle, Truck, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const VirtualTour = () => {
    // Scroll handling
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="virtual-tour-container" style={{ background: '#0f172a', color: 'white', overflowX: 'hidden' }}>

            {/* 1. CINEMATIC HERO */}
            <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ duration: 2 }}
                    style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(circle at center, #1e293b 0%, #000 100%)',
                        zIndex: 0
                    }}
                />

                <div style={{ zIndex: 1, textAlign: 'center', padding: '20px' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ fontSize: '5rem', fontWeight: '900', background: 'linear-gradient(to right, #60a5fa, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}
                    >
                        NGX EXPERIENCE
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        style={{ fontSize: '1.5rem', color: '#94a3b8', marginTop: '1rem', letterSpacing: '4px', textTransform: 'uppercase' }}
                    >
                        Next Generation Manufacturing
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                        style={{ position: 'absolute', bottom: '50px', left: '50%', translateX: '-50%' }}
                    >
                        <p style={{ fontSize: '0.8rem', color: '#475569' }}>SCROLL TO EXPLORE</p>
                        <div style={{ width: '1px', height: '40px', background: '#334155', margin: '10px auto' }}></div>
                    </motion.div>
                </div>
            </section>

            {/* 2. INTERACTIVE HOTSPOT SECTION (VR SIMULATION) */}
            <HotspotSection />

            {/* 3. PARALLAX PROCESS FLOW */}
            <ParallaxSection />

            {/* 4. FINAL CTA */}
            <section style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
                <div style={{ textAlign: 'center' }}>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}
                    >
                        Ready for the Future?
                    </motion.h2>
                    <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px', borderRadius: '50px' }}>
                        Schedule Real-World Visit
                    </Link>
                </div>
            </section>
        </div>
    );
};

// -- SUB-COMPONENTS --

const HotspotSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

    const hotspots = [
        { id: 1, x: '30%', y: '40%', title: "Sterilization Unit", desc: "Gamma irradiation chamber ensures 100% sterility.", icon: <Zap size={20} /> },
        { id: 2, x: '60%', y: '30%', title: "Auto-Packaging", desc: "High-speed robotic arms for contamination-free packing.", icon: <Truck size={20} /> },
        { id: 3, x: '50%', y: '70%', title: "Quality Scanner", desc: "AI-powered vision system detects micro-defects.", icon: <Activity size={20} /> },
    ];

    return (
        <section ref={sectionRef} style={{ padding: '100px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.h2
                style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                The Factory Core
            </motion.h2>

            <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', aspectRatio: '16/9', background: '#334155', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                {/* Placeholder for High Tech Factory Image */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, #1e293b, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '2rem', fontWeight: 'bold' }}>
                    [Interactive Factory Model]
                </div>

                {/* Hotspots */}
                {hotspots.map((spot, index) => (
                    <Hotspot key={spot.id} data={spot} delay={index * 0.2} />
                ))}
            </div>

            <p style={{ marginTop: '20px', color: '#94a3b8', fontSize: '0.9rem' }}>
                <Info size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }} />
                Hover over the interactive points to reveal technical details.
            </p>
        </section>
    );
};

const Hotspot = ({ data, delay }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay, type: 'spring' }}
            style={{ position: 'absolute', top: data.y, left: data.x, zIndex: 10 }}
        >
            <motion.div
                whileHover="hover"
                initial="rest"
                style={{ position: 'relative', cursor: 'pointer' }}
            >
                {/* Pulsing Dot */}
                <div style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.5)', borderRadius: '50%', position: 'absolute', top: '-10px', left: '-10px', animation: 'pulse 2s infinite' }}></div>
                <div style={{ width: '20px', height: '20px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 20px #60a5fa' }}></div>

                {/* Tooltip */}
                <motion.div
                    variants={{
                        rest: { opacity: 0, y: 10, scale: 0.9, pointerEvents: 'none' },
                        hover: { opacity: 1, y: 20, scale: 1, pointerEvents: 'auto' }
                    }}
                    style={{ position: 'absolute', top: '100%', left: '-100px', width: '220px', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', padding: '15px', borderRadius: '10px', border: '1px solid #334155', color: 'white' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        {data.icon}
                        <strong style={{ color: '#60a5fa' }}>{data.title}</strong>
                    </div>
                    <div style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{data.desc}</div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const ParallaxSection = () => {
    return (
        <section style={{ padding: '100px 0', overflow: 'hidden' }}>
            <motion.h2
                style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                Scale & Precision
            </motion.h2>

            <div style={{ display: 'flex', gap: '20px', padding: '0 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                {[1, 2, 3, 4].map((item) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ minWidth: '350px', height: '500px', background: '#1e293b', borderRadius: '20px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}
                    >
                        <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '4rem', fontWeight: '900', color: 'rgba(255,255,255,0.05)' }}>0{item}</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Process Step {item}</h3>
                        <p style={{ color: '#94a3b8' }}>Advanced manufacturing step description goes here. Precision engineering at its finest.</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// Global Animation Styles for Pulse
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.5); opacity: 0; }
    100% { transform: scale(1); opacity: 0; }
}
`;
document.head.appendChild(styleSheet);

export default VirtualTour;
