import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaUserGraduate, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email }, role);
        navigate(role === 'teacher' ? '/teacher' : '/dashboard');
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

                    <div className="role-selector" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <button 
                            type="button" 
                            className={`role-btn ${role === 'student' ? 'active' : ''}`}
                            onClick={() => setRole('student')}
                            style={{
                                flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                background: role === 'student' ? 'var(--primary-color)' : 'white',
                                color: role === 'student' ? 'white' : 'var(--text-dark)',
                                fontWeight: '600', cursor: 'pointer', transition: '0.3s'
                            }}
                        >
                            <FaUser /> Student
                        </button>
                        <button 
                            type="button" 
                            className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
                            onClick={() => setRole('teacher')}
                            style={{
                                flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                background: role === 'teacher' ? 'var(--primary-color)' : 'white',
                                color: role === 'teacher' ? 'white' : 'var(--text-dark)',
                                fontWeight: '600', cursor: 'pointer', transition: '0.3s'
                            }}
                        >
                            <FaUserGraduate /> Teacher
                        </button>
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
