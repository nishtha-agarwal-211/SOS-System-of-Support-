import type { Resource } from '../data/resources';

interface AsciiMapProps {
    resources: Resource[];
    selectedId: string | null;
    userLocation: { x: number; y: number };
}

/**
 * Fix 6: Improved AsciiMap — positions are now scaled relative to the
 * actual coordinate range in the resource set, giving a more meaningful
 * spatial layout instead of a purely arbitrary grid.
 */
export const AsciiMap = ({ resources, selectedId, userLocation }: AsciiMapProps) => {
    const gridW = 20;
    const gridH = 10;

    // Collect all resource coordinates to derive the bounding box
    const coordResources = resources.filter(r => r.coordinates);

    // Compute min/max x and y across all resources (fallback to 0–10 range)
    let minX = 0, maxX = 10, minY = 0, maxY = 10;
    if (coordResources.length > 0) {
        minX = Math.min(...coordResources.map(r => r.coordinates!.x));
        maxX = Math.max(...coordResources.map(r => r.coordinates!.x));
        minY = Math.min(...coordResources.map(r => r.coordinates!.y));
        maxY = Math.max(...coordResources.map(r => r.coordinates!.y));
    }
    // Ensure there's always a spread of at least 1 to avoid division by zero
    const rangeX = Math.max(maxX - minX, 1);
    const rangeY = Math.max(maxY - minY, 1);

    // Map a resource coordinate to a grid cell
    const toGridX = (x: number) => Math.min(Math.floor(((x - minX) / rangeX) * (gridW - 1)), gridW - 1);
    const toGridY = (y: number) => Math.min(Math.floor(((y - minY) / rangeY) * (gridH - 1)), gridH - 1);

    const grid: string[][] = Array(gridH).fill(null).map(() => Array(gridW).fill(' '));

    // Place resources on the grid (selected resource overrides others at same cell)
    coordResources.forEach(r => {
        const gx = toGridX(r.coordinates!.x);
        const gy = toGridY(r.coordinates!.y);
        // Don't overwrite the selected marker
        if (grid[gy][gx] !== '●') {
            grid[gy][gx] = r.id === selectedId ? '●' : '▣';
        }
    });

    // Place user marker (clamp to grid range)
    const ux = toGridX(Math.max(minX, Math.min(userLocation.x, maxX)));
    const uy = toGridY(Math.max(minY, Math.min(userLocation.y, maxY)));
    // Only place user if not already occupied by selected resource
    if (grid[uy][ux] !== '●') {
        grid[uy][ux] = '@';
    }

    return (
        <div className="font-mono text-xs leading-none select-none bg-black p-2 border border-green-900 rounded inline-block">
            <div className="text-gray-500 mb-1 text-center border-b border-gray-800 pb-1">AREA SCAN</div>
            {grid.map((row, y) => (
                <div key={y} className="flex">
                    {row.map((cell, x) => (
                        <span key={x} className={`
                w-4 h-4 flex items-center justify-center
                ${cell === '●' ? 'text-amber-500 animate-pulse font-bold' : ''}
                ${cell === '▣' ? 'text-green-600' : ''}
                ${cell === '@' ? 'text-blue-400 font-bold' : ''}
                ${cell === ' ' ? 'text-gray-900' : ''}
             `}>{cell === ' ' ? '·' : cell}</span>
                    ))}
                </div>
            ))}
            <div className="mt-2 text-[10px] text-gray-500 flex justify-between px-2">
                <span>@ YOU</span>
                <span>▣ RES</span>
                <span>● SEL</span>
            </div>
        </div>
    );
};
