import styles from './Dashboard.module.css';
import { useTracking } from '../../context/TrackingContext';
import { useAttentionTracking } from '../../hooks/useAttentionTracking';
import CameraPanel from '../Panels/CameraPanel';
import VoicePanel from '../Panels/VoicePanel';
import StatusPanel from '../Panels/StatusPanel';
import ActionPanel from './ActionPanel';
import AttentionPanel from '../Panels/AttentionPanel';

const Dashboard = () => {
    const { trackingState } = useTracking();
    const { headStatus, attentionScore, isTracking, warningCount, distractionTimer, attentionStatus } = trackingState;

    // Initialize AI Attention Logic
    useAttentionTracking();

    return (
        <div className={styles.dashboard}>
            <div className={styles.headerSection}>
                <h1 className={styles.title}>Session 3B: Advanced Algorithms</h1>
                <p className={styles.subtitle}>
                    {attentionStatus === 'Not Attentive' ?
                        <span className={styles.alertText}>Alert: Please return focus to the screen!</span> :
                        "Head tracking active. Please maintain focus on the screen."
                    }
                </p>
            </div>

            {/* Main Application Grid */}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                <CameraPanel />

                {/* Control Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <VoicePanel />
                    <ActionPanel />
                </div>
            </div>

            {/* Metrics & Monitoring Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', alignContent: 'start', marginTop: '24px' }}>
                <StatusPanel
                    title="Head Movement"
                    value={headStatus}
                    status={
                        headStatus === 'Face Not Detected' ? 'danger' :
                            (headStatus === 'Facing Screen' ? 'success' : 'warning')
                    }
                    label={headStatus === 'Face Not Detected' ? 'Face Not Detected' : 'Real-time Orientation'}
                />

                <AttentionPanel />
            </div>
        </div>
    );
};

export default Dashboard;
