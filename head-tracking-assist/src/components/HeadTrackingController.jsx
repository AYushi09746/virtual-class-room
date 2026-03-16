import React, { useState, useEffect } from 'react';
import { useHeadTrackingContext } from '../context/HeadTrackingContext';

const HeadTrackingController = ({ onStatusChange }) => {
    const { videoRef, trackingData, cameraError } = useHeadTrackingContext();
    const previewCanvasRef = React.useRef(null);

    // Optional: Draw preview on canvas to show wireframe here too, 
    // or just show the video feed. Simple video feed is safer for performance.
    // But since we want to show the user what's happening, let's just mirror the videoRef on a canvas 
    // because videoRef is already being used by the hidden video element (srcObject-wise).
    // Actually, we can just use another video element with the same stream if we had the stream.
    // But we have videoRef (which is an element).
    // Better technique: Draw the videoRef.current to a canvas loop here for the preview.

    useEffect(() => {
        const renderLoop = () => {
            if (previewCanvasRef.current && videoRef.current && videoRef.current.readyState >= 2) {
                const ctx = previewCanvasRef.current.getContext('2d');
                previewCanvasRef.current.width = videoRef.current.videoWidth;
                previewCanvasRef.current.height = videoRef.current.videoHeight;

                // Draw Video
                ctx.clearRect(0, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
                ctx.save();
                ctx.scale(-1, 1); // Mirror
                ctx.drawImage(videoRef.current, -previewCanvasRef.current.width, 0, previewCanvasRef.current.width, previewCanvasRef.current.height);
                ctx.restore();

                // Draw Mesh if available
                if (trackingData.results && trackingData.results.multiFaceLandmarks && trackingData.results.multiFaceLandmarks.length > 0) {
                    // We need to mirror coordinates too if we mirrored the canvas context
                    // Actually faceMesh coordinates are normalized 0-1.

                    const landmarks = trackingData.results.multiFaceLandmarks[0];
                    ctx.fillStyle = '#00FF00';
                    ctx.save();
                    ctx.scale(-1, 1);
                    ctx.translate(-previewCanvasRef.current.width, 0);

                    for (let i = 0; i < landmarks.length; i += 5) {
                        const x = landmarks[i].x * previewCanvasRef.current.width;
                        const y = landmarks[i].y * previewCanvasRef.current.height;
                        ctx.beginPath();
                        ctx.arc(x, y, 2, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                    ctx.restore();
                }
            }
            requestAnimationFrame(renderLoop);
        };
        const handle = requestAnimationFrame(renderLoop);
        return () => cancelAnimationFrame(handle);
    }, [videoRef, trackingData]);

    if (cameraError) return <div style={{ color: 'red', padding: '10px' }}>Camera Error: {cameraError.message}</div>;

    return (
        <div className="head-tracking-preview" style={{ marginTop: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', background: '#000' }}>
            <div style={{ position: 'relative', width: '100%', height: '240px', display: 'flex', justifyContent: 'center', background: '#333' }}>
                <canvas
                    ref={previewCanvasRef}
                    style={{ height: '100%', borderRadius: '4px' }}
                />

                {/* Overlay Status */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                }}>
                    Status: <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{trackingData.headStatus}</span>
                </div>
            </div>

            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>
                Move your head Left/Right/Up/Down to test.
            </p>
        </div>
    );
};

export default HeadTrackingController;
