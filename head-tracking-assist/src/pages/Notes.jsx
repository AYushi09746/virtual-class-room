import React, { useState } from 'react';
import { FaVolumeUp, FaStop } from 'react-icons/fa';

const Notes = () => {
    const [notes] = useState([
        { id: 1, title: 'Introduction to Biology', content: 'Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development, and evolution.' },
        { id: 2, title: 'History of Art', content: 'Art history is the study of objects of art in their historical development and stylistic contexts, i.e. genre, design, format, and style.' },
        { id: 3, title: 'Algebra Basics', content: 'Algebra is one of the broad parts of mathematics, together with number theory, geometry, and analysis. In its most general form, algebra is the study of mathematical symbols and the rules for manipulating these symbols.' }
    ]);

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-Speech is not supported.');
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }

    return (
        <div className="main-content">
            <div className="flex-between animate-fade-in" style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Class Notes</h1>
                <button onClick={stopSpeaking} style={styles.stopButton}>
                    <FaStop style={{ marginRight: '8px' }} /> Stop Audio
                </button>
            </div>

            <div className="notes-grid">
                {notes.map((note, index) => (
                    <div
                        key={note.id}
                        className="note-card animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-main)' }}>{note.title}</h2>
                        <p style={{ marginBottom: '16px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{note.content}</p>
                        <button
                            onClick={() => speak(note.content)}
                            style={styles.listenButton}
                        >
                            <FaVolumeUp style={{ marginRight: '8px' }} /> Listen
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    stopButton: {
        background: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        cursor: 'pointer'
    },
    listenButton: {
        background: 'rgba(59, 130, 246, 0.1)',
        color: 'var(--primary-color)',
        border: '1px solid var(--primary-color)',
        padding: '8px 16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: '100%',
        justifyContent: 'center',
        transition: 'background 0.2s'
    }
}

export default Notes;
