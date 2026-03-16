import React, { useState } from 'react';
import { FaBook, FaRobot, FaCheckCircle, FaUniversalAccess, FaMicrophone, FaBrain, FaEye } from 'react-icons/fa';
import { useHeadTrackingContext } from '../context/HeadTrackingContext';
import TeacherDashboard from '../components/TeacherDashboard';

const Dashboard = () => {
    const [userRole, setUserRole] = useState('student');
    const { trackingData } = useHeadTrackingContext();

    if (userRole === 'teacher') {
        return <TeacherDashboard />;
    }

    const stats = [
        { title: 'Courses Enrolled', value: '4', icon: <FaBook />, color: 'blue' },
        { title: 'Completed Lessons', value: '12', icon: <FaCheckCircle />, color: 'green' },
        { title: 'AI Queries', value: '86', icon: <FaRobot />, color: 'purple' },
        { title: 'Attention Score', value: `${trackingData?.attentionScore || 0}%`, icon: <FaBrain />, color: 'orange' },
    ];

    return (
        <div className="dashboard-page animate-enter">
            <div className="page-header flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Welcome, Piyush 👋</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>
                        Focus Level: <span style={{ color: trackingData?.attentionScore > 70 ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold' }}>
                            {trackingData?.headStatus || "Initializing..."}
                        </span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                     <div className="tracking-badge" style={{ 
                        padding: '0.5rem 1rem', background: '#e0f2fe', borderRadius: '20px', 
                        display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0369a1', fontWeight: 'bold' 
                     }}>
                        <FaEye /> {trackingData?.isTracking ? "AI Tracking Active" : "Tracking Disabled"}
                    </div>
                    <button onClick={() => setUserRole('teacher')} className="btn-primary" style={{ background: '#333' }}>
                        Teacher Portal
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                {stats.map((stat) => (
                    <div key={stat.title} className="card-panel stat-card">
                        <div className={`stat-icon icon-${stat.color}`}>{stat.icon}</div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2.5rem' }}>
                <div className="recent-activity-section">
                    <h2 style={{ marginBottom: '1.5rem' }}>Continue Learning</h2>
                    <div className="card-panel course-preview" style={{ display: 'flex', alignItems: 'center', gap: '2rem', borderLeft: '6px solid var(--primary-color)' }}>
                        <div style={{ 
                            width: '240px', height: '140px', 
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
                            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontSize: '3rem'
                        }}>
                            <FaBook />
                        </div>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase' }}>Current Module</span>
                            <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Advanced React & Accessibility</h3>
                            <p>3.2: Implementing Accessible Video Players</p>
                            <div className="progress-bar" style={{ height: '8px', background: '#eee', borderRadius: '4px', margin: '1rem 0', width: '80%' }}>
                                <div style={{ height: '100%', width: '65%', background: 'var(--primary-color)', borderRadius: '4px' }}></div>
                            </div>
                            <button className="btn-primary">Resume Session</button>
                        </div>
                    </div>
                </div>

                <div className="proctor-status-card card-panel" style={{ height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaUniversalAccess /> Accessibility AI
                    </h3>
                    <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', marginBottom: '1rem' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Last Gesture Detected:</p>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-dark)' }}>{trackingData?.gesture || "None"}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                         <div className="flex-between" style={{ fontSize: '0.9rem' }}>
                            <span>Voice Commands</span>
                            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Ready</span>
                        </div>
                        <div className="flex-between" style={{ fontSize: '0.9rem' }}>
                            <span>Eye Tracking</span>
                            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Active</span>
                        </div>
                        <div className="flex-between" style={{ fontSize: '0.9rem' }}>
                            <span>Distraction Alert</span>
                            <span style={{ color: 'var(--text-light)' }}>Off</span>
                        </div>
                    </div>
                    <button className="btn-primary w-full" style={{ marginTop: '1.5rem', background: 'var(--secondary-bg)', color: 'var(--text-dark)', border: '1px solid #ddd' }}>
                        View AI Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
