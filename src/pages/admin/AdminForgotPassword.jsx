import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Mail, AlertCircle, CheckCircle, HeartPulse, Plus, Activity } from 'lucide-react';
import { supabaseService } from '../../utils/supabaseService'; // Use service if available or direct supabase
import { supabase } from '../../lib/supabase'; // Assuming direct auth call
import '../../styles/admin-auth.css';

const AdminForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/reset-password`,
            });

            if (error) throw error;

            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Vector Animation Variants (Reused)
    const floatingVariant = {
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
    };

    return (
        <div className="login-page-container">
            {/* LEFT SIDE: Hero & Vectors */}
            <div className="login-hero-section">
                <div className="ekg-line"></div>
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
                </div>

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div className="hero-logo" whileHover={{ scale: 1.1, rotate: 10 }}>
                        <Shield size={64} color="white" strokeWidth={1.5} />
                    </motion.div>
                    <h1 className="hero-title">Account Recovery</h1>
                    <p className="hero-subtitle">Secure Identification Protocol</p>
                </motion.div>
            </div>

            {/* RIGHT SIDE: Form */}
            <div className="login-form-section">
                <motion.div
                    className="auth-card-modern"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="form-header">
                        <Link to="/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            <ArrowLeft size={16} /> Back to Login
                        </Link>
                        <h2 className="form-title">Reset Password</h2>
                        <p className="form-subtitle">Enter your email to receive recovery instructions.</p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <motion.div className="auth-alert error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <AlertCircle size={18} />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            <div className="input-group-modern">
                                <input
                                    type="email"
                                    className="input-modern"
                                    placeholder="Registered Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Mail className="input-icon-modern" size={20} />
                            </div>

                            <motion.button
                                type="submit"
                                className="btn-modern"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? 'Sending Link...' : 'Send Reset Link'}
                            </motion.button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ width: 80, height: 80, background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#059669' }}>
                                <CheckCircle size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Check your email</h3>
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                                We've sent a password reset link to <strong>{email}</strong>.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                style={{ background: 'none', border: 'none', color: '#0f766e', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}
                            >
                                Try another email
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminForgotPassword;
