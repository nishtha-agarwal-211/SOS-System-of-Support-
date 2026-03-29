/**
 * NotificationBanner — transient top-of-screen status message.
 * Renders nothing when message is null.
 */
interface NotificationBannerProps {
    message: string | null;
}

export const NotificationBanner = ({ message }: NotificationBannerProps) => {
    if (!message) return null;
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#14532d',
            color: '#dcfce7',
            textAlign: 'center',
            padding: '8px 16px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            borderBottom: '1px solid #22c55e',
            zIndex: 40,
            letterSpacing: '0.05em',
        }}>
            &gt; {message}
        </div>
    );
};
