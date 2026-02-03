import React, { useState, useEffect } from 'react';
import { Package, List, File, Plus, MessageCircle, TrendingUp, Clock, AlertCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabaseService } from '../../utils/supabaseService';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalEnquiries: 0,
        newEnquiries: 0,
        products: 0,
        categories: 0
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await supabaseService.getStats();
                setStats({
                    totalEnquiries: data.enquiries || 0,
                    newEnquiries: 0, // Pending implementation
                    products: data.products || 0,
                    categories: data.categories || 0
                });
            } catch (error) {
                console.error("Failed to load stats", error);
            }
        };
        loadStats();
    }, []);

    return (
        <div className="dashboard-container">
            {/* STATS WIDGETS */}
            <div className="stats-grid">
                <div className="stat-card stat-blue">
                    <h3>Total Products</h3>
                    <div className="icon-bubble"><Package size={20} /></div>
                    <div className="value">{stats.products}</div>
                </div>

                <div className="stat-card stat-orange">
                    <h3>Active Categories</h3>
                    <div className="icon-bubble"><List size={20} /></div>
                    <div className="value">{stats.categories}</div>
                </div>

                <div className="stat-card stat-pink">
                    <h3>Total Enquiries</h3>
                    <div className="icon-bubble"><MessageCircle size={20} /></div>
                    <div className="value">{stats.totalEnquiries}</div>
                </div>

                <div className="stat-card stat-green">
                    <h3>New Requests</h3>
                    <div className="icon-bubble"><AlertCircle size={20} /></div>
                    <div className="value">{stats.newEnquiries}</div>
                    <div style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                        <TrendingUp size={14} /> +12% this week
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* RECENT ACTIVITY (Timeline) */}
                <div className="section-card">
                    <h3 className="section-title">Recent Activity</h3>
                    <div className="timeline-list">
                        <div className="timeline-item">
                            <div className="timeline-dot blue"></div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ background: '#E0F2FE', padding: '0.5rem', borderRadius: '50%', color: '#0284C7' }}>
                                    <Settings size={20} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#1F2937' }}>System Updated</div>
                                    <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Backend integration complete</div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                                <Clock size={12} /> Just now
                            </div>
                        </div>

                        {/* Placeholder Items */}
                        <div className="timeline-item">
                            <div className="timeline-dot green"></div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ background: '#DCFCE7', padding: '0.5rem', borderRadius: '50%', color: '#16A34A' }}>
                                    <Package size={20} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#1F2937' }}>New Product Added</div>
                                    <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Surgical Forceps Pro</div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.5rem' }}>2h ago</div>
                        </div>
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="section-card">
                    <h3 className="section-title">Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button onClick={() => navigate('/admin/products')} className="btn btn-primary">
                            <Plus size={18} style={{ marginRight: '8px' }} /> Add New Product
                        </button>
                        <button onClick={() => navigate('/admin/enquiries')} className="btn btn-secondary">
                            <Eye size={18} style={{ marginRight: '8px' }} /> View Enquiries
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper for icon since Settings wasn't imported
const Settings = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default Dashboard;
