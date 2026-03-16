import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '', role: 'student'
    });

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="auth-container">
            {/* Left Side - 60% */}
            <div className="auth-banner">
                <div className="banner-content">
                    <h1 className="banner-title">Join the Future of Learning</h1>
                    <p className="banner-desc">
                        Create an account to access personalized accessible education tools.
                    </p>
                    <div className="illustration-placeholder">
                        <div className="abstract-shape shape-1"></div>
                        <div className="abstract-shape shape-2"></div>
                        <div className="access-icon-large">🎓</div>
                    </div>
                </div>
            </div>

            {/* Right Side - 40% */}
            <div className="auth-form-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Create Account</h2>
                        <p>Start your journey with us today.</p>
                    </div>

                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input className="input-field" placeholder="John Doe" required />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input className="input-field" type="email" placeholder="john@example.com" required />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Password</label>
                                <input className="input-field" type="password" placeholder="••••••••" required />
                            </div>
                            <div className="form-group">
                                <label>Confirm</label>
                                <input className="input-field" type="password" placeholder="••••••••" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Role</label>
                            <select className="input-field">
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="parent">Parent</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-primary w-full">Sign Up</button>
                    </form>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login" className="text-primary">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
