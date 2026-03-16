import React from 'react';
import styles from './StatusPanel.module.css';

const StatusPanel = ({ title, subtitle, value, status = 'neutral', label }) => {
    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>

            <div className={styles.content}>
                <div className={`${styles.bigStat} ${styles[status]}`}>
                    {value}
                </div>
                {label && <div className={styles.label}>{label}</div>}
            </div>
        </div>
    );
};

export default StatusPanel;
