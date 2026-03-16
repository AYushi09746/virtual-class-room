import React from 'react';
import { useWebcam } from '../../hooks/useWebcam';
import { useHeadTracking } from '../../hooks/useHeadTracking';
import { useTracking } from '../../context/TrackingContext';
import styles from './CameraPanel.module.css';

const CameraPanel = () => {
    const { videoRef, permission, error } = useWebcam();
    const { updateTracking } = useTracking();
    useHeadTracking(videoRef, updateTracking);

    return (
        <div className={styles.panel}>
            <div className={styles.title}>
                Video Feed
                {permission === 'granted' ? (
                    <span className={styles.statusTag}>Live</span>
                ) : (
                    <span className={`${styles.statusTag} ${styles.error}`}>Offline</span>
                )}
            </div>

            <div className={styles.videoContainer}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={styles.video}
                />
                <div className={styles.overlay}>
                    <span>Camera: Integrated Webcam</span>
                    <span>720p 30fps</span>
                </div>
            </div>
        </div>
    );
};

export default CameraPanel;
