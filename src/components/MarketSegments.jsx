import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';
import {
    Activity, ShieldCheck, Stethoscope, Briefcase,
    ArrowRight, UserCheck, HeartPulse, Bone, User
} from 'lucide-react';
import styles from './MarketSegments.module.css';

// Fallback data in case DB is empty or loading
// Fallback data in case DB is empty or loading
const DEFAULT_SEGMENTS = [
    {
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Premium supplies for Hospitals, Clinics & Nursing Homes.',
        icon: 'Stethoscope',
        link: '/products?category=healthcare',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' // Hospital Hallway
    },
    {
        id: 'safety',
        name: 'Industrial Safety',
        description: 'Complete protection gear for Workforce Safety.',
        icon: 'ShieldCheck',
        link: '/products?category=safety',
        image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f138?auto=format&fit=crop&w=800&q=80' // Lab/Industry
    },
    {
        id: 'respiratory',
        name: 'Respiratory Care',
        description: 'Oxygen therapy and breathing assistance devices.',
        icon: 'Activity',
        link: '/products?category=respiratory',
        image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80' // Oxygen/Mask
    },
    {
        id: 'personal',
        name: 'Personal Care',
        description: 'Hygiene and daily living aids for adults.',
        icon: 'User',
        link: '/products?category=personal',
        image: 'https://images.unsplash.com/photo-1576091160550-217358c7e618?auto=format&fit=crop&w=800&q=80' // Patient Care
    },
    {
        id: 'ortho',
        name: 'Orthopedic',
        description: 'Support and rehabilitation for bone & joint health.',
        icon: 'Bone',
        link: '/products?category=ortho',
        image: 'https://images.unsplash.com/photo-1583912267669-e7d6928e461b?auto=format&fit=crop&w=800&q=80' // X-Ray/Bone
    },
    {
        id: 'services',
        name: 'Services',
        description: 'Equipment rental and biomedical maintenance.',
        icon: 'HeartPulse',
        link: '/services',
        image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=800&q=80' // Technician/Service
    }
];

// Icon Mapper
const IconMap = {
    'Healthcare': Stethoscope,
    'Industrial Safety': ShieldCheck,
    'Respiratory Care': Activity,
    'Personal Care': User,
    'Orthopedic': Bone,
    'Services': HeartPulse,
};

const MarketSegments = () => {
    const [segments, setSegments] = useState(DEFAULT_SEGMENTS);

    useEffect(() => {
        const fetchSegments = async () => {
            const data = await supabaseService.getSegments();
            if (data && data.length > 0) {
                const merged = data.map(seg => ({
                    ...seg,
                    icon: IconMap[seg.name] || Activity,
                    link: seg.link || `/products?segment=${seg.id}`,
                    // Ideally we'd merge DB image if exists, else fallback to default by ID
                    image: seg.image || DEFAULT_SEGMENTS.find(d => d.id === seg.id)?.image || 'https://placehold.co/600x400'
                }));
                // Prioritize merged data if available, but for now stick to defaults to ensure images show
                // un-comment below to use real DB data
                // setSegments(merged); 
            }
        };
        fetchSegments();
    }, []);

    // --- Framer Motion Layout ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className={styles.section} id="market-segments">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Market Segments</h2>
                    <p className={styles.subtitle}>
                        Specialized solutions tailored for every sector of the healthcare ecosystem.
                    </p>
                </div>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {segments.map((seg, index) => {
                        const IconComponent = typeof seg.icon === 'string'
                            ? (IconMap[seg.name] || Activity)
                            : seg.icon;

                        return (
                            <motion.div
                                key={seg.id || index}
                                variants={cardVariants}
                            >
                                <Link
                                    to={seg.link}
                                    className={styles.card}
                                >
                                    {/* Image Top */}
                                    <div className={styles.cardImageWrapper}>
                                        <img
                                            src={seg.image}
                                            alt={seg.name}
                                            className={styles.cardImage}
                                            onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Medical'}
                                        />
                                        <div className={styles.cardIconFloater}>
                                            <IconComponent size={24} />
                                        </div>
                                    </div>

                                    {/* Content Bottom */}
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardName}>{seg.name}</h3>
                                        <p className={styles.cardDesc}>{seg.description}</p>
                                        <div className={styles.arrow}>
                                            Explore <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default MarketSegments;
