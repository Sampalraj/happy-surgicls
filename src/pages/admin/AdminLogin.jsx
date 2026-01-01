import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Activity, Plus, HeartPulse, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
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
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    // Vector Animation Variants
    const floatingVariant = {
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="login-page-container">
            {/* LEFT SIDE: Hero & Vectors */}
            <div className="login-hero-section">
                {/* Background Animation (EKG) defined in CSS */}
                <div className="ekg-line"></div>

                {/* Floating Vectors */}
                <div className="hero-vectors-container">
                    <motion.div
                        style={{ position: 'absolute', top: '15%', left: '15%', opacity: 0.2 }}
                        variants={floatingVariant}
                        animate="animate"
                    >
                        <HeartPulse size={64} color="white" />
                    </motion.div>

                    <motion.div
                        style={{ position: 'absolute', bottom: '20%', right: '15%', opacity: 0.15 }}
                        animate={{ y: [0, 30, 0], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    >
                        <Plus size={120} color="white" strokeWidth={4} />
                    </motion.div>

                    <motion.div
                        style={{ position: 'absolute', top: '40%', right: '10%', opacity: 0.1 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                        <Activity size={180} color="white" />
                    </motion.div>
                </div>

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="hero-logo"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                        <Shield size={64} color="white" strokeWidth={1.5} />
                    </motion.div>
                    <h1 className="hero-title">Happy Surgicals</h1>
                    <p className="hero-subtitle">Secure Admin Portal • Inventory Control • Compliance Management</p>
                </motion.div>
            </div>

            {/* RIGHT SIDE: Form */}
            <div className="login-form-section">
                <motion.div
                    className="auth-card-modern"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="form-header">
                        <motion.h2
                            className="form-title"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Welcome Back
                        </motion.h2>
                        <p className="form-subtitle">Please sign in to access your dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        {error && (
                            <motion.div
                                className="auth-alert error"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <div className="input-group-modern">
                            <input
                                type="email"
                                className="input-modern"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Mail className="input-icon-modern" size={20} />
                        </div>

                        <div className="input-group-modern">
                            <input
                                type="password"
                                className="input-modern"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Lock className="input-icon-modern" size={20} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                            <Link to="/admin/forgot-password" style={{ color: '#0f766e', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                                Forgot Password?
                            </Link>
                        </div>

                        <motion.button
                            type="submit"
                            className="btn-modern"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? (
                                <>
                                    <span style={{ width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Sign In <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>

                        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                            Restricted Area. Authorized Personnel Only.
                        </div>
                    </form>
                </motion.div>
            </div>

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AdminLogin;
