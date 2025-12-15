import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Palette, FileText, Settings, User, LogOut, Image, MessageSquare, List } from 'lucide-react';
import '../../styles/admin.css';

const AdminLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="admin-layout">
            {/* Left Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <img src="/logo.png" alt="Logo" style={{ height: 32, objectFit: 'contain', background: 'white', borderRadius: 4, padding: 2 }} />
                    Happy Surgicals
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link to="/admin" className={isActive('/admin')}>
                                <LayoutDashboard size={20} /> Dashboard
                            </Link>
                        </li>
                        <li className="nav-header" style={{ margin: '1rem 0 0.5rem 1rem', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.5 }}>Content</li>
                        <li>
                            <Link to="/admin/products" className={isActive('/admin/products')}>
                                <Package size={20} /> Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/categories" className={isActive('/admin/categories')}>
                                <List size={20} /> Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/pages" className={isActive('/admin/pages')}>
                                <FileText size={20} /> Pages
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/media" className={isActive('/admin/media')}>
                                <Image size={20} /> Media Library
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/enquiries" className={isActive('/admin/enquiries')}>
                                <MessageSquare size={20} /> Enquiries
                            </Link>
                        </li>
                        <li className="nav-header" style={{ margin: '1rem 0 0.5rem 1rem', fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.5 }}>System</li>
                        <li>
                            <Link to="/admin/branding" className={isActive('/admin/branding')}>
                                <Palette size={20} /> Branding
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/settings" className={isActive('/admin/settings')}>
                                <Settings size={20} /> Settings
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#a0aec0', fontSize: '0.9rem' }}>
                        <User size={16} /> Admin User
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="admin-main">
                {/* Top Bar */}
                <header className="admin-topbar">
                    <h2 className="page-title">Dashboard</h2>
                    <div className="admin-actions">
                        <button className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem' }}>
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
