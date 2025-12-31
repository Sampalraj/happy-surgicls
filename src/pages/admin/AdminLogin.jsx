import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/admin-auth.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, user } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            const from = location.state?.from?.pathname || '/admin';
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(email, password);
            // Navigation will happen via useEffect above
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Header Section */}
                <div className="auth-header">
                    <div className="auth-logo-wrapper">
                        <div className="auth-logo-icon">
                            <Shield size={32} color="white" strokeWidth={2} />
                        </div>
                    </div>
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Secure Access for Happy Surgicals Admin</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleLogin} className="auth-form">

                    {error && (
                        <div className="auth-alert error">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="input-label">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label className="input-label" style={{ marginBottom: 0 }}>Password</label>
                            <a href="/admin/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                                Forgot Password?
                            </a>
                        </div>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                        {!loading && <ArrowRight size={20} />}
                    </button>

                    <div className="auth-footer">
                        <p>Need access? <a href="/admin/request-access">Request Administrator Account</a></p>
                    </div>

                </form>
            </div>

            <div className="auth-background-pattern"></div>
        </div>
    );
};

export default AdminLogin;
