import { types, type ResourceType } from '../data/resources';

interface SidebarProps {
    selectedType: ResourceType | null;
    onSelect: (type: ResourceType) => void;
    isFocused: boolean;
}

export const Sidebar = ({ selectedType, onSelect, isFocused }: SidebarProps) => {
    return (
        <div className={`flex flex-col gap-2 p-3 border-r h-full w-full transition-all ${isFocused ? 'border-r-2 border-r-teal-400 shadow-[4px_0_20px_rgba(6,214,160,0.2)]' : 'border-r border-gray-700/50'}`} style={{ background: 'linear-gradient(180deg, rgba(26, 31, 53, 0.5), rgba(26, 31, 53, 0.3))' }}>
            <div className="text-xs text-white mb-2 uppercase tracking-widest px-2 flex items-center gap-2" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)' }}>
                <span style={{ color: 'var(--accent-primary)' }}>◆</span> Categories {isFocused && <span className="blink" style={{ color: 'var(--accent-primary)' }}>_</span>}
            </div>
            {types.map((t) => (
                <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className="font-mono text-sm uppercase font-bold flex items-center relative"
                    style={selectedType === t.id ? {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        width: '100%',
                        padding: '0.75rem 0.75rem 0.75rem 0.625rem',
                        textAlign: 'left',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.13), rgba(6, 214, 160, 0.05))',
                        border: '1px solid rgba(6, 214, 160, 0.28)',
                        borderLeft: isFocused ? '4px solid #06d6a0' : '4px solid rgba(6, 214, 160, 0.45)',
                        boxShadow: isFocused
                            ? '0 4px 20px rgba(6, 214, 160, 0.25), -2px 0 12px rgba(6, 214, 160, 0.35)'
                            : '0 2px 8px rgba(6, 214, 160, 0.08)',
                        color: '#ffffff',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)',
                        transition: 'all 0.2s ease',
                    } : {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        width: '100%',
                        padding: '0.75rem 0.75rem 0.75rem 0.625rem',
                        textAlign: 'left',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(61, 74, 110, 0.3)',
                        borderLeft: '4px solid transparent',
                        boxShadow: 'none',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <span className="text-xl transition-transform duration-300 hover:scale-110" style={selectedType === t.id ? { filter: 'drop-shadow(0 0 8px rgba(6, 214, 160, 0.6))' } : {}}>{t.icon}</span>
                    <span>{t.label}</span>
                </button>
            ))}
            <div className="mt-auto text-[10px] text-gray-500 px-2 pt-4 border-t border-gray-800/50">
                Use ↑ ↓ to navigate
            </div>
        </div>
    );
};
