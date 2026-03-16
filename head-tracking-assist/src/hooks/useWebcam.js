import { useState, useEffect, useRef } from 'react';

export const useWebcam = (enabled = true) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [permission, setPermission] = useState('prompt');

    useEffect(() => {
        if (!enabled) {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
            return;
        }

        const startWebcam = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 640, height: 480, facingMode: "user" }
                });
                setStream(mediaStream);
                setPermission('granted');
                // Note: videoRef.current is handled in the effect below to ensure it's attached
            } catch (err) {
                console.error("Error accessing webcam:", err);
                setError(err);
                setPermission('denied');
            }
        };

        if (!stream) {
            startWebcam();
        }

        return () => {
            // Cleanup on unmount is tricky if we want to persist across renders, 
            // but here we should stop if enabled becomes false or unmount
        };
    }, [enabled]);

    // Separate effect to attach stream to video element when both are ready
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
                videoRef.current.play().catch(e => console.error("Play Error:", e));
            };
        }
    }, [stream, videoRef]); // videoRef itself is stable, but good to include

    return { videoRef, stream, error, permission };
};
