import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logging in with:', email, password);
        navigate('/admin');
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

                    <button type="submit" className="btn-login">
                        Login
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
