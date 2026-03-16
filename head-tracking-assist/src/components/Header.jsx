import React, { useState, useEffect } from 'react';
import { FaWifi, FaBatteryThreeQuarters } from 'react-icons/fa';

const Header = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header style={styles.header}>
            <div style={styles.logoSection}>
                <div style={styles.logoIcon}>👤</div>
                <h1 style={styles.title}>AssistUI</h1>
            </div>

            <div style={styles.statusSection}>
                <div style={styles.statusItem}>
                    <FaWifi style={{ marginRight: '8px', color: 'var(--status-connected)' }} />
                    <span>Connected</span>
                </div>
                <div style={styles.statusItem}>
                    <FaBatteryThreeQuarters style={{ marginRight: '8px' }} />
                    <span>85%</span>
                </div>
                <div style={styles.timeBlock}>
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        height: 'var(--header-height)',
        backgroundColor: 'var(--panel-bg)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    logoSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    logoIcon: {
        width: '32px',
        height: '32px',
        backgroundColor: 'var(--primary-color)',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px'
    },
    title: {
        fontSize: '20px',
        fontWeight: '600',
        letterSpacing: '0.5px'
    },
    statusSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        color: 'var(--text-muted)',
        fontSize: '14px'
    },
    statusItem: {
        display: 'flex',
        alignItems: 'center'
    },
    timeBlock: {
        backgroundColor: '#000',
        padding: '6px 12px',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px',
        letterSpacing: '1px'
    }
};

export default Header;
