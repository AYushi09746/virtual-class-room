import React from 'react';
import { MdOutlineComputer, MdDarkMode, MdLightMode, MdPerson } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [mode, setMode] = React.useState('student');

    const toggleMode = () => {
        setMode(prev => prev === 'student' ? 'teacher' : 'student');
    };

    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                <MdOutlineComputer className={styles.logoIcon} />
                <span>ProctorAI</span>
            </div>

            <div className={styles.controls}>
                <button
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
                </button>

                <button
                    className={styles.modeToggle}
                    onClick={toggleMode}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-body)',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}
                >
                    <MdPerson size={18} />
                    <span>{mode === 'student' ? 'Student View' : 'Teacher View'}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
