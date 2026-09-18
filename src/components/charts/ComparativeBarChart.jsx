import React from 'react';

/**
 * ComparativeBarChart - Grouped Side-by-Side Comparison Component
 * Compares Export vs Import across operational metrics (Volume, Completion %, Delay %, Processing Time).
 */
export default function ComparativeBarChart({
  title = "Import vs Export Operational Comparison",
  subtitle = "Comparative performance breakdown between Export and Import shipments",
  stats = {},
  insight = null
}) {
  const metrics = [
    { label: 'Shipment Volume', exportVal: stats.exportShipments || 0, importVal: stats.importShipments || 0, unit: 'shipments', max: 100 },
    { label: 'Completion Rate', exportVal: stats.exportCompletionRate || 0, importVal: stats.importCompletionRate || 0, unit: '%', max: 100 },
    { label: 'On-Time Rate', exportVal: stats.exportOnTimeRate || 0, importVal: stats.importOnTimeRate || 0, unit: '%', max: 100 },
    { label: 'Active Delayed', exportVal: stats.exportDelayed || 0, importVal: stats.importDelayed || 0, unit: 'shipments', max: 20 },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            {title}
          </h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-600" />
            <span className="text-slate-800">EXPORT ({stats.exportShipments || 0})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500" />
            <span className="text-slate-800">IMPORT ({stats.importShipments || 0})</span>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-4">
        {metrics.map((m, idx) => {
          const exportPct = Math.min((m.exportVal / m.max) * 100, 100);
          const importPct = Math.min((m.importVal / m.max) * 100, 100);

          return (
            <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-2">
                <span>{m.label}</span>
                <div className="font-mono space-x-3 text-xs">
                  <span className="text-emerald-700 font-bold">EXPORT: {m.exportVal}{m.unit}</span>
                  <span className="text-amber-700 font-bold">IMPORT: {m.importVal}{m.unit}</span>
                </div>
              </div>

              {/* Grouped Bars */}
              <div className="space-y-1.5">
                {/* Export Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${exportPct}%` }}
                  />
                </div>
                {/* Import Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden flex">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${importPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight Footer */}
      {insight && (
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <span className="text-blue-600 font-bold">⚖️ COMPARATIVE INSIGHT:</span>
          <span>{insight}</span>
        </div>
      )}
    </div>
  );
}

