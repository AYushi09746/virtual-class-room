import React from 'react';
import { MdVideocam, MdVideocamOff, MdMic, MdMicOff, MdTimer, MdHistory } from 'react-icons/md';
import { useMedia } from '../../context/MediaContext';
import { useTracking } from '../../context/TrackingContext';
import styles from './ActionPanel.module.css';

const ActionPanel = () => {
    const { isCamActive, toggleCam, isMuted, toggleMute } = useMedia();
    const { resetAttention } = useTracking();

    return (
        <div className={styles.panel}>
            <div className={styles.title}>Control Actions</div>

            <div className={styles.grid}>
                <button
                    className={`${styles.actionBtn} ${isCamActive ? styles.active : styles.inactive}`}
                    onClick={toggleCam}
                    title="Toggle Camera"
                >
                    {isCamActive ? <MdVideocam className={styles.icon} /> : <MdVideocamOff className={styles.icon} />}
                    <span>{isCamActive ? 'Cam ON' : 'Cam OFF'}</span>
                </button>

                <button
                    className={`${styles.actionBtn} ${!isMuted ? styles.active : styles.inactive}`}
                    onClick={toggleMute}
                    title="Toggle Microphone"
                >
                    {!isMuted ? <MdMic className={styles.icon} /> : <MdMicOff className={styles.icon} />}
                    <span>{!isMuted ? 'Mic ON' : 'Mic OFF'}</span>
                </button>

                <button
                    className={styles.actionBtn}
                    onClick={resetAttention}
                    title="Reset Attention Stats"
                >
                    <MdTimer className={styles.icon} />
                    <span>Reset Timer</span>
                </button>

                <button
                    className={styles.actionBtn}
                    onClick={() => alert("Log viewing feature coming soon!")}
                    title="View Session Logs"
                >
                    <MdHistory className={styles.icon} />
                    <span>View Logs</span>
                </button>
            </div>
        </div>
    );
};

export default ActionPanel;
