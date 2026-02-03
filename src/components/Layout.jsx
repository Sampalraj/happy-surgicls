import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Facebook, Twitter, Linkedin, Instagram, ChevronRight, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabaseService } from '../utils/supabaseService';
import './Layout.css';
import MegaMenu from './MegaMenu';
import '../styles/megamenu.css';
import SurgicalVectors from './SurgicalVectors';

// Navigation Data (Mirrors MegaMenu)
const MENU_DATA = [
    {
        title: 'Medical Consumables',
        link: '/products?category=consumables',
        items: [
            { name: 'Surgical Gloves', link: '/products?category=consumables' },
            { name: 'Face Masks & PPE', link: '/products?category=consumables' },
            { name: 'Disposables', link: '/products?category=consumables' }
        ]
    },
    {
        title: 'Medical Equipment',
        link: '/products?category=equipment',
        items: [
            { name: 'Pulse Oximeters', link: '/products?category=equipment' },
            { name: 'BP Monitors', link: '/products?category=equipment' },
            { name: 'Nebulizers', link: '/products?category=equipment' }
        ]
    },
    {
        title: 'Hospital Furniture',
        link: '/products?category=furniture',
        items: [
            { name: 'Hospital Beds', link: '/products?category=furniture' },
            { name: 'Wheel Chairs', link: '/products?category=furniture' },
            { name: 'Ward Furniture', link: '/products?category=furniture' }
        ]
    },
    {
        title: 'Orthopedic & Safety',
        link: '/products?category=ortho',
        items: [
            { name: 'Ortho Supports', link: '/products?category=ortho' },
            { name: 'Adult Diapers', link: '/products?category=hygiene' },
            { name: 'Safety Gloves', link: '/products?category=safety' }
        ]
    }
];

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false); // Mobile Accordion State
    const [settings, setSettings] = useState({
        siteName: 'Happy Surgicals',
        logo: '/logo.png',
        email: 'sales@happysurgicals.com',
        phone: '+91 98765 43210',
        address: '123, Medical Park, New Delhi',
        socials: {}
    });
    const location = useLocation();
    let timeoutId;

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await supabaseService.getSettings();
            if (data && Object.keys(data).length > 0) {
                setSettings(prev => ({ ...prev, ...data }));
            }
        };
        fetchSettings();
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setMobileProductsOpen(false);
    }, [location]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleMouseEnter = () => {
        if (window.innerWidth > 960) { // Only hover on desktop
            clearTimeout(timeoutId);
            setIsMegaMenuOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 960) {
            timeoutId = setTimeout(() => {
                setIsMegaMenuOpen(false);
            }, 200);
        }
    };

    return (
        <div className="layout" style={{ position: 'relative' }}>
            <SurgicalVectors variant="public" />

            {/* Top Bar - Mobile Optimized */}
            <div className="top-bar">
                <div className="container top-bar-content">
                    <div className="contact-info">
                        <a href={`tel:${settings.phone}`} className="top-link">
                            <Phone size={14} /> <span>{settings.phone}</span>
                        </a>
                        <a href={`mailto:${settings.email}`} className="top-link hidden-mobile">
                            <Mail size={14} /> <span>{settings.email}</span>
                        </a>
                    </div>
                    <div className="top-links">
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="main-header">
                <div className="container header-content">
                    {/* Logo */}
                    <div className="logo">
                        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <img src="/assets/logo.png" alt="Happy Surgicals" style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
                                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="font-weight:800; color:#0F766E; font-size:1.5rem">HAPPY<span style="color:#F43F5E">.</span></span>' }}
                            />
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="desktop-nav">
                        <Link to="/" className="nav-link">Home</Link>
                        <div
                            className="nav-item-dropdown"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to="/products" className="dropdown-trigger nav-link">
                                Products <ChevronDown size={14} />
                            </Link>
                        </div>
                        <Link to="/manufacturing" className="nav-link">Manufacturing</Link>
                        <Link to="/services" className="nav-link">Services</Link>
                        <Link to="/contact" className="nav-cta">Get Quote</Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={28} color="#FFFFFF" /> : <Menu size={28} color="#FFFFFF" />}
                    </button>

                    {/* Desktop Mega Menu */}
                    <MegaMenu
                        isVisible={isMegaMenuOpen}
                        onClose={() => setIsMegaMenuOpen(false)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            </header>

            {/* Mobile Nav Overlay (Drawer) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="mobile-nav-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="mobile-nav-content">
                            <Link to="/" className="mobile-link">Home</Link>

                            {/* Mobile Accordion for Products */}
                            <div className="mobile-accordion">
                                <button className="mobile-link accordion-trigger" onClick={() => setMobileProductsOpen(!mobileProductsOpen)}>
                                    Products
                                    <ChevronDown size={18} style={{ transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                                </button>
                                <AnimatePresence>
                                    {mobileProductsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="accordion-content"
                                        >
                                            <Link to="/products" className="mobile-sublink highlight">View All Products</Link>
                                            {MENU_DATA.map((cat, i) => (
                                                <div key={i} className="mobile-cat-group">
                                                    <span className="mobile-cat-title">{cat.title}</span>
                                                    {cat.items.map((item, j) => (
                                                        <Link key={j} to={item.link} className="mobile-sublink">
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link to="/manufacturing" className="mobile-link">Manufacturing</Link>
                            <Link to="/services" className="mobile-link">Services</Link>
                            <Link to="/about" className="mobile-link">About Us</Link>

                            <div style={{ marginTop: '2rem' }}>
                                <Link to="/contact" className="btn-mobile-cta">
                                    Request Quote <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay Backdrop for Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
                    onClick={toggleMenu}
                    style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 998 }}
                />
            )}

            {/* Main Content */}
            <main onClick={() => setIsMegaMenuOpen(false)} style={{ minHeight: '60vh', position: 'relative', zIndex: 5 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container footer-grid">
                    <div className="footer-col">
                        <img src="/assets/logo-white.png" alt={settings.siteName} style={{ height: '40px', marginBottom: '1.5rem', opacity: 0.9 }} onError={(e) => { e.target.style.display = 'none'; }} />
                        <h3 className="footer-title">{settings.siteName}</h3>
                        <p className="footer-desc">
                            {settings.footerDesc || 'Global manufacturer of premium surgical instruments and hospital furniture. ISO 13485:2016 Certified.'}
                        </p>
                        <div className="social-links">
                            {settings.socials?.facebook && <a href={settings.socials.facebook}><Facebook size={20} /></a>}
                            {settings.socials?.linkedin && <a href={settings.socials.linkedin}><Linkedin size={20} /></a>}
                            {settings.socials?.twitter && <a href={settings.socials.twitter}><Twitter size={20} /></a>}
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>PRODUCTS</h4>
                        <ul>
                            <li><Link to="/products?category=consumables">Consumables</Link></li>
                            <li><Link to="/products?category=furniture">Hospital Furniture</Link></li>
                            <li><Link to="/products?category=equipment">Medical Equipment</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>COMPANY</h4>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/manufacturing">Our Factory</Link></li>
                            <li><Link to="/contact">Contact Support</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>CONTACT</h4>
                        <ul className="contact-list">
                            <li><MapPin size={18} className="icon-teal" /> <span>{settings.address}</span></li>
                            <li><Phone size={18} className="icon-teal" /> <span>{settings.phone}</span></li>
                            <li><Mail size={18} className="icon-teal" /> <span>{settings.email}</span></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
