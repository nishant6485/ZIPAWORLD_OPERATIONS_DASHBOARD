import React from 'react';

/**
 * HorizontalBarChart - Responsive SVG / Tailwind Horizontal Bar Component
 * Ideal for ranking categories (Bottlenecks, Delay Causes, Executive Workloads, Ports, Customers).
 */
export default function HorizontalBarChart({
  title = "Operational Bottlenecks Analysis",
  subtitle = "Shipments currently waiting at each workflow stage",
  data = [],
  dataKey = "count",
  labelKey = "stage",
  badgeKey = null,
  highlightTop = true,
  barColor = "#DC2626",
  maxVal = null,
  insight = null,
  unit = "shipments"
}) {
  if (!data || data.length === 0) return null;

  const highestValue = maxVal || Math.max(...data.map(d => d[dataKey] || 0), 1);

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

      {/* Bar List */}
      <div className="space-y-3.5">
        {data.map((item, index) => {
          const val = item[dataKey] || 0;
          const pct = Math.min(Math.round((val / highestValue) * 100), 100);
          const isTop = highlightTop && index === 0;

          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  {isTop && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider">
                      PRIMARY BOTTLENECK
                    </span>
                  )}
                  {item[labelKey]}
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {val} <span className="text-[11px] font-normal text-slate-500">{unit}</span>
                  {item.percentage ? ` (${item.percentage}%)` : item.percent ? ` (${item.percent}%)` : ''}
                </span>
              </div>

              {/* Bar track */}
              <div className="w-full bg-slate-100 rounded-full h-3 p-0.5 overflow-hidden border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isTop
                      ? 'bg-red-600 shadow-xs'
                      : 'bg-slate-700'
                    }`}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: !isTop && item.color ? item.color : undefined
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Plain English Insight Callout */}
      {insight && (
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
          <span className="text-amber-700 font-bold">⚠️ BOTTLENECK INSIGHT:</span>
          <span>{insight}</span>
        </div>
      )}
    </div>
  );
}
