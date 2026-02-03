import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';
import {
    Activity, Building, Users, Award, Settings, ClipboardCheck, Truck,
    Ear, Bone, Scissors, Stethoscope, Microscope, Syringe
} from 'lucide-react';
import { motion } from 'framer-motion';
import MarketSegments from '../components/MarketSegments';
import Hero from '../components/Hero';
import MedicalBackground from '../components/MedicalBackground';
import styles from './Home.module.css';

const Home = () => {
    const [certificates, setCertificates] = useState([]);
    const [content, setContent] = useState({
        heroTitle: 'Premium Medical Equipment Manufacturer',
        heroSubtitle: 'ISO 13485:2016 Certified | Global Exporter | Trusted by 500+ Hospitals',
        stats: { experience: '25+', products: '500+', clients: '1000+' }
    });

    useEffect(() => {
        const loadData = async () => {
            // Fetch Certificates
            const certs = await supabaseService.getCertificates();
            const homepageCerts = certs.filter(c => c.show_on_homepage);
            setCertificates(homepageCerts);

            // Fetch Page Content
            const pageContent = await supabaseService.getPageContent('home');
            if (pageContent) {
                setContent(prev => ({ ...prev, ...pageContent }));
            }
        };
        loadData();
    }, []);

    const scrollToProducts = () => {
        const productSection = document.getElementById('market-segments');
        if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.page}>
            <MedicalBackground />

            {/* HERO SECTION - Premium Redesign */}
            <Hero content={content} onScrollToProducts={scrollToProducts} />

            {/* TRUST STRIP - New */}
            <div className={styles.trustStrip}>
                <div className={styles.container}>
                    <div className={styles.trustGrid}>
                        <div className={styles.trustItem}>
                            <Award size={24} className={styles.trustLogo} />
                            <span className={styles.trustText}>ISO 13485:2016</span>
                        </div>
                        <div className={styles.trustItem}>
                            <ClipboardCheck size={24} className={styles.trustLogo} />
                            <span className={styles.trustText}>CE Certified</span>
                        </div>
                        <div className={styles.trustItem}>
                            <Building size={24} className={styles.trustLogo} />
                            <span className={styles.trustText}>GMP Compliant</span>
                        </div>
                        <div className={styles.trustItem}>
                            <Activity size={24} className={styles.trustLogo} />
                            <span className={styles.trustText}>FDA Registered</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUICK CATEGORY STRIP */}
            <div className={styles.categoryStrip}>
                <div className={styles.container}>
                    <div className={styles.stripGrid}>
                        <CategoryItem icon={<Ear size={24} />} label="ENT" link="/products?category=ent" />
                        <CategoryItem icon={<Bone size={24} />} label="Orthopedic" link="/products?category=ortho" />
                        <CategoryItem icon={<Scissors size={24} />} label="General" link="/products?category=general" />
                        <CategoryItem icon={<Stethoscope size={24} />} label="Diagnostics" link="/products?category=diagnostics" />
                        <CategoryItem icon={<Syringe size={24} />} label="Consumables" link="/products?category=consumables" />
                        <CategoryItem icon={<Activity size={24} />} label="Services" link="/products?category=services" />
                    </div>
                </div>
            </div>

            {/* MARKET SEGMENTS (Living Grid) - Assuming component handles its own styles but matches theme */}
            <div id="market-segments">
                <MarketSegments />
            </div>

            {/* WHY CHOOSE US - Flat Cards */}
            <section className={styles.section} style={{ background: '#F8F9FA' }}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Why Partner With Us?</h2>
                        <p className={styles.sectionSubtitle}>We deliver precision, reliability, and compliance in every product.</p>
                    </div>

                    <div className={styles.cardGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <WhyCard
                            icon={<Building size={32} />}
                            title="In-House Manufacturing"
                            desc="State-of-the-art facility ensuring consistent quality and supply chain control."
                        />
                        <WhyCard
                            icon={<ClipboardCheck size={32} />}
                            title="Quality Assured"
                            desc="ISO 13485:2016 certified processes with rigorous quality checks at every stage."
                        />
                        <WhyCard
                            icon={<Truck size={32} />}
                            title="Pan-India Logistics"
                            desc="Reliable shipping network serving hospitals and dealers across India with real-time tracking."
                        />
                        <WhyCard
                            icon={<Users size={32} />}
                            title="Bulk Supply Capable"
                            desc="High production capacity optimized for large institutional and government tenders."
                        />
                        <WhyCard
                            icon={<Award size={32} />}
                            title="Global Standards"
                            desc="Products meeting CE and global safety standards for international markets."
                        />
                        <WhyCard
                            icon={<Settings size={32} />}
                            title="Rental Services"
                            desc="Flexible short and long-term rental options for high-value medical equipment."
                        />
                    </div>
                </div>
            </section>

            {/* KEY PRODUCT HIGHLIGHTS */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>High-Volume Supplies</h2>
                        <p className={styles.sectionSubtitle}>Ready stock available for bulk institutional orders.</p>
                    </div>
                    <div className={styles.cardGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                        <HighlightCard
                            title="Surgical & Nitrile Gloves"
                            img="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
                            link="/products?category=consumables"
                        />
                        <HighlightCard
                            title="Face Masks & PPE Kits"
                            img="https://images.unsplash.com/photo-1585776245991-cf79dd8fc1f3?auto=format&fit=crop&w=800&q=80"
                            link="/products?category=consumables"
                        />
                        <HighlightCard
                            title="Nebulizers & Respiratory"
                            img="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80"
                            link="/products?category=respiratory"
                        />
                        <HighlightCard
                            title="Hospital Beds"
                            img="https://images.unsplash.com/photo-1516575334481-f85287c2c81d?auto=format&fit=crop&w=800&q=80"
                            link="/products?category=furniture"
                        />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/products" className={styles.btnSecondary}>View Full Catalog &rarr;</Link>
                    </div>
                </div>
            </section>

            {/* MANUFACTURING & QA */}
            <section className={styles.section + ' ' + styles.mfgSection}>
                <div className={styles.container}>
                    <div className={styles.mfgLayout}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Manufacturing Excellence</h2>
                            <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Our manufacturing facility is equipped with advanced machinery and strictly adheres to GMP standards.
                                From raw material selection to final packaging, every step is monitored to ensure zero defects.
                            </p>
                            <ul style={{ color: '#E2E8F0', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ClipboardCheck color="#0f766e" /> Strict Quality Control Protocols</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Building color="#0f766e" /> High-Capacity Production Lines</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Award color="#0f766e" /> ISO Certified Clean Rooms</li>
                            </ul>
                            <Link to="/manufacturing" className={styles.btnPrimary} style={{ border: '1px solid white' }}>Learn About Our Factory</Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1581093458891-2f6a7ca5230d?auto=format&fit=crop&w=800&q=80"
                                alt="Manufacturing Facility"
                                style={{ width: '100%', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                                onError={(e) => e.target.src = 'https://placehold.co/600x400/2c3e50/white?text=Factory+Floor'}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TRUST & CERTIFICATIONS */}
            {certificates.length > 0 && (
                <section className={styles.section} style={{ paddingBottom: '2rem' }}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Certified & Trusted</h2>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
                            {certificates.map(cert => (
                                <div key={cert.id} style={{ textAlign: 'center', width: '120px' }}>
                                    <img src={cert.image} alt={cert.name} style={{ height: '80px', objectFit: 'contain', marginBottom: '0.5rem' }} />
                                    <h4 style={{ fontSize: '0.9rem', color: '#64748B' }}>{cert.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FINAL CTA */}
            <section className={styles.finalCta}>
                <div className={styles.container}>
                    <h2 className={styles.finalTitle}>Ready to upgrade your inventory?</h2>
                    <p className={styles.heroSubtitle} style={{ margin: '0 auto 2rem auto' }}>
                        Partner with Happy Surgicals for premium quality and competitive pricing.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/contact" className={styles.btnPrimary}>Contact Sales Team</Link>
                        <Link to="/products" className={styles.btnSecondary} style={{ backgroundColor: 'white' }}>View Product Catalog</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const CategoryItem = ({ icon, label, link }) => (
    <Link to={link || '#'} className={styles.stripItem}>
        <div className={styles.stripIconBox}>
            {icon}
        </div>
        <span className={styles.stripLabel}>{label}</span>
    </Link>
);

const WhyCard = ({ icon, title, desc }) => (
    <div className={styles.flatCard}>
        <div className={styles.flatCardIcon}>{icon}</div>
        <h3 className={styles.flatCardTitle}>{title}</h3>
        <p className={styles.flatCardDesc}>{desc}</p>
    </div>
);

const HighlightCard = ({ title, img, link }) => (
    <Link to={link || '#'} className={styles.imageCard}>
        <div className={styles.imageContainer}>
            <img src={img} alt={title} onError={(e) => e.target.src = 'https://placehold.co/400x300/f1f5f9/94a3b8?text=' + title.replace(' ', '+')} />
        </div>
        <div className={styles.imageContent}>
            <h4 className={styles.imageTitle}>{title}</h4>
            <span className={styles.imageLink}>View Products &rarr;</span>
        </div>
    </Link>
);

export default Home;
