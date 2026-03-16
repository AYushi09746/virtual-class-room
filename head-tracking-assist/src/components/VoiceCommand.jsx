import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const VoiceCommand = () => {
    const { settings, toggleSetting } = useAccessibility();
    const navigate = useNavigate();
    const [isListening, setIsListening] = useState(false);
    const [lastCommand, setLastCommand] = useState('');
    const [feedback, setFeedback] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!settings.voiceControl) {
            if (recognitionRef.current) recognitionRef.current.abort();
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setFeedback("Voice Control Not Supported");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false; // Restart manually for better stability
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setFeedback("Listening...");
        };

        recognition.onend = () => {
            setIsListening(false);
            // Auto-restart if still enabled
            if (settings.voiceControl) {
                setTimeout(() => {
                    try { recognition.start(); } catch (e) { /* ignore already started errors */ }
                }, 1000);
            }
        };

        recognition.onerror = (event) => {
            console.warn("Speech Error:", event.error);
            if (event.error === 'not-allowed') {
                setFeedback("Microphone Blocked");
            }
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
            setLastCommand(`"${transcript}"`);
            handleCommand(transcript);
        };

        recognitionRef.current = recognition;
        try { recognition.start(); } catch (e) { }

        return () => {
            recognition.abort();
        };
    }, [settings.voiceControl]);

    const handleCommand = (cmd) => {
        // 1. Navigation
        if (cmd.includes('home') || cmd.includes('dashboard')) { navigate('/dashboard'); return; }
        if (cmd.includes('login')) { navigate('/login'); return; }
        if (cmd.includes('signup') || cmd.includes('sign up')) { navigate('/signup'); return; }
        if (cmd.includes('course')) { navigate('/courses'); return; }
        if (cmd.includes('note')) { navigate('/notes'); return; }
        if (cmd.includes('ai') || cmd.includes('assistant')) { navigate('/ai-assistant'); return; }
        if (cmd.includes('accessibility') || cmd.includes('tool')) { navigate('/accessibility'); return; }
        // Teacher Page Navigation
        if (cmd.includes('teacher') || cmd.includes('teach')) { navigate('/teacher'); return; }

        // 2. Scrolling
        if (cmd.includes('scroll down')) { window.scrollBy({ top: window.innerHeight * 0.6, behavior: 'smooth' }); return; }
        if (cmd.includes('scroll up')) { window.scrollBy({ top: -window.innerHeight * 0.6, behavior: 'smooth' }); return; }
        if (cmd.includes('top') || cmd.includes('go to top')) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        if (cmd.includes('bottom')) { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); return; }
        if (cmd.includes('go back')) { navigate(-1); return; }

        // 3. Settings / Toggles (New Feature)
        if (cmd.includes('head tracking') || cmd.includes('face tracking')) {
            if (cmd.includes('on') || cmd.includes('enable') || cmd.includes('start')) {
                if (!settings.headTracking) toggleSetting('headTracking');
                setFeedback("Head Tracking Enabled");
                return;
            }
            if (cmd.includes('off') || cmd.includes('disable') || cmd.includes('stop')) {
                if (settings.headTracking) toggleSetting('headTracking');
                setFeedback("Head Tracking Disabled");
                return;
            }
            // Toggle if no state specified
            toggleSetting('headTracking');
            return;
        }

        if (cmd.includes('high contrast') || cmd.includes('dark mode')) {
            if (!settings.highContrast) toggleSetting('highContrast');
            setFeedback("High Contrast On");
            return;
        }

        // 4. Click Interaction (The "Magic" Part)
        // commands like "click [text]", "open [text]", "select [text]", or just "[text]"
        let targetText = cmd;
        const actionPrefixes = ['click', 'open', 'select', 'press', 'go to'];

        for (const prefix of actionPrefixes) {
            if (cmd.startsWith(prefix + ' ')) {
                targetText = cmd.replace(prefix + ' ', '').trim();
                break;
            }
        }

        if (clickElementByText(targetText)) {
            setFeedback(`Clicked "${targetText}"`);
        } else {
            setFeedback("Command not recognized");
        }
    };

    const clickElementByText = (text) => {
        // Find all clickable elements
        const elements = document.querySelectorAll('button, a, input[type="button"], input[type="submit"], [role="button"], h1, h2, h3, h4, span, div');

        let bestMatch = null;
        let highestScore = 0;

        elements.forEach(el => {
            // Get visible text or label
            const label = (el.innerText || el.textContent || el.getAttribute('aria-label') || el.value || "").toLowerCase();
            if (!label) return;

            // Check if element is actually visible
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0 || el.style.display === 'none' || el.style.visibility === 'hidden') return;

            // Scoring Logic
            let score = 0;
            if (label === text) score = 100; // Exact match
            else if (label.includes(text)) score = 50 + (text.length / label.length * 50); // Partial match prioritized by length ratio
            else if (text.includes(label) && label.length > 3) score = 40; // Command contains label (e.g. "click the save button" vs "save")

            if (score > highestScore) {
                highestScore = score;
                bestMatch = el;
            }
        });

        if (bestMatch && highestScore > 40) {
            bestMatch.click();
            bestMatch.focus();
            // Highlight effect
            const originalBorder = bestMatch.style.border;
            bestMatch.style.border = '2px solid #22c55e';
            bestMatch.style.transition = '0.2s';
            setTimeout(() => { bestMatch.style.border = originalBorder; }, 1000);
            return true;
        }
        return false;
    };

    if (!settings.voiceControl) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'rgba(15, 23, 42, 0.9)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 10000,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            maxWidth: '300px',
            transition: '0.3s'
        }}>
            <div style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: isListening ? '#22c55e' : '#ef4444',
                boxShadow: isListening ? '0 0 10px #22c55e' : 'none',
                transition: '0.3s'
            }} />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {isListening ? "Listening" : "Paused"}
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                    {lastCommand || "Say a command..."}
                </span>
            </div>
        </div>
    );
};

export default VoiceCommand;
