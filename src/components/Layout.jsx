import MegaMenu from './MegaMenu';
import '../styles/megamenu.css';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    let timeoutId;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setIsMegaMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setIsMegaMenuOpen(false);
        }, 200); // Small delay to prevent flickering
    };

    return (
        <div className="layout">
            <header className="main-header" style={{ padding: '0.75rem 0', borderBottom: '1px solid #ddd', background: 'white', position: 'sticky', top: 0, zIndex: 1000 }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                    <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src="/logo.png" alt="Happy Surgicals" style={{ height: 40 }} />
                        <span style={{ color: '#004daa' }}>Happy</span><span style={{ color: '#d32f2f' }}>Surgicals</span>
                    </div>
                    <nav style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center', margin: 0, padding: 0, fontWeight: '500' }}>
                            <li><Link to="/" style={{ color: '#333' }}>Home</Link></li>
                            <li
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ padding: '1rem 0' }} // Increase hit area
                            >
                                <Link to="/products" style={{ color: '#333', padding: '0.5rem 0' }}>Products</Link>
                            </li>
                            <li><Link to="/services" style={{ color: '#333' }}>Services</Link></li>
                            <li><Link to="/manufacturing" style={{ color: '#333' }}>Manufacturing</Link></li>
                            <li><Link to="/about" style={{ color: '#333' }}>About Us</Link></li>
                            <li><Link to="/contact" style={{ color: '#333' }}>Contact</Link></li>
                        </ul>
                    </nav>
                    <div className="header-actions">
                        <Link to="/contact?subject=Bulk Quote Requirement" className="btn btn-primary" style={{ backgroundColor: '#d32f2f', padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                            Request Bulk Quote
                        </Link>
                    </div>

                    {/* Mega Menu Component */}
                    <MegaMenu
                        isVisible={isMegaMenuOpen}
                        onClose={() => setIsMegaMenuOpen(false)}
                    />
                </div>
            </header>
            <main onClick={() => setIsMegaMenuOpen(false)}> {/* Close on outside click */}
                <Outlet />
            </main>
            <footer style={{ background: '#1a202c', color: '#e2e8f0', padding: '4rem 0 2rem', marginTop: 'auto' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                <img src="/logo.png" alt="Happy Surgicals" style={{ height: 32, filter: 'brightness(0) invert(1)' }} />
                                Happy Surgicals
                            </div>
                            <p style={{ opacity: 0.7, lineHeight: '1.6', fontSize: '0.9rem' }}>
                                Leading manufacturer and supplier of high-quality hospital furniture, medical devices, and surgical instruments. ISO 9001:2015 Certified.
                            </p>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>Company</h4>
                            <ul style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
                                <li><Link to="/manufacturing" style={{ color: 'inherit', textDecoration: 'none' }}>Manufacturing</Link></li>
                                <li><Link to="/career" style={{ color: 'inherit', textDecoration: 'none' }}>Careers</Link></li>
                                <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>Products</h4>
                            <ul style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                <li><Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Medical Consumables</Link></li>
                                <li><Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Hospital Furniture</Link></li>
                                <li><Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Surgical Instruments</Link></li>
                                <li><Link to="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Rental Services</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>Get in Touch</h4>
                            <ul style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                <li>+91 98765 43210</li>
                                <li>sales@happysurgicals.com</li>
                                <li>Mumbai, India</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', opacity: 0.6 }}>
                        <p>&copy; 2025 Happy Surgicals Pvt Ltd. All rights reserved.</p>
                        <p>Privacy Policy | Terms of Service</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
