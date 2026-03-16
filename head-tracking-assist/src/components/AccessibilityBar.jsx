import React from 'react';

const AccessibilityBar = () => {
    return (
        <div className="accessibility-bar">
            <div className="access-controls">
                <button aria-label="Increase Font Size">A+</button>
                <button aria-label="Decrease Font Size">A-</button>
                <button aria-label="Toggle High Contrast">Contrast</button>
                <button aria-label="Toggle Voice Control">Voice</button>
            </div>
            <div className="head-tracking-status">
                <span>Head Tracking: Off</span>
            </div>
        </div>
    );
};

export default AccessibilityBar;
