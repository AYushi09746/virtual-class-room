import React from 'react';
import { FaDownload } from 'react-icons/fa';

const Progress = () => {
    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h1>My Progress</h1>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaDownload /> Download Report
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
                {/* Weekly Activity */}
                <div className="card-panel">
                    <h3 style={{ marginBottom: '1.5rem' }}>Weekly Activity</h3>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 1rem' }}>
                        {[40, 70, 30, 85, 50, 90, 60].map((h, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '30px',
                                    height: `${h}%`,
                                    background: 'var(--primary-color)',
                                    borderRadius: '4px',
                                    marginBottom: '0.5rem',
                                    opacity: 0.8
                                }}></div>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Completion */}
                <div className="card-panel">
                    <h3 style={{ marginBottom: '1.5rem' }}>Course Completion</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { name: 'Web Accessibility 101', val: 75, color: '#2563EB' },
                            { name: 'JavaScript Essentials', val: 40, color: '#16A34A' },
                            { name: 'React for Everyone', val: 10, color: '#EA580C' }
                        ].map((c, i) => (
                            <div key={i}>
                                <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 500 }}>{c.name}</span>
                                    <span>{c.val}%</span>
                                </div>
                                <div style={{ width: '100%', height: '10px', background: '#F1F5F9', borderRadius: '5px' }}>
                                    <div style={{ width: `${c.val}%`, height: '100%', background: c.color, borderRadius: '5px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Overall Stats */}
            <div className="card-panel" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Overall Performance</h3>
                <p>You are in the top <strong>15%</strong> of students this week! Keep it up.</p>
            </div>
        </div>
    );
};

export default Progress;
