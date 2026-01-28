import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    LayoutDashboard, Package, Palette, FileText, Settings, User, LogOut,
    Image, MessageSquare, List, ShieldCheck, ClipboardList
} from 'lucide-react';
import '../../styles/admin-soft.css'; // Changed to new soft theme
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, loading, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    const isActive = (path) => location.pathname === path ? 'active' : '';

    useEffect(() => {
        if (!loading && !user) {
            navigate('/admin/login');
        }
    }, [user, loading, navigate]);

    if (loading) return null; // Or a nice spinner
    if (!user) return null;

    const userName = user.user_metadata?.name || 'Admin';
    const userRole = user.user_metadata?.role || 'Administrator';

    return (
        <div className="admin-layout">
            {/* FLOATING SIDEBAR */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <img src="/assets/logo.png" alt="Happy Surgicals" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link to="/admin" className={isActive('/admin')}>
                                <LayoutDashboard size={20} /> Dashboard
                            </Link>
                        </li>

                        <li className="nav-header">Management</li>
                        <li>
                            <Link to="/admin/products" className={isActive('/admin/products')}>
                                <Package size={20} /> Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/segments" className={isActive('/admin/segments')}>
                                <List size={20} /> Market Segments
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/categories" className={isActive('/admin/categories')}>
                                <List size={20} /> Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/enquiries" className={isActive('/admin/enquiries')}>
                                <MessageSquare size={20} /> Orders
                            </Link>
                        </li>

                        <li className="nav-header">Content</li>
                        <li>
                            <Link to="/admin/pages" className={isActive('/admin/pages')}>
                                <FileText size={20} /> Pages
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/media" className={isActive('/admin/media')}>
                                <Image size={20} /> Media
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/certificates" className={isActive('/admin/certificates')}>
                                <ShieldCheck size={20} /> Certificates
                            </Link>
                        </li>

                        <li className="nav-header">System</li>
                        <li>
                            <Link to="/admin/settings" className={isActive('/admin/settings')}>
                                <Settings size={20} /> Settings
                            </Link>
                        </li>
                        <li>
                            <div onClick={logout} style={{ cursor: 'pointer', padding: '0.875rem 1.25rem', color: '#EF4444', fontWeight: 500, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <LogOut size={20} /> Logout
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <h2 className="page-title">
                        {location.pathname === '/admin' ? 'Dashboard' :
                            location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1)}
                    </h2>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: 300 }}>
                            <span style={{ position: 'absolute', left: 15, top: 12, opacity: 0.4 }}>🔍</span>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', height: '48px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{userName}</div>
                                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{userRole}</div>
                            </div>
                            <img src={`https://ui-avatars.com/api/?name=${userName}&background=2C3E50&color=fff`} alt={userName} style={{ width: 44, height: 44, borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                        </div>
                    </div>
                </header>

                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
