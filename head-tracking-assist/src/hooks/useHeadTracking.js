import { useEffect, useRef } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

export const useHeadTracking = (videoRef, updateTracking) => {
    // Refs to valid state without restart
    const trackingRef = useRef({
        faceMesh: null,
        camera: null,
        isInitialized: false
    });

    useEffect(() => {
        let isMounted = true;
        let retryCount = 0;

        const tryInitialize = () => {
            if (!isMounted) return;

            // 1. Check if Video Element exists and is ready
            if (!videoRef.current) {
                if (retryCount < 20) { // Retry for 10 seconds
                    console.log(`Waiting for video element... (${retryCount})`);
                    retryCount++;
                    setTimeout(tryInitialize, 500);
                } else {
                    if (updateTracking) updateTracking({ headStatus: "Error: Camera Not Found", isTracking: false });
                }
                return;
            }

            console.log("🚀 STARTING HEAD TRACKING SERVICE...");
            if (updateTracking) updateTracking({ headStatus: "Initializing Model...", isTracking: false });

            const initializeFaceMesh = async () => {
                try {
                    const faceMesh = new FaceMesh({
                        locateFile: (file) => {
                            // Robust path handling
                            return `/mediapipe/${file}`;
                        }
                    });

                    faceMesh.setOptions({
                        maxNumFaces: 1,
                        refineLandmarks: true,
                        minDetectionConfidence: 0.5,
                        minTrackingConfidence: 0.5
                    });

                    faceMesh.onResults((results) => {
                        if (!isMounted) return;

                        if (!trackingRef.current.isInitialized) {
                            console.log("✅ FACEMESH INITIALIZED SUCCESSFULLY");
                            trackingRef.current.isInitialized = true;
                        }

                        onResults(results, updateTracking);
                    });

                    trackingRef.current.faceMesh = faceMesh;

                    // Initialize Camera Utils
                    console.log("📷 Connecting Camera...");
                    const camera = new Camera(videoRef.current, {
                        onFrame: async () => {
                            if (trackingRef.current.faceMesh) {
                                await trackingRef.current.faceMesh.send({ image: videoRef.current });
                            }
                        },
                        width: 640,
                        height: 480
                    });

                    trackingRef.current.camera = camera;
                    await camera.start();
                    console.log("📷 Camera Started");

                } catch (error) {
                    console.error("❌ CRITICAL ERROR IN HEAD TRACKING:", error);
                    if (updateTracking) updateTracking({ headStatus: `Error: ${error.message}`, isTracking: false });
                }
            };

            initializeFaceMesh();
        };

        // Start initialization process
        tryInitialize();

        return () => {
            console.log("🛑 STOPPING HEAD TRACKING SERVICE...");
            isMounted = false;
            if (trackingRef.current.camera) trackingRef.current.camera.stop();
            if (trackingRef.current.faceMesh) trackingRef.current.faceMesh.close();
            trackingRef.current.isInitialized = false;
        };
    }, [videoRef]); // Restart when videoRef changes (e.g. from null to valid ref)

    // Helper: Logic for Head Pose Calculation
    const onResults = (results, callback) => {
        if (!callback) return;

        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];

            // --- SIMPLE ROBUST HEAD POSE LOGIC ---
            // 1. Nose Tip (1)
            // 2. Left Ear (234)
            // 3. Right Ear (454)
            // 4. Chin (152)
            // 5. Forehead (10)

            const nose = landmarks[1];
            const leftEar = landmarks[234];
            const rightEar = landmarks[454];
            const chin = landmarks[152];
            const forehead = landmarks[10];

            // YAW (Horizontal): Left/Right
            // Range: -0.5 (Left) to +0.5 (Right)
            const midPointX = (leftEar.x + rightEar.x) / 2;
            const yaw = (nose.x - midPointX) * 20; // Amplifier

            // PITCH (Vertical): Up/Down
            // Range: -0.5 (Up) to +0.5 (Down)
            const midPointY = (forehead.y + chin.y) / 2;
            const pitch = (nose.y - midPointY) * 20; // Amplifier

            // --- GESTURE DETECTION (Mouth Click) ---
            const upperLip = landmarks[13];
            const lowerLip = landmarks[14];
            // Calculate distance between lips relative to face height (chin to forehead) to fail-safe against zoom/distance
            const faceHeight = Math.abs(chin.y - forehead.y);
            const lipDistance = Math.abs(lowerLip.y - upperLip.y) / faceHeight;

            let gesture = null;
            if (lipDistance > 0.05) { // Threshold for "Open"
                gesture = "Mouth Open";
            }

            // Status Logic
            let status = "Facing Screen";
            let attention = 100;

            const THRESHOLD = 0.8;

            if (yaw > THRESHOLD) { status = "Looking Left"; attention = 20; }
            else if (yaw < -THRESHOLD) { status = "Looking Right"; attention = 20; }
            else if (pitch > THRESHOLD) { status = "Looking Down"; attention = 40; }
            else if (pitch < -THRESHOLD) { status = "Looking Up"; attention = 40; }

            if (gesture) status = gesture; // Override status with gesture

            callback({
                headStatus: status,
                attentionScore: attention,
                isTracking: true,
                yaw: yaw * 0.1, // Normalized for cursor
                pitch: pitch * 0.1,
                gesture: gesture, // Send gesture state
                results: results
            });
        } else {
            callback({
                headStatus: "Face Not Detected", // Running but no face found
                attentionScore: 0,
                isTracking: true, // Still "tracking", just no face
                yaw: 0,
                pitch: 0,
                results: null
            });
        }
    };
};
