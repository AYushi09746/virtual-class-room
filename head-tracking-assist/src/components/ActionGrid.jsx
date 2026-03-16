import React from 'react';
import { FaMousePointer, FaKeyboard, FaArrowDown, FaCog, FaHome, FaPhone } from 'react-icons/fa';
import styles from '../styles/ActionGrid.module.css';

const ActionButton = ({ icon: Icon, label, active, onClick }) => (
    <button className={`${styles.card} ${active ? styles.active : ''}`} onClick={onClick}>
        <div className={styles.iconContainer}>
            <Icon />
        </div>
        <span className={styles.label}>{label}</span>
        {active && <div className={styles.activeIndicator} />}
    </button>
);

const ActionGrid = () => {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.grid}>
                <ActionButton icon={FaMousePointer} label="Click" active />
                <ActionButton icon={FaArrowDown} label="Scroll" />
                <ActionButton icon={FaKeyboard} label="Keyboard" />
                <ActionButton icon={FaPhone} label="Call Care" />
                <ActionButton icon={FaHome} label="Home" />
                <ActionButton icon={FaCog} label="Settings" />
            </div>
        </div>
    );
};

export default ActionGrid;
