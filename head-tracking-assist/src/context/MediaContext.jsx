import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useWebcam } from '../hooks/useWebcam';
import { useAudioVisualizer } from '../hooks/useAudioVisualizer';

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
    // Use existing hooks to manage state
    const webcamData = useWebcam();
    const audioDataViz = useAudioVisualizer();

    // Destructure for easier access
    const { videoRef, permission: camPermission } = webcamData;
    const { isMuted, toggleMute } = audioDataViz;

    // Additional state for Camera Toggle (Semantic ON/OFF)
    const [isCamActive, setIsCamActive] = useState(true);

    const toggleCam = () => {
        setIsCamActive(prev => {
            const newState = !prev;
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getVideoTracks().forEach(track => track.enabled = newState);
            }
            return newState;
        });
    };

    return (
        <MediaContext.Provider value={{
            ...webcamData,      // videoRef, stream, permission, error
            ...audioDataViz,    // audioData, isListening, voiceStatus, volume, isMuted, toggleMute
            isCamActive,
            toggleCam
        }}>
            {children}
        </MediaContext.Provider>
    );
};

export const useMedia = () => useContext(MediaContext);
