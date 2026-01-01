import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Package, Palette, FileText, Settings, User, LogOut,
    Image, MessageSquare, List, ShieldCheck, ClipboardList
} from 'lucide-react';
import '../../styles/admin.css';
// import { mockBackend } from '../../utils/mockBackend';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const isActive = (path) => location.pathname === path ? 'active' : '';

    useEffect(() => {
        const storedUser = localStorage.getItem('surgical_user');
        if (!storedUser) {
            navigate('/admin/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('surgical_user');
        navigate('/admin/login');
    };

    if (!user) return null;

    const isSuperAdmin = user.role === 'Super Admin';

    return (
        <div className="admin-layout">
            {/* Left Sidebar */}
            <aside className="admin-sidebar" style={{ backgroundColor: 'white' }}>
                <div className="sidebar-header">
                    <img src="/logo.png" alt="Happy Surgicals" style={{ height: 32 }} />
                    <span style={{ color: '#1e293b' }}>Happy Surgicals</span>
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
                                <MessageSquare size={20} /> Orders / Enquiries
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/enquiries" className={isActive('/admin/enquiries')}>
                                <MessageSquare size={20} /> Orders / Enquiries
                            </Link>
                        </li>

                        {isSuperAdmin && (
                            <li>
                                <Link to="/admin/users" className={isActive('/admin/users')}>
                                    <User size={20} /> Users & Roles
                                </Link>
                            </li>
                        )}

                        <li className="nav-header">Content</li>

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
                            <Link to="/admin/certificates" className={location.pathname.startsWith('/admin/certificates') ? 'active' : ''}>
                                <ShieldCheck size={20} /> Certificates
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/audit-reports" className={isActive('/admin/audit-reports')}>
                                <FileText size={20} /> Audit Reports
                            </Link>
                        </li>

                        {/* Only Super Admin sees System Settings */}
                        {isSuperAdmin && (
                            <>
                                <li className="nav-header">System</li>
                                <li>
                                    <Link to="/admin/settings" className={isActive('/admin/settings')}>
                                        <Settings size={20} /> Settings
                                    </Link>
                                </li>
                            </>
                        )}

                        <li>
                            <button onClick={handleLogout} className="btn-logout-sidebar" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: '#ef4444', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'center', cursor: 'pointer', marginTop: '1rem' }}>
                                <LogOut size={20} /> Logout
                            </button>
                        </li>

                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="admin-main">
                {/* Top Bar with Search */}
                <header className="admin-topbar">
                    <h2 className="page-title" style={{ fontSize: '1.5rem' }}>Admin Panel</h2>

                    {/* Global Search */}
                    <div style={{ position: 'relative', width: 300, margin: '0 2rem' }}>
                        <input
                            type="text"
                            placeholder="Search (Products, Pages, Orders)..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                // Stubbed search
                                setSearchResults([]);
                            }}
                            style={{
                                width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem',
                                border: '1px solid #e2e8f0', borderRadius: '8px',
                                background: '#f8fafc', fontSize: '0.9rem'
                            }}
                        />
                        <span style={{ position: 'absolute', left: 10, top: 10, color: '#94a3b8' }}>🔍</span>

                        {/* Search Results Dropdown */}
                        {searchQuery.length > 1 && (
                            <div className="search-dropdown" style={{
                                position: 'absolute', top: '100%', left: 0, width: '100%',
                                background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 50,
                                marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto'
                            }}>
                                {searchResults.length > 0 ? (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {searchResults.map((result, index) => (
                                            <li key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <Link
                                                    to={result.link}
                                                    onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                                                    style={{ display: 'block', padding: '0.75rem 1rem', textDecoration: 'none', color: 'inherit', hover: { background: '#f8fafc' } }}
                                                >
                                                    <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#1e293b' }}>{result.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                                        <span style={{
                                                            display: 'inline-block', padding: '2px 6px', borderRadius: '4px',
                                                            background: result.type === 'Product' ? '#eff6ff' : result.type === 'Page' ? '#f0fdf4' : '#fff7ed',
                                                            color: result.type === 'Product' ? '#1d4ed8' : result.type === 'Page' ? '#15803d' : '#c2410c',
                                                            marginRight: '0.5rem', fontSize: '0.7rem'
                                                        }}>{result.type}</span>
                                                        {result.subtitle}
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div style={{ padding: '1rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                                        No results found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="admin-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button className="btn-icon" style={{ position: 'relative' }}>
                            🔔 <span style={{ position: 'absolute', top: 5, right: 5, width: 8, height: 8, background: 'red', borderRadius: '50%' }}></span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=3b82f6&color=fff`} alt={user.name} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.role}</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content" style={{ background: '#f1f5f9' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
