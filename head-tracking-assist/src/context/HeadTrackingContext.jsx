import React, { createContext, useContext, useState } from 'react';
import { useWebcam } from '../hooks/useWebcam';
import { useHeadTracking } from '../hooks/useHeadTracking';

const HeadTrackingContext = createContext();

export const useHeadTrackingContext = () => useContext(HeadTrackingContext);

export const HeadTrackingProvider = ({ children, enabled }) => {
    const { videoRef, stream, error: cameraError, permission } = useWebcam(enabled);
    const [trackingData, setTrackingData] = useState({
        headStatus: "Initializing...",
        attentionScore: 0,
        isTracking: false,
        yaw: 0,
        pitch: 0,
        results: null
    });

    // Only run tracking if enabled
    // Hook handles its own init/cleanup when mounted
    useHeadTracking(enabled ? videoRef : { current: null }, (data) => {
        if (enabled) setTrackingData(data);
    });

    return (
        <HeadTrackingContext.Provider value={{ trackingData, stream, cameraError, permission, videoRef }}>
            {/* Hidden Source Video for FaceMesh Logic - Always render if enabled so ref attaches */}
            {enabled && (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', zIndex: -10 }}
                />
            )}
            {children}
        </HeadTrackingContext.Provider>
    );
};
