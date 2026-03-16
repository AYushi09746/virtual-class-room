import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Login logic here...
        navigate('/dashboard');
    };

    return (
        <div className="auth-container">
            {/* Left Side - 60% */}
            <div className="auth-banner">
                <div className="banner-content">
                    <h1 className="banner-title">Empowering Every Vision</h1>
                    <p className="banner-desc">
                        AI-powered learning and accessibility support for visually impaired users.
                    </p>
                    <div className="illustration-placeholder">
                        {/* Placeholder for "Accessibility Themed Illustration" */}
                        <div className="abstract-shape shape-1"></div>
                        <div className="abstract-shape shape-2"></div>
                        <div className="access-icon-large">♿</div>
                    </div>
                </div>
            </div>

            {/* Right Side - 40% */}
            <div className="auth-form-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">V</div>
                        <h2>Welcome Back</h2>
                        <p>Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <a href="#" className="forgot-link">Forgot Password?</a>
                        </div>

                        <button type="submit" className="btn-primary w-full">Sign In</button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button className="btn-google w-full">
                        <FaGoogle style={{ marginRight: '8px' }} /> Continue with Google
                    </button>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
