import React, { createContext, useState, useContext } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        headTracking: false,
        voiceControl: false,
        highContrast: false,
        screenReader: false
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <AccessibilityContext.Provider value={{ settings, toggleSetting }}>
            {children}
        </AccessibilityContext.Provider>
    );
};
