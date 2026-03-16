import React from 'react';
import { FaDesktop, FaMoon, FaSun, FaUser } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { role } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                <FaDesktop className={styles.logoIcon} />
                <span>ProctorAI</span>
            </div>

            <div className={styles.controls}>
                <button
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? <FaMoon size={22} /> : <FaSun size={22} />}
                </button>

                <div
                    className={styles.userBadge}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--secondary-bg)',
                        color: 'var(--text-dark)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                    }}
                >
                    <FaUser size={16} />
                    <span>{role} Account</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
