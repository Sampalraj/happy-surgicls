import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.css';
import { mockBackend } from '../../utils/mockBackend';

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
            const user = mockBackend.login(email, password);
            if (user) {
                localStorage.setItem('surgical_user', JSON.stringify(user));
                navigate('/admin');
            } else {
                setError('Invalid email or password');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="admin-login-page">
            {/* Left Side - Illustration */}
            <div className="login-left">
                {/* Using the new Happy Surgicals logo */}
                <img src="/logo.png" alt="Happy Surgicals Logo" style={{ maxWidth: '60%', maxHeight: '50vh' }} />
            </div>

            {/* Right Side - Form */}
            <div className="login-right">
                <div className="login-header-right">
                    <h2>Login</h2>
                    <p>Welcome back! Please enter your details.</p>
                </div>

                {error && (
                    <div className="alert alert-error" style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="mail@website.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 characters"
                            required
                        />
                    </div>

                    <div className="login-options">
                        <label>
                            <input type="checkbox" style={{ width: 'auto', marginRight: '0.5rem' }} /> Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                </form>

                <div className="login-footer-right">
                    Not yet registered? <a href="#">Create Account</a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
