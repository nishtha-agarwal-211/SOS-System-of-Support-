interface ConsentDialogProps {
    onConsent: (allow: boolean) => void;
}

export const ConsentDialog = ({ onConsent }: ConsentDialogProps) => (
    <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 60,
    }}>
        <div style={{
            border: '1px solid #1a3a2a',
            backgroundColor: '#000',
            maxWidth: '32rem',
            width: '100%',
            padding: '24px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
            position: 'relative',
        }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: '#14532d' }}></div>

            <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#22c55e',
                marginBottom: '16px',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
            }}>
                &gt; SYSTEM NOTICE: PRIVACY
            </h2>

            <div style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', marginBottom: '32px' }}>
                <p style={{ marginBottom: '16px' }}>
                    This terminal operates <strong style={{ color: '#fff' }}>offline</strong>.
                    To enable <span style={{ color: '#f59e0b' }}>Favorites</span>, <span style={{ color: '#f59e0b' }}>History</span>, and <span style={{ color: '#f59e0b' }}>Reports</span>,
                    we store small amounts of data locally on your device.
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.75rem', borderLeft: '2px solid #14532d', paddingLeft: '12px' }}>
                    No personal data is ever sent to a server.
                    You remain anonymous.
                </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <button
                    onClick={() => onConsent(true)}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(20, 83, 45, 0.3)',
                        border: '1px solid #16a34a',
                        color: '#4ade80',
                        padding: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontFamily: 'inherit',
                        transition: 'background 0.2s',
                    }}
                >
                    [ Acknowledge &amp; Enable ]
                </button>
                <button
                    onClick={() => onConsent(false)}
                    style={{
                        padding: '12px 16px',
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        border: '1px solid transparent',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontFamily: 'inherit',
                        transition: 'color 0.2s, border-color 0.2s',
                    }}
                >
                    [ Disable Storage ]
                </button>
            </div>
        </div>
    </div>
);
