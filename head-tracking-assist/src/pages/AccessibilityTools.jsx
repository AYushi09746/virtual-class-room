import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import HeadTrackingController from '../components/HeadTrackingController';

const AccessibilityTools = () => {
    const { settings, toggleSetting } = useAccessibility();

    const tools = [
        { id: 'voiceControl', label: 'Voice Navigation', desc: 'Control the system using voice commands like "Open Notes".' },
        { id: 'screenReader', label: 'Screen Reader Mode', desc: 'Optimized layout for screen readers with ARIA support.' },
        { id: 'highContrast', label: 'High Contrast Mode', desc: 'Increases contrast for better visibility.' },
        { id: 'headTracking', label: 'Head Movement Navigation', desc: 'Use your head movements to control the cursor.' },
    ];

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Accessibility Tools</h1>

            {/* Active Tools Feedback */}
            {settings.headTracking && (
                <div className="card-panel" style={{ marginBottom: '2rem', border: '2px solid var(--primary-color)' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Head Navigation Active</h3>
                    <HeadTrackingController />
                </div>
            )}

            <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {tools.map(tool => (
                    <div key={tool.id} className="card-panel flex-between">
                        <div>
                            <h3>{tool.label}</h3>
                            <p style={{ fontSize: '0.9rem', maxWidth: '300px' }}>{tool.desc}</p>
                        </div>
                        <div
                            onClick={() => toggleSetting(tool.id)}
                            style={{
                                width: '50px',
                                height: '28px',
                                background: settings[tool.id] ? 'var(--success)' : '#cbd5e1',
                                borderRadius: '14px',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: '0.3s'
                            }}
                        >
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: settings[tool.id] ? '24px' : '2px',
                                transition: '0.3s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Font Size Control Extra */}
            <div className="card-panel" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Font Size Control</h3>
                <input type="range" min="12" max="24" className="w-full" style={{ width: '100%' }} />
                <div className="flex-between" style={{ marginTop: '0.5rem' }}>
                    <span>Small</span>
                    <span>Large</span>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityTools;
