import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardCheck, FaPlus } from 'react-icons/fa';

const TeacherDashboard = () => {
    const stats = [
        { title: 'Total Students', value: '120', icon: <FaUserGraduate />, color: 'blue' },
        { title: 'Active Courses', value: '3', icon: <FaChalkboardTeacher />, color: 'green' },
        { title: 'Assignments', value: '25', icon: <FaClipboardCheck />, color: 'purple' },
    ];

    return (
        <div className="dashboard-page">
            <div className="page-header flex-between">
                <div>
                    <h1>Teacher Portal 👨‍🏫</h1>
                    <p>Manage your classes and students efficiently.</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaPlus /> Create New Course
                </button>
            </div>

            {/* Stats */}
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

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                {/* Recent Submissions */}
                <div className="card-panel">
                    <h3 style={{ marginBottom: '1.5rem' }}>Recent Submissions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                <div>
                                    <p style={{ fontWeight: '500', color: 'var(--text-dark)' }}>Assignment {i}: Accessibility Audit</p>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Submitted by Student {i} • 2 mins ago</span>
                                </div>
                                <button style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer' }}>Grade</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card-panel">
                    <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button className="w-full" style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
                            📢 Post Announcement
                        </button>
                        <button className="w-full" style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
                            📅 Schedule Live Class
                        </button>
                        <button className="w-full" style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
                            📊 View Analytics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
