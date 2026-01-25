import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, User as UserIcon, Shield, Check, Mail, AlertTriangle } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // Removed password from formData
    const [formData, setFormData] = useState({ id: null, name: '', email: '', role_id: '', status: 'Active' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [fetchedUsers, fetchedRoles] = await Promise.all([
                supabaseService.getUsers(),
                supabaseService.getRoles()
            ]);
            setUsers(fetchedUsers);
            setRoles(fetchedRoles);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setFormData({
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            status: user.status
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const user = users.find(u => u.id === id);
        // Basic check, though backend RLS is safest
        if (user && user.email === 'admin@happysurgicals.com') { // Hardcoded safety
            alert("Cannot delete the Super Admin.");
            return;
        }

        if (confirm('Are you sure you want to deactivate this user?')) {
            try {
                await supabaseService.deleteUser(id);
                loadData();
            } catch (error) {
                alert("Failed to deactivate user: " + error.message);
            }
        }
    };

    const handleSave = async () => {
        // If it's a new user (no ID), we can't really "create" key, 
        // we can only pre-approve or just fail. 
        // For this impl, "Add User" is "Edit Role".
        // But if we want to support "Pre-Approve":
        // We would need to insert into profiles. ID is missing though.
        // So effectively, we only support EDITING existing profiles here.

        if (!formData.id) {
            alert("To add a new user, ask them to Sign Up on the login page first. Then you can assign their role here.");
            return;
        }

        try {
            await supabaseService.updateUser(formData.id, formData);
            loadData();
            setShowModal(false);
        } catch (error) {
            alert("Error saving user: " + error.message);
        }
    };

    const getRoleName = (roleId) => {
        const r = roles.find(rl => rl.id === roleId);
        return r ? r.name : roleId || 'Unknown';
    };

    // Helper for badge color
    const getRoleColor = (roleId) => {
        if (roleId === 'admin') return '#4f46e5'; // Indigo
        if (roleId === 'editor') return '#004daa'; // Blue
        return '#64748b'; // Gray
    };

    return (
        <div className="user-manager">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Users & Roles</h2>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Manage admin access and permissions</p>
                </div>
                {/* 
                   "Add User" is tricky without Admin API. 
                   We will rename it to "Invite info" or just show a tip.
                */}
                <div style={{ fontSize: '0.85rem', color: '#666', background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontWeight: 'bold' }}>Tip:</span> Users must sign up to appear here.
                </div>
            </div>

            <div className="card" style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Last Active</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', textTransform: 'uppercase'
                                        }}>
                                            {user.name ? user.name.charAt(0) : '?'}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '500' }}>{user.name || 'Unnamed'}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                                        padding: '4px 8px', borderRadius: '4px', background: `${getRoleColor(user.role_id)}15`,
                                        border: `1px solid ${getRoleColor(user.role_id)}30`, color: getRoleColor(user.role_id), fontSize: '0.85rem', fontWeight: '500'
                                    }}>
                                        <Shield size={12} /> {getRoleName(user.role_id)}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-gray'}`}
                                        style={{
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '12px',
                                            background: user.status === 'Active' ? '#f0fdf4' : '#f1f5f9',
                                            color: user.status === 'Active' ? '#15803d' : '#64748b'
                                        }}
                                    >
                                        {user.status || 'Active'}
                                    </span>
                                </td>
                                <td style={{ color: '#666', fontSize: '0.9rem' }}>
                                    {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button onClick={() => handleEdit(user)} className="btn-icon" title="Edit Role"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(user.id)} className="btn-icon" style={{ color: '#c53030' }} title="Deactivate"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && !loading && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                                    No users found. (Are you running against live Supabase?)
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Edit User Role</h3>
                            <button onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                            <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                            <input type="email" className="form-control" value={formData.email} disabled style={{ background: '#f1f5f9', cursor: 'not-allowed' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Role</label>
                                <select className="form-control" value={formData.role_id} onChange={e => setFormData({ ...formData, role_id: e.target.value })}>
                                    <option value="">Select Role...</option>
                                    {roles.map(r => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Status</label>
                                <select className="form-control" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                            <button onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={handleSave} className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManager;
