import React from 'react';

const MyCourses = () => {
    const courses = [
        { id: 1, title: 'Web Accessibility 101', progress: 75, image: '🌐' },
        { id: 2, title: 'JavaScript Essentials', progress: 40, image: '📜' },
        { id: 3, title: 'React for Everyone', progress: 10, image: '⚛️' },
        { id: 4, title: 'UI Design Principles', progress: 0, image: '🎨' },
    ];

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>My Courses</h1>
            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {courses.map(course => (
                    <div key={course.id} className="card-panel course-card">
                        <div style={{ height: '160px', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                            {course.image}
                        </div>
                        <h3>{course.title}</h3>
                        <div className="progress-bar-container" style={{ margin: '1rem 0', height: '8px', background: '#efefef', borderRadius: '4px' }}>
                            <div style={{ width: `${course.progress}%`, background: 'var(--primary-color)', height: '100%', borderRadius: '4px' }}></div>
                        </div>
                        <div className="flex-between">
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{course.progress}% Complete</span>
                            <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Continue</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCourses;
