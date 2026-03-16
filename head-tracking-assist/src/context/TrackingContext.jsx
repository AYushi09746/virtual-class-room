import React, { createContext, useContext, useState, useCallback } from 'react';

const TrackingContext = createContext();

export const TrackingProvider = ({ children }) => {
    const [trackingState, setTrackingState] = useState({
        headStatus: 'Initializing...',
        attentionScore: 100,
        isTracking: false,
        debugInfo: {} // For coordinates if needed
    });

    const updateTracking = useCallback((newState) => {
        setTrackingState(prev => ({ ...prev, ...newState }));
    }, []);

    return (
        <TrackingContext.Provider value={{ trackingState, updateTracking }}>
            {children}
        </TrackingContext.Provider>
    );
};

export const useTracking = () => useContext(TrackingContext);
