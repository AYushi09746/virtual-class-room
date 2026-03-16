import React, { useState } from 'react';
import { FaBook, FaRobot, FaCheckCircle, FaUniversalAccess, FaMicrophone } from 'react-icons/fa';
import TeacherDashboard from '../components/TeacherDashboard';

const Dashboard = () => {
    // Mock User Role - In real app, get this from Context/Auth
    const [userRole, setUserRole] = useState('student'); // Toggle to 'teacher' to test

    if (userRole === 'teacher') {
        return <TeacherDashboard />;
    }

    const stats = [
        { title: 'Courses Enrolled', value: '4', icon: <FaBook />, color: 'blue' },
        { title: 'Completed Lessons', value: '12', icon: <FaCheckCircle />, color: 'green' },
        { title: 'AI Queries', value: '86', icon: <FaRobot />, color: 'purple' },
        { title: 'Accessibility Mode', value: 'On', icon: <FaUniversalAccess />, color: 'orange' },
    ];

    return (
        <div className="dashboard-page">
            <div className="page-header flex-between">
                <div>
                    <h1>Good Morning, Piyush 👋</h1>
                    <p>Ready to continue your learning journey?</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setUserRole(prev => prev === 'student' ? 'teacher' : 'student')} className="btn-primary" style={{ background: '#333' }}>
                        Switch to {userRole === 'student' ? 'Teacher' : 'Student'} View
                    </button>
                    <div
                        className="mic-icon-btn"
                        onClick={() => {
                            alert("Voice Command: 'Open Notes' recognized!");
                            window.location.href = '/notes';
                        }}
                        style={{
                            width: '40px', height: '40px', borderRadius: '50%', background: 'var(--danger)', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(239, 68, 68, 0.4)'
                        }}
                        title="Voice Command"
                    >
                        <FaMicrophone />
                    </div>
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

            <div className="recent-activity-section" style={{ marginTop: '2rem' }}>
                <h2>Continue Learning</h2>
                <div className="card-panel course-preview" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ width: '200px', height: '120px', background: '#ddd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Thumbnail
                    </div>
                    <div>
                        <h3>Advanced React Accessibility</h3>
                        <p>Module 3: ARIA Labels and Roles</p>
                        <button className="btn-primary" style={{ marginTop: '1rem' }}>Resume</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
