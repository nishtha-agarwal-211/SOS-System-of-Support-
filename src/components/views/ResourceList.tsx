import type { Resource } from '../../data/resources';
import { isOpenNow, getFreshnessIndicator } from '../../hooks/useResourceFilter';
import type { TransportMode } from '../../hooks/useResourceFilter';

type FocusArea = 'SIDEBAR' | 'CONTENT';

interface ResourceListProps {
  filteredResources: Resource[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  focusArea: FocusArea;
  setFocusArea: (a: FocusArea) => void;
  transportMode: TransportMode;
  cardRefs: React.RefObject<Map<number, HTMLDivElement>>;
  onSelectResource: (r: Resource, i: number) => void;
}

export const ResourceList = ({
  filteredResources,
  selectedIndex,
  setSelectedIndex,
  focusArea,
  setFocusArea,
  transportMode,
  cardRefs,
  onSelectResource,
}: ResourceListProps) => {

  if (filteredResources.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 space-y-4">
        <div className="text-4xl opacity-20">∅</div>
        <div className="text-lg font-bold">No resources found</div>
        <div className="text-sm opacity-60 max-w-xs text-center">
          Try adjusting filters, switching cities, or describing what you need (e.g. "I need food").
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {filteredResources.map((r, i) => {
        const isSelected = i === selectedIndex && focusArea === 'CONTENT';
        const open = isOpenNow(r.hours);
        const transportTime = r.transport_estimates ? r.transport_estimates[transportMode] : 'N/A';
        const freshness = getFreshnessIndicator(r.last_updated);

        return (
          <div
            key={r.id}
            ref={(el) => { if (el) cardRefs.current.set(i, el); else cardRefs.current.delete(i); }}
            className={`
              card p-4 cursor-pointer flex justify-between items-center transition-all
              ${isSelected ? 'active shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_30px_rgba(6,214,160,0.3)]' : 'hover:shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(6,214,160,0.15)]'}
              ${r.priority === 'High' ? 'border-l-4 border-l-pink-500 shadow-[0_0_15px_rgba(255,0,110,0.2)]' : ''}
            `}
            onClick={() => {
              setSelectedIndex(i);
              setFocusArea('CONTENT');
              onSelectResource(r, i);
            }}
          >
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span
                  className={`text-lg font-bold ${isSelected ? 'text-teal-300' : 'text-gray-200'}`}
                  style={isSelected ? { textShadow: '0 0 10px rgba(6, 214, 160, 0.5)' } : {}}
                >
                  {r.name}
                </span>
                <span title={freshness.label} style={{ cursor: 'default', fontSize: '0.65rem' }}>{freshness.emoji}</span>
              </div>

              <div className="flex gap-2 items-center mb-2">
                {open
                  ? <span className="text-[9px] text-green-300 border border-green-700 bg-green-900/30 px-1.5 py-0.5 rounded uppercase">Open</span>
                  : r.is_emergency
                    ? <span className="text-[9px] text-pink-300 border border-pink-800 bg-pink-900/30 px-1.5 py-0.5 rounded uppercase">URGENT — Currently Closed</span>
                    : <span className="text-[9px] text-red-300 border border-red-800 bg-red-900/30 px-1.5 py-0.5 rounded uppercase">Closed</span>
                }
                {open && r.is_emergency && (
                  <span className="text-[9px] text-pink-300 border border-pink-700 bg-pink-900/30 px-1.5 py-0.5 rounded uppercase">Urgent</span>
                )}
                {r.capacity_status && (
                  <span className="text-[9px] text-teal-300 border border-teal-700 bg-teal-900/30 px-1.5 py-0.5 rounded uppercase">{r.capacity_status}</span>
                )}
              </div>

              <div className="flex gap-4 text-sm text-gray-400">
                <span>{r.address.split(',')[0]}</span>
                <span className="text-gray-600">|</span>
                <span className="flex items-center gap-1">
                  {transportMode === 'walking' ? '🚶' : transportMode === 'bus' ? '🚌' : '🚗'} {transportTime}
                </span>
              </div>
            </div>

            <div className="text-right text-sm text-gray-400">
              <div className="font-mono">{r.phone}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
