import { useState, useEffect, useRef } from 'react';

export const useAudioVisualizer = () => {
    const [audioData, setAudioData] = useState(new Uint8Array(0));
    const [isListening, setIsListening] = useState(false);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const rafIdRef = useRef(null);

    const [voiceStatus, setVoiceStatus] = useState('Silent');
    const [volume, setVolume] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const streamRef = useRef(null);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    useEffect(() => {
        if (isMuted) {
            if (streamRef.current) {
                streamRef.current.getAudioTracks().forEach(track => track.enabled = false);
            }
            setVoiceStatus('Muted');
            setVolume(0);
        } else {
            if (streamRef.current) {
                streamRef.current.getAudioTracks().forEach(track => track.enabled = true);
            }
        }
    }, [isMuted]);

    useEffect(() => {
        const startAudio = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;

                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 64;
                analyserRef.current.smoothingTimeConstant = 0.8;

                sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
                sourceRef.current.connect(analyserRef.current);

                const bufferLength = analyserRef.current.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                setIsListening(true);

                const update = () => {
                    if (!analyserRef.current) return;

                    if (isMuted) {
                        setAudioData(new Uint8Array(bufferLength));
                        rafIdRef.current = requestAnimationFrame(update);
                        return;
                    }

                    analyserRef.current.getByteFrequencyData(dataArray);

                    // Calculate MAX volume
                    let max = 0;
                    for (let i = 0; i < bufferLength; i++) {
                        if (dataArray[i] > max) max = dataArray[i];
                    }
                    const volumeLevel = max;
                    setVolume(volumeLevel);

                    // Threshold for "Speaking"
                    if (volumeLevel > 5) {
                        setVoiceStatus('Speaking');
                    } else {
                        setVoiceStatus('Silent');
                    }

                    setAudioData(new Uint8Array(dataArray));
                    rafIdRef.current = requestAnimationFrame(update);
                };

                update();
            } catch (err) {
                console.error("Error accessing microphone:", err);
                setIsListening(false);
                setVoiceStatus('Error');
            }
        };

        startAudio();

        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, []); // Run once

    return { audioData, isListening, voiceStatus, volume, isMuted, toggleMute };
};
