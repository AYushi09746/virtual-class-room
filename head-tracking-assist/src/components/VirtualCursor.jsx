import React, { useState, useEffect, useRef } from 'react';
import { useWebcam } from '../hooks/useWebcam';
import { useHeadTracking } from '../hooks/useHeadTracking';

const VirtualCursor = () => {
    const { videoRef } = useWebcam();
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [isClicking, setIsClicking] = useState(false);
    const [dwellProgress, setDwellProgress] = useState(0);
    const cursorRef = useRef(null);

    // Config
    const SENSITIVITY = 50; // Pixels per frame move
    const DWELL_TIME = 1500; // ms to trigger click

    const dwellTimer = useRef(null);
    const lastElement = useRef(null);

    useHeadTracking(videoRef, (data) => {
        if (!data.isTracking) return;

        // data.yaw (Left/Right) data.pitch (Up/Down)
        // Values usually -0.5 to 0.5 roughly

        setPosition(prev => {
            // Invert logic: 
            // Look Right (Positive Yaw) -> Move Cursor Right (Add X)
            // Look Left (Negative Yaw) -> Move Cursor Left (Sub X)
            // Look Down (Positive Pitch) -> Move Cursor Down (Add Y)

            // Apply deadzone
            const dx = Math.abs(data.yaw) > 0.05 ? data.yaw * SENSITIVITY : 0;
            const dy = Math.abs(data.pitch) > 0.05 ? data.pitch * SENSITIVITY : 0;

            let newX = prev.x + dx * 15; // Speed multiplier
            let newY = prev.y + dy * 15;

            // Boundary Check
            newX = Math.max(0, Math.min(newX, window.innerWidth));
            newY = Math.max(0, Math.min(newY, window.innerHeight));

            return { x: newX, y: newY };
        });
    });

    // Dwell Click Logic
    useEffect(() => {
        const element = document.elementFromPoint(position.x, position.y);

        if (element !== lastElement.current) {
            // Target changed, reset timer
            clearTimeout(dwellTimer.current);
            setIsClicking(false);
            lastElement.current = element;

            if (element && (element.tagName === 'BUTTON' || element.tagName === 'A' || element.onclick || element.getAttribute('role') === 'button')) {
                // Start timer if clickable
                dwellTimer.current = setTimeout(() => {
                    setIsClicking(true);
                    element.click();
                    setTimeout(() => setIsClicking(false), 500); // Reset visual
                }, DWELL_TIME);
            }
        }

        return () => clearTimeout(dwellTimer.current);
    }, [position]);

    return (
        <>
            <video ref={videoRef} autoPlay muted playsInline style={{ display: 'none' }} />

            <div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    zIndex: 9999,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.5))'
                }}
            >
                {/* SVG Progress Ring */}
                <svg width="60" height="60" style={{ transform: 'translate(-50%, -50%) rotate(-90deg)' }}>
                    {/* Background Ring */}
                    <circle
                        cx="30" cy="30" r={radius}
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="4"
                        fill="transparent"
                    />
                    {/* Progress Ring */}
                    {isClicking && (
                        <circle
                            cx="30" cy="30" r={radius}
                            stroke="#22c55e"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - progress}
                            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                        />
                    )}
                    {/* Center Dot */}
                    <circle cx="30" cy="30" r="4" fill={isClicking ? "#22c55e" : "white"} stroke="black" strokeWidth="1" />
                </svg>
            </div>
        </>
    );
};


export default VirtualCursor;
