import { AsciiMap } from '../AsciiMap';
import { resources } from '../../data/resources';
import type { Resource } from '../../data/resources';
import { isOpenNow, getFreshnessIndicator } from '../../hooks/useResourceFilter';

interface ResourceDetailProps {
  resource: Resource;
  isFav: boolean;
  emergencyMode: boolean;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onShare: (r: Resource) => void;
  onReport: (name: string) => void;
  showNotification: (msg: string) => void;
}

const EmergencyBanner = () => (
  <div style={{
    backgroundColor: '#7f1d1d', color: '#fff', textAlign: 'center',
    padding: '8px 16px', borderTop: '2px solid #ef4444', borderBottom: '2px solid #ef4444',
  }}>
    <div style={{ fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase' }}>⚠ EMERGENCY MODE ACTIVE</div>
    <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>Showing nearest urgent-help resources first</div>
  </div>
);

export const ResourceDetail = ({
  resource, isFav, emergencyMode, onBack, onToggleFavorite, onShare, onReport, showNotification,
}: ResourceDetailProps) => {
  const isOpen = isOpenNow(resource.hours);

  const handleVolunteerSignup = () => {
    const msg = `Hi! I would like to volunteer for the "${resource.volunteer_info?.role}" position at ${resource.name}.\n\nMy name: _____\nContact: _____\n\nReaching out via: ${resource.volunteer_info?.contact}`;
    navigator.clipboard.writeText(msg).then(() => {
      showNotification('> Sign-up message copied! Send it to the contact.');
    }).catch(() => showNotification('Copy failed. Try manually.'));
  };

  return (
    <div className="h-full w-full flex justify-center items-center overflow-hidden p-4 md:p-8">
      <div className="w-full max-w-[95%] mx-auto flex flex-col h-full bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden relative shadow-2xl">
        {emergencyMode && <EmergencyBanner />}

        {/* Top Nav */}
        <div className="bg-slate-900/90 border-b border-gray-800 p-3 shrink-0 z-10 backdrop-blur flex justify-center items-center">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded transition-colors"
          >
            <span className="text-xs">◀</span> <span className="text-sm font-bold tracking-wider">BACK TO LIST</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="detail-container p-6 flex-1 overflow-auto custom-scrollbar">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 text-center md:text-left">{resource.name}</h1>
              <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                {isOpen
                  ? <span className="badge bg-green-900 text-green-300">OPEN NOW</span>
                  : resource.is_emergency
                    ? <span className="badge badge-alert">URGENT — Currently Closed</span>
                    : <span className="badge bg-red-900 text-red-300">CLOSED</span>
                }
                {isOpen && resource.is_emergency && <span className="badge badge-alert">EMERGENCY</span>}
                {resource.id.startsWith('local-') && <span className="badge badge-primary bg-blue-900 text-blue-300">USER ADDED</span>}
                {resource.name.startsWith('[Demo]') && <span className="badge badge-primary bg-purple-900 text-purple-300">DEMO DATA</span>}
                <span className="badge badge-muted uppercase">{resource.type}</span>
                {resource.languages.map(l => (
                  <span key={l} className="text-[10px] px-2 py-0.5 rounded border border-gray-700 text-gray-400">{l}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => onToggleFavorite(resource.id)}
                className={`text-xl font-bold ${isFav ? 'text-yellow-400' : 'text-gray-600 hover:text-amber-500'}`}
                style={isFav ? { color: '#facc15', textShadow: '0 0 10px rgba(250, 204, 21, 0.8)' } : {}}
              >
                {isFav ? '★ Saved' : '☆ Save'}
              </button>
              {resource.verified_by && (
                <div className="badge badge-muted bg-teal-900/30 text-teal-400 border border-teal-800">
                  ✓ VERIFIED BY {resource.verified_by.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="detail-grid grid grid-cols-2 gap-8">
            {/* Left Col */}
            <div className="space-y-6">
              <div className="card bg-slate-900/50 p-4 border-gray-800">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 text-teal-500 text-center">Actions</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <a href={`tel:${resource.phone}`} className="badge badge-primary justify-center py-3 text-sm hover:brightness-125 no-underline">
                    📞 CALL
                  </a>
                  <button
                    onClick={() => { navigator.clipboard.writeText(resource.address); showNotification('Address copied'); }}
                    className="badge badge-muted justify-center py-3 text-sm hover:bg-slate-700"
                  >
                    📋 COPY ADDR
                  </button>
                </div>
                <button
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(resource.address)}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full badge badge-muted justify-center py-2 text-sm hover:bg-slate-700 mb-2"
                >
                  🗺️ GET DIRECTIONS
                </button>
                <button
                  onClick={() => onShare(resource)}
                  className="w-full badge badge-muted justify-center py-2 text-sm hover:bg-slate-700"
                >
                  📤 SHARE RESOURCE
                </button>
              </div>

              <div className="card bg-slate-900/50 p-4 border-gray-800">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 text-center">Location &amp; Contact</h3>
                <div className="mb-4">
                  <AsciiMap resources={resources} selectedId={resource.id} userLocation={{ x: 5, y: 5 }} />
                </div>
                <div className="text-base text-gray-200 mb-2 text-center">{resource.address}</div>
                <div className="text-xl text-teal-400 font-mono mb-2 text-center">{resource.phone}</div>
              </div>

              <div className="card bg-slate-900/50 p-4 border-gray-800">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 text-center">Status</h3>
                <p className="mb-2 text-center"><span className="text-gray-400">Hours:</span> {resource.hours}</p>
                <p className="mb-2 text-center"><span className="text-gray-400">Capacity:</span> {resource.capacity_status || 'Unknown'}</p>
                {resource.last_updated && (() => {
                  const f = getFreshnessIndicator(resource.last_updated);
                  return (
                    <p className="mb-2 text-center text-xs" title={f.label}>
                      <span className="text-gray-400">Last verified:</span>{' '}
                      <span style={{ color: f.color }}>{f.emoji} {resource.last_updated}</span>
                    </p>
                  );
                })()}
              </div>
            </div>

            {/* Right Col */}
            <div className="space-y-6">
              <div className="card bg-slate-900/50 p-4 border-gray-800 h-full flex flex-col">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 text-teal-500 text-center">Services Provided</h3>
                <ul className="space-y-2 mb-6 list-none" style={{ paddingLeft: 0, textAlign: 'center', listStyle: 'none' }}>
                  {resource.services.map(s => (
                    <li key={s} className="text-gray-300" style={{ textAlign: 'center', listStyleType: 'none' }}>
                      › {s}
                    </li>
                  ))}
                </ul>

                <div className="card bg-slate-900/50 p-4 border-gray-800">
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 text-teal-500 text-center">Eligibility</h3>
                  <p className="text-gray-400 text-sm mb-6 text-center">{resource.eligibility || 'Open to all.'}</p>

                  {resource.micro_guide && (
                    <div className="pro-guide-box">
                      <div className="pro-guide-header">💡 PRO GUIDE</div>
                      <div className="pro-guide-content">{resource.micro_guide}</div>
                    </div>
                  )}

                  {/* Feature 9: Volunteer sign-up flow */}
                  {resource.volunteer_info && (
                    <div className="mb-6 p-3 border border-dashed border-gray-600 rounded bg-slate-900/80">
                      <h3 className="text-xs font-bold text-amber-500 uppercase mb-2 text-center">🤝 Help This Cause</h3>
                      <p className="text-sm text-gray-300 mb-1 text-center">
                        Volunteers needed: <span className="text-white">{resource.volunteer_info.role}</span>
                      </p>
                      <p className="text-xs text-gray-400 text-center mb-3">Contact: {resource.volunteer_info.contact}</p>
                      {resource.donation_info && (
                        <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-green-400 mb-3">
                          Donation: {resource.donation_info}
                        </div>
                      )}
                      {/* New: One-click volunteer sign-up message generator */}
                      <button
                        onClick={handleVolunteerSignup}
                        className="w-full py-2 px-3 rounded text-xs font-bold uppercase tracking-wider border border-amber-600 text-amber-400 hover:bg-amber-900/30 transition-colors"
                      >
                        📋 Generate Sign-Up Message
                      </button>
                    </div>
                  )}

                  <div className="mt-auto pt-6 border-t border-gray-800">
                    <button onClick={() => onReport(resource.name)} className="text-xs text-red-400 hover:text-red-300 underline">
                      ⚠ Report Issue / Suggest Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-600 flex justify-between items-center mt-8 pt-4 border-t border-gray-800 opacity-50 col-span-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 blink"></span>
                <span>OFFLINE MODE: ON</span>
              </div>
              <div>DATA: DEC 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
