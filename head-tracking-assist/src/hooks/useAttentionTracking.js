import { useState, useEffect, useRef } from 'react';
import { useTracking } from '../context/TrackingContext';

export const useAttentionTracking = () => {
    const { trackingState, updateTracking } = useTracking();
    const { headStatus, isTracking } = trackingState;

    const stateRef = useRef({
        lastDistractionStart: null,
        warningCount: 0,
        isWarned: false
    });

    useEffect(() => {
        // --- ACADEMIC LOGIC: RULE-BASED ATTENTION MONITORING ---
        // This hook acts as the "Decision Engine". It takes raw sensor data (Head Status)
        // and applies temporal rules to determine "Attention".

        let timer = 0;
        let attentionStatus = "Attentive";
        const now = Date.now();

        // Rule 1: Determine if currently distracted based on Head Status
        // If Face is NOT DETECTED or NOT Facing Screen -> Distracted
        const isDistracted =
            headStatus !== 'Facing Screen' &&
            headStatus !== 'Initializing...';

        if (isDistracted && isTracking) {
            // Start timer if new distraction
            if (!stateRef.current.lastDistractionStart) {
                stateRef.current.lastDistractionStart = now;
            }

            // Calculate duration
            const duration = (now - stateRef.current.lastDistractionStart) / 1000;
            timer = Math.floor(duration);

            // Rule 2: Temporal Threshold (> 3 seconds)
            // Short glances away are ignored. Sustained distraction triggers alert.
            if (duration > 3) {
                attentionStatus = "Not Attentive";

                // Rule 3: Warning System
                // Increment warning count only once per distraction event
                if (!stateRef.current.isWarned) {
                    console.log("Warning triggered!");
                    stateRef.current.warningCount += 1;
                    stateRef.current.isWarned = true;
                }
            }
        } else {
            // Reset if user looks back at screen
            stateRef.current.lastDistractionStart = null;
            stateRef.current.isWarned = false;
            attentionStatus = "Attentive";
        }

        // Output Decision to Global State/Context
        updateTracking({
            distractionTimer: timer,
            warningCount: stateRef.current.warningCount,
            attentionStatus: attentionStatus
        });

    }, [headStatus, isTracking, updateTracking]); // Re-evaluate whenever head status changes
};
