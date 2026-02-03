import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import MedicalFloatingBackground from './MedicalFloatingBackground';
import styles from './Hero.module.css';

const Hero = ({ content, onScrollToProducts }) => {
    // Animation Variants
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const stagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const imageAnim = {
        hidden: { opacity: 0, x: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
        }
    };

    return (
        <section className={styles.heroSection}>
            <MedicalFloatingBackground />
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left: Content */}
                    <motion.div
                        className={styles.content}
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <motion.div variants={fadeIn} className={styles.eyebrow}>
                            TRUSTED BY 500+ HOSPITALS
                        </motion.div>

                        <motion.h1 variants={fadeIn} className={styles.title}>
                            {content.heroTitle || 'Precision Medical Equipment for Modern Healthcare.'}
                        </motion.h1>

                        <motion.p variants={fadeIn} className={styles.subtitle}>
                            {content.heroSubtitle || 'ISO 13485:2016 Certified Manufacturer exporting premium surgical solutions globally.'}
                        </motion.p>

                        <motion.div variants={fadeIn} className={styles.actions}>
                            <Link to="/contact" className={styles.btnPrimary}>
                                Request Quote <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                            <button onClick={onScrollToProducts} className={styles.btnSecondary}>
                                Browse Catalog
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right: Break-out Image */}
                    <motion.div
                        className={styles.imageWrapper}
                        initial="hidden"
                        animate="visible"
                        variants={imageAnim}
                    >
                        <img
                            src="/hero_medical_gloves.png"
                            alt="Premium Surgical Supplies"
                            className={styles.heroImage}
                            onError={(e) => e.target.src = 'https://placehold.co/800x800/transparent/white?text=Surgical+Gloves'}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
