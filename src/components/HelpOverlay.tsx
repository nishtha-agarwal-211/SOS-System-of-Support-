/**
 * HelpOverlay — keyboard shortcut reference panel.
 * Shown when the user presses '?' or '/' in the console view.
 */
export const HelpOverlay = () => (
    <div style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
    }}>
        <div style={{
            border: '3px double #22c55e',
            padding: '32px',
            width: '100%',
            maxWidth: '44rem',
            backgroundColor: '#000',
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.15)',
        }}>
            <h2 style={{
                fontSize: '1.5rem',
                color: '#f59e0b',
                fontWeight: 'bold',
                marginBottom: '24px',
                borderBottom: '1px solid #14532d',
                paddingBottom: '8px',
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
            }}>
                AVAILABLE COMMANDS
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                color: '#86efac',
                fontFamily: 'monospace',
                fontSize: '1rem',
            }}>
                {/* Navigation column */}
                <div>
                    <h3 style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.15em' }}>
                        Navigation
                    </h3>
                    {[
                        ['↑ ↓ → ←', 'Navigate'],
                        ['Tab', 'Switch Area'],
                        ['Enter', 'Select'],
                        ['Esc', 'Go Back'],
                    ].map(([key, desc]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: '#f0f4f8' }}>{key}</span>
                            <span style={{ color: '#6b7280' }}>{desc}</span>
                        </div>
                    ))}
                </div>

                {/* Actions column */}
                <div>
                    <h3 style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.15em' }}>
                        Actions
                    </h3>
                    {[
                        ["Type 'text'", 'Search'],
                        ['O', 'Toggle Open Now'],
                        ['F', 'Favorite Resource'],
                        ['!', 'Emergency Mode'],
                        ['Shift+C', 'CLI Mode'],
                    ].map(([key, desc]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: '#f0f4f8' }}>{key}</span>
                            <span style={{ color: '#6b7280' }}>{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="blink" style={{
                marginTop: '28px',
                textAlign: 'center',
                color: '#6b7280',
                borderTop: '1px solid #14532d',
                paddingTop: '14px',
                fontSize: '0.9rem',
            }}>
                Press <span style={{ color: '#06d6a0' }}>Esc</span> to close
            </div>
        </div>
    </div>
);
