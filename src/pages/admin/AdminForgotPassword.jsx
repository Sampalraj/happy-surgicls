import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/admin-auth.css';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

const AdminForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            // In a real app, this would call an API
            setSubmitted(true);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="admin-auth-container">
            <div className="auth-card">
                <img src="/logo.png" alt="Happy Surgicals" className="auth-logo" />

                <div className="auth-header">
                    <h2 className="auth-title">Reset Password</h2>
                    <p className="auth-subtitle">Enter your registered email address to receive a password reset link.</p>
                </div>

                {!submitted ? (
                    <>
                        {error && (
                            <div className="auth-alert error">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-auth-primary" disabled={loading}>
                                {loading ? 'Sending Link...' : 'Send Reset Link'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="auth-success-state" style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ color: '#0f766e', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <CheckCircle size={48} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>Link Sent!</h3>
                        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '2rem' }}>
                            If an account exists for <strong>{email}</strong>, a password reset link has been sent to your email.
                        </p>
                        <button
                            onClick={() => navigate('/admin/login')}
                            className="btn-auth-primary"
                            style={{ backgroundColor: 'white', color: '#0f766e', border: '1px solid #e2e8f0' }}
                        >
                            Back to Login
                        </button>
                    </div>
                )}

                <div className="auth-divider"></div>

                <div className="auth-footer">
                    <Link to="/admin/login" className="auth-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ArrowLeft size={16} /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminForgotPassword;
