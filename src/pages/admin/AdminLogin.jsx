import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockBackend } from '../../utils/mockBackend';
import '../../styles/admin-auth.css';
import { AlertCircle } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Simulate network delay
        setTimeout(() => {
            const user = mockBackend.validateUser(email, password);
            if (user) {
                localStorage.setItem('surgical_user', JSON.stringify(user));
                navigate('/admin');
            } else {
                setError('Invalid email or password provided.');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="admin-auth-container">
            <div className="auth-card">
                <img src="/logo.png" alt="Happy Surgicals" className="auth-logo" />

                <div className="auth-header">
                    <h2 className="auth-title">Admin Login</h2>
                    <p className="auth-subtitle">Sign in to access the admin panel.</p>
                </div>

                {error && (
                    <div className="auth-alert error">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form className="auth-form" onSubmit={handleLogin}>
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

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="auth-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link to="/admin/forgot-password" className="auth-link">Forgot password?</Link>
                    </div>

                    <button type="submit" className="btn-auth-primary" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-divider"></div>

                <div className="auth-footer">
                    <span>Don’t have access?</span>
                    <Link to="/admin/request-access" className="auth-link">Request admin account</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
