import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockBackend } from '../utils/mockBackend';
import { ArrowRight, Star, ShieldCheck, Activity, Building, Users, Award, Clock, Settings, ClipboardCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/home.css';

const Home = () => {
    const [certificates, setCertificates] = useState([]);
    const [content, setContent] = useState({
        heroTitle: 'Premium Medical Equipment Manufacturer',
        heroSubtitle: 'ISO 13485:2016 Certified | Global Exporter | Trusted by 500+ Hospitals',
        stats: { experience: '25+', products: '500+', clients: '1000+' }
    });

    useEffect(() => {
        // Fetch Certificates
        const allCerts = mockBackend.getCertificates();
        const homepageCerts = allCerts.filter(c => c.status === 'Active' && c.show_on_homepage);
        setCertificates(homepageCerts);

        // Fetch Page Content
        const pageContent = mockBackend.getPageContent('home');
        if (pageContent && Object.keys(pageContent).length > 0) {
            setContent(prev => ({ ...prev, ...pageContent }));
        }
    }, []);

    const scrollToProducts = () => {
        const productSection = document.getElementById('featured-products');
        if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- ANIMATION VARIANTS ---
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const scaleUp = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="home-page" style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="hero-bg-overlay"></div>

                {/* Animated Background Element */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)' }}
                />

                <div className="container hero-content">
                    <motion.div
                        className="hero-text-col"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="badge-pill">
                            <Star size={14} fill="#eab308" color="#eab308" /> #1 Medical Supplier in Delhi
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="hero-title">
                            {content.heroTitle}
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="hero-subtitle">
                            {content.heroSubtitle}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="hero-cta-group">
                            <button onClick={scrollToProducts} className="btn btn-primary">
                                Brows Products <ArrowRight size={18} />
                            </button>
                            <Link to="/contact" className="btn btn-outline">Request Quote</Link>
                        </motion.div>

                        {/* Stats Strip - Integrated in Hero */}
                        <motion.div
                            variants={fadeInUp}
                            className="hero-stats"
                            style={{ marginTop: '3rem' }}
                        >
                            <div className="stat-item">
                                <span className="stat-number">{content.stats.experience}</span>
                                <span className="stat-label">Years Exp.</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">{content.stats.products}</span>
                                <span className="stat-label">Products</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">{content.stats.clients}</span>
                                <span className="stat-label">Happy Clients</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* PRODUCT CATEGORIES (4x2 Grid) */}
            <motion.section
                className="section"
                id="featured-products"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className="container">
                    <motion.div variants={fadeInUp} className="section-header">
                        <h2 className="section-title">Product Categories</h2>
                        <p className="section-subtitle">Comprehensive range of medical and surgical supplies manufactured to global standards.</p>
                    </motion.div>

                    <div className="category-grid">
                        <CategoryCard icon={<Activity size={32} />} title="Medical Consumables" desc="Gloves, Masks, Syringes, & Disposables" link="/products?category=consumables" variants={fadeInUp} />
                        <CategoryCard icon={<Activity size={32} />} title="Medical Equipment" desc="Monitors, ECG, & Diagnostic Devices" link="/products?category=equipment" variants={fadeInUp} />
                        <CategoryCard icon={<Activity size={32} />} title="Respiratory Care" desc="Nebulizers, Oxygen Concentrators, BiPAP" link="/products?category=respiratory" variants={fadeInUp} />
                        <CategoryCard icon={<Settings size={32} />} title="Hospital Furniture" desc="Hospital Beds, Wheelchairs, & Trolleys" link="/products?category=furniture" variants={fadeInUp} />
                        <CategoryCard icon={<Activity size={32} />} title="Orthopedic Support" desc="Braces, Supports, & Rehabilitation Aids" link="/products?category=ortho" variants={fadeInUp} />
                        <CategoryCard icon={<ShieldCheck size={32} />} title="Personal Care" desc="Adult Diapers, Wipes, & Hygiene" link="/products?category=hygiene" variants={fadeInUp} />
                        <CategoryCard icon={<ShieldCheck size={32} />} title="Industrial Safety" desc="Safety Shoes, Helmets, & Workwear" link="/products?category=safety" variants={fadeInUp} />
                        <CategoryCard icon={<Settings size={32} />} title="Instruments" desc="Surgical Instruments & Accessories" link="/products?category=instruments" variants={fadeInUp} />
                    </div>
                </div>
            </motion.section>

            {/* KEY PRODUCT HIGHLIGHTS */}
            <motion.section
                className="section highlights-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className="container">
                    <motion.div variants={fadeInUp} className="section-header">
                        <h2 className="section-title">High-Volume Supplies</h2>
                        <p className="section-subtitle">Ready stock available for bulk institutional orders.</p>
                    </motion.div>
                    <div className="highlight-grid">
                        <HighlightCard title="Surgical & Nitrile Gloves" img="/placeholder_gloves.jpg" link="/products?category=consumables" variants={scaleUp} />
                        <HighlightCard title="Face Masks & PPE Kits" img="/placeholder_mask.jpg" link="/products?category=consumables" variants={scaleUp} />
                        <HighlightCard title="Nebulizers & Respiratory" img="/placeholder_nebulizer.jpg" link="/products?category=respiratory" variants={scaleUp} />
                        <HighlightCard title="Hospital Beds" img="/placeholder_bed.jpg" link="/products?category=furniture" variants={scaleUp} />
                    </div>
                    <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/products" className="btn-hero-primary" style={{ background: '#1e293b', color: 'white' }}>View Full Catalog</Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* WHY CHOOSE US */}
            <motion.section
                className="section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className="container">
                    <motion.div variants={fadeInUp} className="section-header">
                        <h2 className="section-title">Why Partner With Us?</h2>
                    </motion.div>
                    <div className="why-us-grid">
                        <WhyCard icon={<Building size={28} />} title="In-House Manufacturing" desc="State-of-the-art facility ensuring consistent quality and supply chain control." variants={fadeInUp} />
                        <WhyCard icon={<ClipboardCheck size={28} />} title="Quality Assured" desc="ISO 13485:2016 certified processes with rigorous quality checks." variants={fadeInUp} />
                        <WhyCard icon={<Truck size={28} />} title="Pan-India Logistics" desc="Reliable shipping network serving hospitals and dealers across India." variants={fadeInUp} />
                        <WhyCard icon={<Users size={28} />} title="Bulk Supply Capable" desc="High production capacity for large institutional and government tenders." variants={fadeInUp} />
                        <WhyCard icon={<Award size={28} />} title="Certified Products" desc="Products meeting CE and global safety standards." variants={fadeInUp} />
                        <WhyCard icon={<Settings size={28} />} title="Rental Services" desc="Flexible rental options for medical equipment." variants={fadeInUp} />
                    </div>
                </div>
            </motion.section>

            {/* MANUFACTURING & QA */}
            <motion.section
                className="section mfg-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="container">
                    <div className="mfg-layout">
                        <motion.div
                            className="mfg-content"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="section-title" style={{ color: 'white' }}>Manufacturing Excellence</h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Our manufacturing facility is equipped with advanced machinery and strictly adheres to GMP standards.
                                From raw material selection to final packaging, every step is monitored to ensure zero defects.
                            </p>
                            <ul style={{ color: '#cbd5e1', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <motion.li
                                    initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ClipboardCheck color="#4ade80" /> Strict Quality Control Protocols</motion.li>
                                <motion.li
                                    initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Building color="#4ade80" /> High-Capacity Production Lines</motion.li>
                                <motion.li
                                    initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Award color="#4ade80" /> ISO Certified Clean Rooms</motion.li>
                            </ul>
                            <Link to="/manufacturing" className="btn-hero-secondary">Learn About Our Factory</Link>
                        </motion.div>
                        <motion.div
                            className="mfg-image"
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src="/placeholder_factory.jpg" alt="Manufacturing Facility" onError={(e) => e.target.style.display = 'none'} />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* SERVICES */}
            <motion.section
                className="section services-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className="container">
                    <motion.div variants={fadeInUp} className="section-header">
                        <h2 className="section-title">Our Services</h2>
                    </motion.div>
                    <div className="highlight-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <motion.div variants={fadeInUp} className="service-card">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>Equipment Rental</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Short and long-term rental solutions for BiPAP, CPAP, Oxygen Concentrators, and Hospital Beds.</p>
                            <Link to="/contact?subject=Rental Inquiry" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none' }}>Request Rental &rarr;</Link>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="service-card">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>Bulk Supply</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Wholesale pricing and dedicated supply chain for Hospitals, Nursing Homes, and Clinics.</p>
                            <Link to="/contact?subject=Bulk Supply Inquiry" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none' }}>Get Quote &rarr;</Link>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="service-card">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>Distributorship</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Join our growing network of dealers and distributors across India. Attractive margins.</p>
                            <Link to="/contact?subject=Distributor Inquiry" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none' }}>Become Partner &rarr;</Link>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* TRUST & CERTIFICATIONS */}
            {certificates.length > 0 && (
                <motion.section
                    className="section trust-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    <div className="container">
                        <motion.div variants={fadeInUp} className="section-header">
                            <h2 className="section-title">Certified & Trusted</h2>
                            <p className="section-subtitle">Our commitment to quality is validated by international certifications and standards.</p>
                        </motion.div>
                        <div className="certificates-grid">
                            {certificates.map(cert => (
                                <motion.div key={cert.id} variants={scaleUp} className="cert-badge">
                                    <img src={cert.image} alt={cert.name} className="cert-image" />
                                    <div className="cert-info">
                                        <h4 className="cert-name">{cert.name}</h4>
                                        <p className="cert-type">{cert.type}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* TRUST / FINAL CTA */}
            <section className="final-cta">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}
                    >
                        Looking for a reliable medical product manufacturer?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ fontSize: '1.25rem', color: '#93c5fd', marginBottom: '3rem' }}
                    >
                        Partner with Happy Surgicals for premium quality and competitive pricing.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
                    >
                        <Link to="/contact" className="btn-hero-primary">Contact Sales Team</Link>
                        <Link to="/products" className="btn-hero-secondary">View Product Catalog</Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

// Sub-components wrapped with Motion logic (passing variants)
const CategoryCard = ({ icon, title, desc, link, variants }) => (
    <motion.div variants={variants}>
        <Link to={link || '#'} className="cat-card">
            <div className="cat-icon">{icon}</div>
            <h3 className="cat-title">{title}</h3>
            <p className="cat-desc">{desc}</p>
        </Link>
    </motion.div>
);

const HighlightCard = ({ title, img, link, variants }) => (
    <motion.div variants={variants}>
        <Link to={link || '#'} className="highlight-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="highlight-img">
                <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className="highlight-content">
                <h4 style={{ fontWeight: '700', fontSize: '1.1rem', margin: 0 }}>{title}</h4>
                <span style={{ color: '#3b82f6', fontSize: '0.9rem', marginTop: '0.5rem', display: 'inline-block' }}>View Products &rarr;</span>
            </div>
        </Link>
    </motion.div>
);

const WhyCard = ({ icon, title, desc, variants }) => (
    <motion.div variants={variants} className="why-card">
        <div className="why-icon">{icon}</div>
        <div>
            <h4 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{title}</h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>{desc}</p>
        </div>
    </motion.div>
);

export default Home;
