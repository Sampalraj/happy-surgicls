import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import '../../styles/admin-auth.css';

const AdminRegister = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'Viewer', // Default safe role
        message: ''
    });

    const roles = [
        { id: 'Product Manager', name: 'Product Manager' },
        { id: 'Viewer', name: 'Viewer (Read Only)' },
        { id: 'Editor', name: 'Content Editor' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        // mockBackend.saveAccessRequest(formData);
        console.log("Access Request", formData);

        // Show success state
        setTimeout(() => {
            setSubmitted(true);
        }, 600);
    };

    if (submitted) {
        return (
            <div className="admin-auth-container">
                <div className="auth-card">
                    <div className="success-icon">
                        <Check size={28} strokeWidth={3} />
                    </div>
                    <div className="auth-header">
                        <h2 className="auth-title">Request Submitted</h2>
                        <p className="auth-subtitle">
                            Your request for admin access has been sent to the Super Administrator.
                        </p>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: '#475569' }}>
                        You will receive an email verification at <strong>{formData.email}</strong> once your account is approved.
                    </div>

                    <Link to="/admin/login" className="btn-auth-primary" style={{ textDecoration: 'none' }}>
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-auth-container">
            <div className="auth-card" style={{ maxWidth: '500px' }}>
                <img src="/logo.png" alt="Happy Surgicals" className="auth-logo" />

                <div className="auth-header">
                    <h2 className="auth-title">Request Admin Access</h2>
                    <p className="auth-subtitle">Submit your details for administrator approval.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            required
                            placeholder="e.g. Sarah Smith"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Official Email</label>
                            <input
                                type="email"
                                className="form-input"
                                required
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone (Optional)</label>
                            <input
                                type="tel"
                                className="form-input"
                                placeholder="+91 98765..."
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Requested Role</label>
                        <select
                            className="form-select"
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                        >
                            {roles.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Reason for Access</label>
                        <textarea
                            className="form-textarea"
                            required
                            placeholder="Briefly explain why you need admin access..."
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn-auth-primary">
                        Submit Request
                    </button>

                    <div style={{ textAlign: 'center' }}>
                        <Link to="/admin/login" className="auth-link" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowLeft size={16} /> Back to Login
                        </Link>
                    </div>
                </form>

                <div className="auth-divider"></div>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Account activation is subject to admin approval.
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
