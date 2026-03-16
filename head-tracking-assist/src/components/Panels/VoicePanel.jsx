import React from 'react';
import { useMedia } from '../../context/MediaContext';
import styles from './VoicePanel.module.css';

const VoicePanel = () => {
    const { audioData, isListening, voiceStatus, volume, isMuted } = useMedia();

    // Create a subset of bars for visualization (e.g., 10 bars)
    const bars = Array.from({ length: 15 }, (_, i) => {
        // Map data to height (0-100%)
        const index = Math.floor(i * (audioData.length / 15));
        const value = audioData[index] || 0;
        const height = Math.max(4, (value / 255) * 100);
        return height;
    });

    return (
        <div className={styles.panel}>
            <div className={styles.title}>
                Voice Activity
                <span style={{
                    fontSize: '0.8rem',
                    color: (voiceStatus === 'Speaking' && !isMuted) ? 'var(--status-good)' : 'var(--text-muted)',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    {isListening ? (
                        <>
                            {(voiceStatus === 'Speaking' && !isMuted) && <span className={styles.pulseDot}></span>}
                            {isMuted ? 'Muted' : voiceStatus} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>({isMuted ? 0 : volume})</span>
                        </>
                    ) : 'Muted'}
                </span>
            </div>

            <div className={styles.visualizer}>
                {bars.map((height, i) => (
                    <div
                        key={i}
                        className={styles.bar}
                        style={{ height: `${height}%`, opacity: (isListening && !isMuted) ? 1 : 0.3 }}
                    />
                ))}
            </div>
        </div>
    );
};

export default VoicePanel;
