import React from 'react';

/**
 * FunnelLifecycleChart - 12-Stage Operational Lifecycle Conversion Funnel Component
 * Displays shipment progress through each operational stage and identifies conversion drop-offs.
 */
export default function FunnelLifecycleChart({
  title = "12-Stage Shipment Lifecycle Conversion Funnel",
  subtitle = "Progression and conversion rates across operational workflow milestones",
  data = [],
  insight = null
}) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-md">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          {title}
        </h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      {/* Funnel Stages */}
      <div className="space-y-2">
        {data.map((stage, idx) => {
          const widthPct = Math.max(stage.percent || 10, 15);
          const isFinal = idx === data.length - 1;

          return (
            <div key={idx} className="relative flex items-center gap-3 text-xs">
              {/* Stage Step Number */}
              <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-cyan-400 text-[11px] flex-shrink-0">
                {idx + 1}
              </div>

              {/* Stage Label */}
              <div className="w-36 font-semibold text-slate-200 truncate flex-shrink-0" title={stage.stage}>
                {stage.stage}
              </div>

              {/* Progressive Width Funnel Bar */}
              <div className="flex-1 bg-slate-950/60 rounded-lg h-7 p-1 overflow-hidden border border-slate-800/80 flex items-center">
                <div
                  className={`h-full rounded-md flex items-center justify-between px-2.5 transition-all duration-500 ${
                    isFinal
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium'
                  }`}
                  style={{ width: `${widthPct}%` }}
                >
                  <span className="font-mono text-xs font-bold whitespace-nowrap drop-shadow">
                    {stage.count} shipments
                  </span>
                </div>
              </div>

              {/* Conversion Stats */}
              <div className="w-28 text-right font-mono text-xs flex flex-col justify-center flex-shrink-0">
                <span className="font-bold text-slate-100">{stage.percent}%</span>
                {stage.dropoff > 0 && (
                  <span className="text-[10px] text-amber-400 font-normal">
                    -{stage.dropoff}% drop
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight Footer */}
      {insight && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
          <span className="text-cyan-400 font-bold">🔻 FUNNEL INSIGHT:</span>
          <span>{insight}</span>
        </div>
      )}
    </div>
  );
}
