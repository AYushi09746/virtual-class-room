import React, { useState } from 'react';
import { FaMicrophone, FaPaperPlane, FaVolumeUp } from 'react-icons/fa';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'Hello Piyush! How can I help you with your studies today?', time: '10:00 AM' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = { id: Date.now(), sender: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');

        try {
            const res = await fetch('http://localhost:5000/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: currentInput })
            });
            const data = await res.json();

            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: data.reply,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMsg]);
            speak(data.reply); // Auto-speak AI response
        } catch (err) {
            console.error("AI Error:", err);
            // Fallback
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "Sorry, I can't reach the server right now.", time: new Date().toLocaleTimeString() }]);
        }
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };


    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };
    };


    return (
        <div style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <h1>AI Study Assistant</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-icon" onClick={() => speak(messages[messages.length-1].text)} style={styles.iconBtn}><FaVolumeUp /></button>
                </div>
            </div>

            <div className="chat-window card-panel" style={{ flex: 1, marginBottom: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map(msg => (
                    <div key={msg.id} className={`message-bubble ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}`} style={msg.sender === 'user' ? styles.userMsg : styles.aiMsg}>
                        <p>{msg.text}</p>
                        <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '4px', display: 'block' }}>{msg.time}</span>
                    </div>
                ))}
            </div>

            <div className="chat-input-area card-panel" style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
                <button 
                    style={{ ...styles.iconBtn, background: '#f1f5f9' }}
                    onClick={startListening}
                    title="Voice Input"
                >
                    <FaMicrophone />
                </button>
                <input
                    className="input-field"
                    placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}
                />
                <button className="btn-primary" onClick={handleSend}><FaPaperPlane /></button>
            </div>
        </div>
    );
};

const styles = {
    userMsg: {
        alignSelf: 'flex-end',
        background: 'var(--primary-color)',
        color: 'white',
        padding: '1rem',
        borderRadius: '12px 12px 0 12px',
        maxWidth: '70%'
    },
    aiMsg: {
        alignSelf: 'flex-start',
        background: '#f1f5f9',
        color: 'var(--text-dark)',
        padding: '1rem',
        borderRadius: '12px 12px 12px 0',
        maxWidth: '70%'
    },
    iconBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        background: 'white'
    }
}

export default AIAssistant;
