import React, { useState } from 'react';

/**
 * DonutDistributionChart - Native SVG Donut / Pie Chart Component
 * Perfect for part-to-whole operational distributions (Status, Health, Carrier Share).
 */
export default function DonutDistributionChart({
  title = "Shipment Operational Health Distribution",
  subtitle = "Proportion of active shipments by operational status",
  data = [],
  totalCount = 0,
  insight = null
}) {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  if (!data || data.length === 0) return null;

  const total = totalCount || data.reduce((acc, curr) => acc + (curr.value || curr.count || 0), 0);

  // Calculate arc angles for SVG donut
  let cumulativeAngle = 0;
  const slices = data.map((item, idx) => {
    const val = item.value || item.count || 0;
    const percentage = total > 0 ? (val / total) * 100 : 0;
    const angle = (percentage / 100) * 360;

    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    return {
      ...item,
      val,
      percentage: Math.round(percentage),
      startAngle,
      endAngle,
      idx
    };
  });

  // SVG Helper to describe arc paths
  const getArcPath = (startAngle, endAngle, innerRadius, outerRadius) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = 100 + outerRadius * Math.cos(startRad);
    const y1 = 100 + outerRadius * Math.sin(startRad);
    const x2 = 100 + outerRadius * Math.cos(endRad);
    const y2 = 100 + outerRadius * Math.sin(endRad);

    const x3 = 100 + innerRadius * Math.cos(endRad);
    const y3 = 100 + innerRadius * Math.sin(endRad);
    const x4 = 100 + innerRadius * Math.cos(startRad);
    const y4 = 100 + innerRadius * Math.sin(startRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  const activeSlice = hoveredSlice !== null ? slices[hoveredSlice] : slices[0];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          {title}
        </h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Donut Canvas */}
        <div className="relative flex justify-center items-center py-2">
          <svg viewBox="0 0 200 200" className="w-48 h-48 transform -rotate-90">
            {slices.map((slice, idx) => {
              const isHovered = hoveredSlice === idx;
              const path = getArcPath(
                slice.startAngle,
                slice.endAngle,
                55,
                isHovered ? 88 : 82
              );
              return (
                <path
                  key={idx}
                  d={path}
                  fill={slice.color || '#DC2626'}
                  className="transition-all duration-200 cursor-pointer hover:opacity-90"
                  onMouseEnter={() => setHoveredSlice(idx)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              );
            })}
          </svg>

          {/* Center Callout Metric */}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {activeSlice ? `${activeSlice.percentage}%` : '100%'}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              {activeSlice ? activeSlice.label || activeSlice.name : 'Total'}
            </span>
          </div>
        </div>

        {/* Breakdown Legend Table */}
        <div className="space-y-2 text-xs">
          {slices.map((slice, idx) => {
            const isHovered = hoveredSlice === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredSlice(idx)}
                onMouseLeave={() => setHoveredSlice(null)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all border ${
                  isHovered
                    ? 'bg-red-50 border-red-300 text-slate-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: slice.color || '#DC2626' }}
                  />
                  <span>{slice.label || slice.name}</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="font-bold text-slate-900">{slice.val}</span>
                  <span className="text-slate-500 w-10 text-right">{slice.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insight Footer */}
      {insight && (
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <span className="text-red-600 font-bold">📊 DISTRIBUTION INSIGHT:</span>
          <span>{insight}</span>
        </div>
      )}
    </div>
  );
}
