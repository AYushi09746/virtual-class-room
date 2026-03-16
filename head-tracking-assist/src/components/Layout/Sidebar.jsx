import React from 'react';
import { MdDashboard, MdAnalytics, MdSettings, MdHelp } from 'react-icons/md';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <div className={`${styles.navItem} ${styles.active}`}>
                    <MdDashboard className={styles.icon} />
                    <span>Classroom Monitor</span>
                </div>
                <div className={styles.navItem}>
                    <MdAnalytics className={styles.icon} />
                    <span>Analytics</span>
                </div>
                <div className={styles.navItem}>
                    <MdSettings className={styles.icon} />
                    <span>Settings</span>
                </div>
                <div className={styles.navItem}>
                    <MdHelp className={styles.icon} />
                    <span>Help & Support</span>
                </div>
            </nav>

            <div className={styles.statusSection}>
                <div className={styles.statusTitle}>System Status</div>
                <div className={styles.statusRow}>
                    <span>Server</span>
                    <span className={`${styles.dot} ${styles.active}`}></span>
                </div>
                <div className={styles.statusRow}>
                    <span>AI Engine</span>
                    <span className={`${styles.dot} ${styles.active}`}></span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
