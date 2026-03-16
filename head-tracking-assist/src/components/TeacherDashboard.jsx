import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardCheck, FaPlus, FaChartBar, FaCalendarAlt, FaBullhorn } from 'react-icons/fa';

const TeacherDashboard = () => {
    const stats = [
        { title: 'Total Students', value: '1,240', icon: <FaUserGraduate />, color: 'blue' },
        { title: 'Course Activity', value: '94%', icon: <FaChalkboardTeacher />, color: 'green' },
        { title: 'Pending Grades', value: '14', icon: <FaClipboardCheck />, color: 'purple' },
    ];

    return (
        <div className="page-container animate-enter">
            {/* Header Section */}
            <div className="flex-between" style={{ marginBottom: '3rem', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--brand-secondary)' }}>
                        Faculty Portal
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Welcome back, Professor. Here's what's happening in your classes today.
                    </p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '1rem 1.5rem' }}>
                    <FaPlus /> Create New Course
                </button>
            </div>

            {/* Premium Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={stat.title} className="card-panel stat-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className={`stat-icon icon-${stat.color}`} style={{ 
                            background: idx === 0 ? '#eff6ff' : idx === 1 ? '#ecfdf5' : '#faf5ff',
                            color: idx === 0 ? '#3b82f6' : idx === 1 ? '#10b981' : '#a855f7'
                        }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <p>{stat.title}</p>
                            <h3>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)', gap: '2.5rem', marginTop: '3rem' }}>
                
                {/* Grading Queue */}
                <div className="card-panel">
                    <div className="flex-between" style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Grading Queue</h2>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-primary)', background: 'var(--brand-primary-soft)', padding: '4px 12px', borderRadius: '100px' }}>
                            14 NEW SUBMISSIONS
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { id: 1, student: 'Aarav Sharma', assignment: 'Accessibility Audit', time: '12m ago' },
                            { id: 2, student: 'Isha Gupta', assignment: 'UI System Research', time: '1h ago' },
                            { id: 3, student: 'Rohan Mehra', assignment: 'Eye-Tracking Analysis', time: '3h ago' }
                        ].map(item => (
                            <div key={item.id} className="flex-between" style={{ 
                                padding: '1.2rem', background: 'var(--bg-main)', borderRadius: '16px',
                                border: '1px solid var(--border-subtle)', transition: 'var(--transition-smooth)'
                            }}>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.assignment}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.student} • <span style={{ color: 'var(--text-muted)' }}>{item.time}</span></p>
                                </div>
                                <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', background: 'var(--brand-secondary)' }}>Review</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Management Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card-panel" style={{ background: 'var(--brand-secondary)', color: 'white' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>Quick Management</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {[
                                { label: 'Post Announcement', icon: <FaBullhorn /> },
                                { label: 'Schedule Live Session', icon: <FaCalendarAlt /> },
                                { label: 'Class Analytics', icon: <FaChartBar /> }
                            ].map(btn => (
                                <button key={btn.label} style={{
                                    width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', gap: '12px',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px', color: 'white', fontWeight: 700, cursor: 'pointer',
                                    textAlign: 'left', transition: 'var(--transition-smooth)'
                                }}>
                                    <span style={{ color: 'var(--brand-primary)' }}>{btn.icon}</span>
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card-panel" style={{ border: '2px dashed var(--border-medium)', background: 'transparent' }}>
                        <div style={{ textAlign: 'center', padding: '1rem' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                            <h4 style={{ fontWeight: 800 }}>Faculty Insights</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                Students' average attention score increased by 12% this week.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeacherDashboard;
