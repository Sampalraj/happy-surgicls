import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { mockBackend } from '../utils/mockBackend';
import MegaMenu from './MegaMenu';
import '../styles/megamenu.css';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [settings, setSettings] = useState({
        siteName: 'Happy Surgicals',
        logo: '/logo.png',
        email: 'sales@happysurgicals.com',
        phone: '+91 98765 43210',
        address: '123, Medical Park, New Delhi',
        socials: {}
    });
    let timeoutId;

    useEffect(() => {
        const data = mockBackend.getSettings();
        if (data && Object.keys(data).length > 0) {
            setSettings(prev => ({ ...prev, ...data }));
        }
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setIsMegaMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setIsMegaMenuOpen(false);
        }, 200);
    };

    return (
        <div className="layout">
            {/* Top Bar */}
            <div className="top-bar" style={{ background: '#1e293b', color: 'white', padding: '0.5rem 0', fontSize: '0.85rem' }}>
                <div className="container top-bar-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="contact-info" style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href={`tel:${settings.phone}`} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                            <Phone size={14} /> {settings.phone}
                        </a>
                        <a href={`mailto:${settings.email}`} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                            <Mail size={14} /> {settings.email}
                        </a>
                    </div>
                    <div className="top-links" style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/about" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>About Us</Link>
                        <Link to="/contact" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Contact</Link>
                        <Link to="/admin" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Admin Login</Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="main-header" style={{ padding: '1rem 0', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 }}>
                <div className="container header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>

                    {/* Logo */}
                    <div className="logo">
                        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ background: 'var(--primary, #3b82f6)', color: 'white', width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>+</div>
                            <span className="logo-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>
                                {settings.siteName}
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <Link to="/" style={{ color: '#333', fontWeight: 500, textDecoration: 'none' }}>Home</Link>

                        {/* Mega Menu Trigger */}
                        <div
                            className="nav-item-dropdown"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ padding: '1rem 0', cursor: 'pointer' }}
                        >
                            <Link to="/products" className="dropdown-trigger" style={{ color: '#333', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                                Products <ChevronDown size={14} />
                            </Link>
                        </div>

                        <Link to="/manufacturing" style={{ color: '#333', fontWeight: 500, textDecoration: 'none' }}>Manufacturing</Link>
                        <Link to="/services" style={{ color: '#333', fontWeight: 500, textDecoration: 'none' }}>Services</Link>
                        <Link to="/about" style={{ color: '#333', fontWeight: 500, textDecoration: 'none' }}>About</Link>
                        <Link to="/contact" className="btn btn-primary" style={{ background: 'var(--primary, #3b82f6)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: 6, textDecoration: 'none', fontWeight: 500 }}>Get Quote</Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button className="mobile-menu-toggle" onClick={toggleMenu} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Mega Menu Component */}
                    <MegaMenu
                        isVisible={isMegaMenuOpen}
                        onClose={() => setIsMegaMenuOpen(false)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            </header>

            {/* Mobile Nav Overlay (Simplified for now) */}
            {isMenuOpen && (
                <div className="mobile-nav" style={{ position: 'fixed', top: 60, left: 0, right: 0, background: 'white', padding: '1rem', borderBottom: '1px solid #eee', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link to="/" onClick={toggleMenu}>Home</Link>
                    <Link to="/products" onClick={toggleMenu}>Products</Link>
                    <Link to="/manufacturing" onClick={toggleMenu}>Manufacturing</Link>
                    <Link to="/services" onClick={toggleMenu}>Services</Link>
                    <Link to="/about" onClick={toggleMenu}>About</Link>
                    <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                </div>
            )}

            {/* Main Content */}
            <main onClick={() => setIsMegaMenuOpen(false)} style={{ minHeight: '60vh' }}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="footer" style={{ background: '#1e293b', color: '#e2e8f0', padding: '4rem 0 2rem' }}>
                <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    <div className="footer-col">
                        <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{settings.siteName}</h3>
                        <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                            {settings.footerDesc || 'Your trusted partner for high-quality medical supplies and hospital equipment. ISO 13485:2016 Certified.'}
                        </p>
                        <div className="social-links" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            {settings.socials?.facebook && <a href={settings.socials.facebook} style={{ color: 'white', opacity: 0.8 }}><Facebook size={20} /></a>}
                            {settings.socials?.twitter && <a href={settings.socials.twitter} style={{ color: 'white', opacity: 0.8 }}><Twitter size={20} /></a>}
                            {settings.socials?.linkedin && <a href={settings.socials.linkedin} style={{ color: 'white', opacity: 0.8 }}><Linkedin size={20} /></a>}
                            {settings.socials?.instagram && <a href={settings.socials.instagram} style={{ color: 'white', opacity: 0.8 }}><Instagram size={20} /></a>}
                        </div>
                    </div>
                    <div className="footer-col">
                        <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Links</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Home</Link></li>
                            <li><Link to="/products" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Products</Link></li>
                            <li><Link to="/manufacturing" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Manufacturing</Link></li>
                            <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>About Us</Link></li>
                            <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Contact Us</h3>
                        <ul className="contact-list" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '0.5rem', opacity: 0.8 }}><MapPin size={18} /> {settings.address}</li>
                            <li style={{ display: 'flex', gap: '0.5rem', opacity: 0.8 }}><Phone size={18} /> {settings.phone}</li>
                            <li style={{ display: 'flex', gap: '0.5rem', opacity: 0.8 }}><Mail size={18} /> {settings.email}</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
                    <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
