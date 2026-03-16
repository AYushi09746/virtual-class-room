import React, { useEffect, useRef } from 'react';
import { FaVideo } from 'react-icons/fa';
import styles from '../styles/CameraFeed.module.css';

const CameraFeed = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        // In a real app, we would request camera access here.
        // navigator.mediaDevices.getUserMedia({ video: true })...
        // For this UI demo, we'll just show the placeholder style.
    }, []);

    return (
        <div className={styles.cameraContainer}>
            <div className={styles.videoPlaceholder}>
                <div className={styles.overlay}>
                    <div className={styles.reticle}></div>
                    <div className={styles.trackingStatus}>
                        <div className={styles.dot}></div>
                        Head Tracking Active
                    </div>
                </div>
                <video ref={videoRef} className={styles.videoElement} autoPlay muted playsInline />
                {/* Fallback visual if no video */}
                <div className={styles.fallback}>
                    <FaVideo size={48} color="var(--text-secondary)" />
                    <p>Camera Feed</p>
                </div>
            </div>
        </div>
    );
};

export default CameraFeed;
