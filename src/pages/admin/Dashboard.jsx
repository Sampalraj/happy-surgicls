import React, { useState, useEffect } from 'react';
import { Package, List, File, Plus, MessageCircle } from 'lucide-react';
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
                    newEnquiries: 0, // Pending implementation of "New" statuses count
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
        <div>
            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <div className="value">{stats.products}</div>
                    <div className="icon"><Package size={24} /></div>
                </div>
                <div className="stat-card">
                    <h3>Active Categories</h3>
                    <div className="value">{stats.categories}</div>
                    <div className="icon"><List size={24} /></div>
                </div>
                <div className="stat-card">
                    <h3>Total Enquiries</h3>
                    <div className="value">{stats.totalEnquiries}</div>
                    <div className="icon"><MessageCircle size={24} /></div>
                </div>
                <div className="stat-card">
                    <h3>New Requests</h3>
                    <div className="value">{stats.newEnquiries}</div>
                    <div style={{ fontSize: '0.875rem', color: '#e53935' }}>Action Required</div>
                </div>
            </div>

            {/* Recent Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--admin-border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem' }}>Recent Activity</h3>
                    </div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                            <div>
                                <div style={{ fontWeight: '500' }}>System Updated</div>
                                <div style={{ fontSize: '0.875rem', color: '#666' }}>Backend integration complete</div>
                            </div>
                            <span style={{ fontSize: '0.875rem', color: '#999' }}>Just now</span>
                        </li>
                    </ul>
                </div>

                {/* Quick Actions */}
                <div className="card" style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--admin-border-color)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button onClick={() => navigate('/admin/products/new')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            <Plus size={18} style={{ marginRight: '8px' }} /> Add New Product
                        </button>
                        <button onClick={() => navigate('/admin/enquiries')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                            View Enquiries
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
