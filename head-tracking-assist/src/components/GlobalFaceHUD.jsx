 import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHeadTrackingContext } from '../context/HeadTrackingContext';

const GlobalFaceHUD = () => {
    const { videoRef, trackingData } = useHeadTrackingContext();
    const canvasRef = useRef(null);
    const location = useLocation();

    // Navigation State
    const lastActionTime = useRef(0);
    const [actionStatus, setActionStatus] = useState("READY");

    // Hide HUD on Accessibility Page logic
    const isHidden = location.pathname === '/accessibility';

    // FOCUS NAVIGATION LOGIC
    useEffect(() => {
        if (!trackingData || !trackingData.isTracking) return;

        const now = Date.now();
        // 1-second cooldown between actions to prevent chaos
        if (now - lastActionTime.current < 1200) return;

        const getFocusables = () => {
            return Array.from(document.querySelectorAll(
                'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            )).filter(el => {
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
            });
        };

        const moveFocus = (direction) => {
            const focusables = getFocusables();
            const current = document.activeElement;
            let index = focusables.indexOf(current);

            // If nothing focused (or body), start at top or bottom
            if (index === -1) {
                index = direction === 'next' ? 0 : focusables.length - 1;
            } else {
                index = direction === 'next' ? index + 1 : index - 1;
            }

            // Loop around
            if (index >= focusables.length) index = 0;
            if (index < 0) index = focusables.length - 1;

            if (focusables[index]) {
                focusables[index].focus();
                // Visual Highlight for demo
                focusables[index].style.outline = '4px solid #22c55e';
                focusables[index].style.outlineOffset = '2px';

                // Clear previous outlines
                focusables.forEach((el, i) => {
                    if (i !== index) {
                        el.style.outline = '';
                        el.style.outlineOffset = '';
                    }
                });

                lastActionTime.current = Date.now();
                setActionStatus(direction === 'next' ? "NEXT ITEM" : "PREVIOUS ITEM");
                setTimeout(() => setActionStatus("READY"), 1000);
            }
        };

        const doClick = () => {
            const current = document.activeElement;
            if (current && (current.tagName === 'BUTTON' || current.tagName === 'A' || current.tagName === 'INPUT')) {
                current.click();

                // Visual Click Feedback
                current.style.backgroundColor = "#F59E0B";
                setTimeout(() => current.style.backgroundColor = "", 200);

                lastActionTime.current = Date.now();
                setActionStatus("CLICKED!");
                setTimeout(() => setActionStatus("READY"), 1000);
            }
        };

        // --- MAPPING INPUTS TO ACTIONS ---
        const { headStatus, gesture } = trackingData;

        // 1. CLICK (Mouth Open)
        if (gesture === "Mouth Open") {
            doClick();
            return;
        }

        // 2. NEXT (Look Right)
        if (headStatus === "Looking Right") {
            moveFocus('next');
            return;
        }

        // 3. PREVIOUS (Look Left)
        if (headStatus === "Looking Left") {
            moveFocus('prev');
            return;
        }

    }, [trackingData]); // Run whenever tracking updates

    // DRAW HUD (Only if NOT hidden)
    useEffect(() => {
        if (!isHidden && canvasRef.current && videoRef.current && trackingData?.results?.multiFaceLandmarks?.[0]) {
            const ctx = canvasRef.current.getContext('2d');
            const video = videoRef.current;
            const landmarks = trackingData.results.multiFaceLandmarks[0];

            if (canvasRef.current.width !== video.videoWidth) {
                canvasRef.current.width = video.videoWidth;
                canvasRef.current.height = video.videoHeight;
            }

            // Base Video
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);

            // Overlay
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 2;

            // Simple Face Oval
            ctx.beginPath();
            ctx.ellipse(
                landmarks[1].x * canvasRef.current.width,
                landmarks[1].y * canvasRef.current.height,
                60, 80, 0, 0, 2 * Math.PI
            );
            ctx.stroke();
        }
    }, [trackingData, videoRef, isHidden]);

    // Mirror Effect
    useEffect(() => {
        if (canvasRef.current) canvasRef.current.style.transform = "scaleX(-1)";
    }, [isHidden]);

    // Cleanup Only
    useEffect(() => {
        return () => { };
    }, []);

    // HUD State
    const [hudPosition, setHudPosition] = useState({ x: window.innerWidth - 220, y: 20 });
    const [hudSize, setHudSize] = useState({ width: 220, height: 160 });
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    // Drag Logic
    const handleMouseDown = (e) => {
        setIsDragging(true);
        dragOffset.current = {
            x: e.clientX - hudPosition.x,
            y: e.clientY - hudPosition.y
        };
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                setHudPosition({
                    x: e.clientX - dragOffset.current.x,
                    y: e.clientY - dragOffset.current.y
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <>
            {/* Background Camera Service */}
            <video ref={videoRef} autoPlay muted playsInline style={{ display: 'none' }} />

            {/* HUD Status Box (Draggable & Resizable) */}
            {!isHidden && (
                <div style={{
                    position: 'fixed',
                    left: `${hudPosition.x}px`,
                    top: `${hudPosition.y}px`,
                    width: `${hudSize.width}px`,
                    height: `${hudSize.height}px`,
                    border: `3px solid ${actionStatus === "READY" ? '#22c55e' : '#F59E0B'}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    zIndex: 9998,
                    background: 'black',
                    display: 'flex', flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                }}>
                    {/* DRAG HANDLE HEADER */}
                    <div
                        onMouseDown={handleMouseDown}
                        style={{
                            height: '24px',
                            background: '#333',
                            cursor: 'move',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            borderBottom: '1px solid #444'
                        }}
                    >
                        <div style={{ width: '40px', height: '4px', background: '#666', borderRadius: '2px' }}></div>
                    </div>

                    <div style={{ flex: 1, position: 'relative' }}>
                        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{
                            position: 'absolute', bottom: '0', left: '0', right: '0',
                            textAlign: 'center',
                            background: 'rgba(0,0,0,0.8)',
                            padding: '4px',
                            color: actionStatus === "READY" ? '#22c55e' : '#F59E0B',
                            fontSize: '11px', fontWeight: 'bold'
                        }}>
                            {actionStatus === "READY" ? (trackingData?.headStatus || "IDLE") : actionStatus}
                        </div>
                    </div>

                    {/* DISABLE BUTTON */}
                    <button
                        onClick={() => window.location.href = '/accessibility'}
                        style={{
                            width: '100%',
                            padding: '8px',
                            background: '#EF4444',
                            color: 'white',
                            border: 'none',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            borderTop: '1px solid #333'
                        }}
                    >
                        OFF / SETTINGS
                    </button>

                    {/* RESIZE HANDLE */}
                    <div
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            const startX = e.clientX;
                            const startY = e.clientY;
                            const startWidth = hudSize.width;
                            const startHeight = hudSize.height;

                            const onMove = (moveEvent) => {
                                const newWidth = Math.max(160, startWidth + (moveEvent.clientX - startX));
                                // Lock Aspect Ratio (4:3 standard webcam) to prevent distortion
                                const newHeight = newWidth * 0.75;

                                setHudSize({
                                    width: newWidth,
                                    height: newHeight
                                });
                            };

                            const onUp = () => {
                                window.removeEventListener('mousemove', onMove);
                                window.removeEventListener('mouseup', onUp);
                            };

                            window.addEventListener('mousemove', onMove);
                            window.addEventListener('mouseup', onUp);
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            width: '15px',
                            height: '15px',
                            cursor: 'nwse-resize',
                            background: 'linear-gradient(135deg, transparent 50%, #22c55e 50%)',
                            zIndex: 10
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default GlobalFaceHUD;
