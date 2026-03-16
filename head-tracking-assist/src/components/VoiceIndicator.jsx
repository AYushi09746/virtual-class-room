import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import styles from '../styles/VoiceIndicator.module.css';

const VoiceIndicator = ({ status = 'listening' }) => {
    return (
        <div className={`${styles.container} ${styles[status]}`}>
            <div className={styles.iconWrapper}>
                <FaMicrophone size={32} />
            </div>
            <div className={styles.waveContainer}>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
            </div>
            <div className={styles.statusText}>
                {status === 'listening' && 'Listening for commands...'}
                {status === 'processing' && 'Processing...'}
                {status === 'active' && 'Command Recognized'}
            </div>
        </div>
    );
};

export default VoiceIndicator;
