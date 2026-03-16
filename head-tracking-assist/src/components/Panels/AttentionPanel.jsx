import React from 'react';
import { MdWarning, MdTimer } from 'react-icons/md';
import { useTracking } from '../../context/TrackingContext';
import styles from './AttentionPanel.module.css';

const AttentionPanel = () => {
    const { trackingState } = useTracking();
    const { attentionStatus, distractionTimer, warningCount } = trackingState;

    const isAttentive = attentionStatus === 'Attentive';

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <MdTimer /> Attention Monitor
                </div>
                <div className={`${styles.statusIndicator} ${isAttentive ? styles.attentive : styles.notAttentive}`}>
                    {attentionStatus}
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                    <div className={`${styles.statValue} ${!isAttentive ? styles.dangerText : ''}`}>
                        {distractionTimer}s
                    </div>
                    <div className={styles.statLabel}>Distraction Duration</div>
                </div>

                <div className={styles.statBox}>
                    <div className={styles.statValue}>
                        {warningCount || 0}
                    </div>
                    <div className={styles.statLabel}>Total Warnings</div>
                </div>
            </div>
        </div>
    );
};

export default AttentionPanel;
