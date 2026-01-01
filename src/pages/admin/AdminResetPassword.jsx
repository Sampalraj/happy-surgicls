import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, CheckCircle, AlertCircle, HeartPulse, Plus, Activity, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import '../../styles/admin-auth.css';

const AdminResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Check session presence
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                // If accessed directly without session (link param handling happens auto), redirect
                navigate('/admin/login');
            }
        };
        checkSession();
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
                navigate('/admin/login');
            }, 3000);
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
                        <Activity size={120} color="white" strokeWidth={2} />
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
                    <h1 className="hero-title">Reset & Secure</h1>
                    <p className="hero-subtitle">Update your credentials to regain dashboard access.</p>
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
                    {!success ? (
                        <>
                            <div className="form-header">
                                <h2 className="form-title">Set New Password</h2>
                                <p className="form-subtitle">Make sure it's strong and secure.</p>
                            </div>

                            <form onSubmit={handleUpdate}>
                                {error && (
                                    <motion.div className="auth-alert error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <AlertCircle size={18} />
                                        <span>{error}</span>
                                    </motion.div>
                                )}

                                <div className="input-group-modern">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input-modern"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Lock className="input-icon-modern" size={20} />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                <div className="input-group-modern">
                                    <input
                                        type="password"
                                        className="input-modern"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <Lock className="input-icon-modern" size={20} />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="btn-modern"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {loading ? 'Updating...' : 'Update Password'}
                                </motion.button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ width: 80, height: 80, background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#059669' }}>
                                <CheckCircle size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Success!</h3>
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                                Your password has been updated. Redirecting to login...
                            </p>
                            <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#0f766e', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }}></div>
                            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminResetPassword;
