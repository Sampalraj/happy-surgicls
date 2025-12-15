import React from 'react';
import { Link } from 'react-router-dom';
import {
    Activity, ShieldCheck, Truck, Users, Settings,
    Award, ClipboardCheck, ArrowRight, Building, CheckCircle
} from 'lucide-react';
import '../styles/home.css';

const Home = () => {
    return (
        <div className="landing-page">

            {/* HERO SECTION - Manufacturer Positioning */}
            <section className="hero-section">
                <div className="hero-pattern"></div>
                <div className="container hero-content">
                    <span className="hero-tag">ISO 13485:2016 Certified Manufacturer</span>
                    <h1 className="hero-title">
                        Manufacturer & Supplier of Medical, Surgical & Industrial Healthcare Products
                    </h1>
                    <p className="hero-subtitle">
                        Trusted manufacturer of gloves, PPE kits, medical devices, hospital furniture, and respiratory care products.
                        Supplying hospitals, distributors, and institutions across India.
                    </p>
                    <div className="hero-actions">
                        <Link to="/products" className="btn-hero-primary">Explore Product Categories</Link>
                        <Link to="/contact?subject=Bulk Requirement" className="btn-hero-secondary">Request Bulk Quote</Link>
                    </div>
                </div>
            </section>

            {/* PRODUCT CATEGORIES (4x2 Grid) */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Product Categories</h2>
                        <p className="section-subtitle">Comprehensive range of medical and surgical supplies manufactured to global standards.</p>
                    </div>

                    <div className="category-grid">
                        <CategoryCard
                            icon={<Activity size={32} />}
                            title="Medical Consumables"
                            desc="Gloves, Masks, Syringes, & Disposables"
                            link="/products?category=consumables"
                        />
                        <CategoryCard
                            icon={<Activity size={32} />}
                            title="Medical Equipment"
                            desc="Monitors, ECG, & Diagnostic Devices"
                            link="/products?category=equipment"
                        />
                        <CategoryCard
                            icon={<Activity size={32} />}
                            title="Respiratory Care"
                            desc="Nebulizers, Oxygen Concentrators, BiPAP"
                            link="/products?category=respiratory"
                        />
                        <CategoryCard
                            icon={<Settings size={32} />}
                            title="Hospital Furniture"
                            desc="Hospital Beds, Wheelchairs, & Trolleys"
                            link="/products?category=furniture"
                        />
                        <CategoryCard
                            icon={<Activity size={32} />}
                            title="Orthopedic Support"
                            desc="Braces, Supports, & Rehabilitation Aids"
                            link="/products?category=ortho"
                        />
                        <CategoryCard
                            icon={<ShieldCheck size={32} />}
                            title="Personal Care"
                            desc="Adult Diapers, Wipes, & Hygiene"
                            link="/products?category=hygiene"
                        />
                        <CategoryCard
                            icon={<ShieldCheck size={32} />}
                            title="Industrial Safety"
                            desc="Safety Shoes, Helmets, & Workwear"
                            link="/products?category=safety"
                        />
                        <CategoryCard
                            icon={<Settings size={32} />}
                            title="Instruments"
                            desc="Surgical Instruments & Accessories"
                            link="/products?category=instruments"
                        />
                    </div>
                </div>
            </section>

            {/* KEY PRODUCT HIGHLIGHTS */}
            <section className="section highlights-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">High-Volume Supplies</h2>
                        <p className="section-subtitle">Ready stock available for bulk institutional orders.</p>
                    </div>
                    <div className="highlight-grid">
                        <HighlightCard
                            title="Surgical & Nitrile Gloves"
                            img="/placeholder_gloves.jpg"
                            link="/products?category=consumables"
                        />
                        <HighlightCard
                            title="Face Masks & PPE Kits"
                            img="/placeholder_mask.jpg"
                            link="/products?category=consumables"
                        />
                        <HighlightCard
                            title="Nebulizers & Respiratory"
                            img="/placeholder_nebulizer.jpg"
                            link="/products?category=respiratory"
                        />
                        <HighlightCard
                            title="Hospital Beds"
                            img="/placeholder_bed.jpg"
                            link="/products?category=furniture"
                        />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/products" className="btn-hero-primary" style={{ background: '#1e293b', color: 'white' }}>View Full Catalog</Link>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why Partner With Us?</h2>
                    </div>
                    <div className="why-us-grid">
                        <WhyCard
                            icon={<Building size={28} />}
                            title="In-House Manufacturing"
                            desc="State-of-the-art facility ensuring consistent quality and supply chain control."
                        />
                        <WhyCard
                            icon={<ClipboardCheck size={28} />}
                            title="Quality Assured"
                            desc="ISO 13485:2016 certified processes with rigorous quality checks."
                        />
                        <WhyCard
                            icon={<Truck size={28} />}
                            title="Pan-India Logistics"
                            desc="Reliable shipping network serving hospitals and dealers across India."
                        />
                        <WhyCard
                            icon={<Users size={28} />}
                            title="Bulk Supply Capable"
                            desc="High production capacity for large institutional and government tenders."
                        />
                        <WhyCard
                            icon={<Award size={28} />}
                            title="Certified Products"
                            desc="Products meeting CE and global safety standards."
                        />
                        <WhyCard
                            icon={<Settings size={28} />}
                            title="Rental Services"
                            desc="Flexible rental options for medical equipment."
                        />
                    </div>
                </div>
            </section>

            {/* MANUFACTURING & QA */}
            <section className="section mfg-section">
                <div className="container">
                    <div className="mfg-layout">
                        <div className="mfg-content">
                            <h2 className="section-title" style={{ color: 'white' }}>Manufacturing Excellence</h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Our manufacturing facility is equipped with advanced machinery and strictly adheres to GMP standards.
                                From raw material selection to final packaging, every step is monitored to ensure zero defects.
                            </p>
                            <ul style={{ color: '#cbd5e1', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ClipboardCheck color="#4ade80" /> Strict Quality Control Protocols</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Building color="#4ade80" /> High-Capacity Production Lines</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Award color="#4ade80" /> ISO Certified Clean Rooms</li>
                            </ul>
                            <Link to="/manufacturing" className="btn-hero-secondary">Learn About Our Factory</Link>
                        </div>
                        <div className="mfg-image">
                            <img src="/placeholder_factory.jpg" alt="Manufacturing Facility" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="section services-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Services</h2>
                    </div>
                    <div className="highlight-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <div className="service-card">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>Equipment Rental</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Short and long-term rental solutions for BiPAP, CPAP, Oxygen Concentrators, and Hospital Beds.</p>
                            <Link to="/contact?subject=Rental Inquiry" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none' }}>Request Rental &rarr;</Link>
                        </div>
                        <div className="service-card">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>Bulk Supply</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Wholesale pricing and dedicated supply chain for Hospitals, Nursing Homes, and Clinics.</p>
                            <Link to="/contact?subject=Bulk Supply Inquiry" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none' }}>Get Quote &rarr;</Link>
                        </div>
                        <div className="service-card">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold' }}>Distributorship</h3>
                            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Join our growing network of dealers and distributors across India. Attractive margins.</p>
                            <Link to="/contact?subject=Distributor Inquiry" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none' }}>Become Partner &rarr;</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST / FINAL CTA */}
            <section className="final-cta">
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Looking for a reliable medical product manufacturer?</h2>
                    <p style={{ fontSize: '1.25rem', color: '#93c5fd', marginBottom: '3rem' }}>Partner with Happy Surgicals for premium quality and competitive pricing.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/contact" className="btn-hero-primary">Contact Sales Team</Link>
                        <Link to="/products" className="btn-hero-secondary">View Product Catalog</Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

// Sub-components for cleaner code
const CategoryCard = ({ icon, title, desc, link }) => (
    <Link to={link || '#'} className="cat-card">
        <div className="cat-icon">{icon}</div>
        <h3 className="cat-title">{title}</h3>
        <p className="cat-desc">{desc}</p>
    </Link>
);

const HighlightCard = ({ title, img, link }) => (
    <Link to={link || '#'} className="highlight-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="highlight-img">
            <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
        </div>
        <div className="highlight-content">
            <h4 style={{ fontWeight: '700', fontSize: '1.1rem', margin: 0 }}>{title}</h4>
            <span style={{ color: '#3b82f6', fontSize: '0.9rem', marginTop: '0.5rem', display: 'inline-block' }}>View Products &rarr;</span>
        </div>
    </Link>
);

const WhyCard = ({ icon, title, desc }) => (
    <div className="why-card">
        <div className="why-icon">{icon}</div>
        <div>
            <h4 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{title}</h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>{desc}</p>
        </div>
    </div>
);

export default Home;
