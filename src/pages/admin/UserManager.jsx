import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, X, User as UserIcon, Shield, Check, Mail } from 'lucide-react';
import { mockBackend } from '../../utils/mockBackend';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', email: '', role_id: '', password: '', status: 'Active' });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setUsers(mockBackend.getUsers());
        setRoles(mockBackend.getRoles());
    };

    const handleEdit = (user) => {
        setFormData(user);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        // Prevent deleting the main admin for safety in this demo
        const user = users.find(u => u.id === id);
        if (user && user.email === 'admin@happysurgicals.com') {
            alert("Cannot delete the Super Admin.");
            return;
        }

        if (confirm('Delete this user?')) {
            mockBackend.deleteUser(id);
            loadData();
        }
    };

    const handleSave = () => {
        if (!formData.name || !formData.email || !formData.role_id || !formData.password) {
            alert('All fields including Password are required.');
            return;
        }

        mockBackend.saveUser(formData);
        loadData();
        setShowModal(false);
        setFormData({ id: null, name: '', email: '', role_id: '', password: '', status: 'Active' });
    };

    const getRoleName = (roleId) => {
        const r = roles.find(rl => rl.id === roleId);
        return r ? r.name : 'Unknown';
    };

    return (
        <div className="user-manager">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Users & Roles</h2>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Manage admin access and permissions</p>
                </div>
                <button
                    onClick={() => { setFormData({ id: null, name: '', email: '', role_id: roles[0]?.id || '', password: '', status: 'Active' }); setShowModal(true); }}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={18} /> Add User
                </button>
            </div>

            <div className="card" style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Last Login</th>
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
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                        }}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '500' }}>{user.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                                        padding: '4px 8px', borderRadius: '4px', background: '#f8fafc',
                                        border: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.85rem'
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
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{ color: '#666', fontSize: '0.9rem' }}>
                                    {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button onClick={() => handleEdit(user)} className="btn-icon"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(user.id)} className="btn-icon" style={{ color: '#c53030' }}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formData.id ? 'Edit User' : 'New User'}</h3>
                            <button onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                            <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                            <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
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

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                            <input type="password" className="form-control" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="*******" />
                            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>Simple text for demo purposes.</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                            <button onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={handleSave} className="btn btn-primary">Save User</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManager;
