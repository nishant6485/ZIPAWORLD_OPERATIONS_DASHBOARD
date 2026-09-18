import React from 'react';

/**
 * MilestoneCycleTimeChart - Milestone Average Processing Time Component
 * Displays average cycle times (in days) between workflow milestones and highlights the longest stage.
 */
export default function MilestoneCycleTimeChart({
  title = "Average Milestone Processing Time (Cycle Times)",
  subtitle = "Average time in days spent between operational workflow milestones",
  data = [],
  insight = null
}) {
  if (!data || data.length === 0) return null;

  const maxDays = Math.max(...data.map(d => d.days), 5);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-md">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
          {title}
        </h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      {/* Cycle Time Bar List */}
      <div className="space-y-3">
        {data.map((item, idx) => {
          const widthPct = Math.min((item.days / maxDays) * 100, 100);
          const isLongest = item.isLongest || idx === 3;

          return (
            <div key={idx} className="group">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                  {isLongest && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wider">
                      LONGEST STAGE
                    </span>
                  )}
                  {item.milestone}
                </span>
                <span className="font-mono font-bold text-slate-300">
                  {item.days} days <span className="text-[10px] text-slate-400 font-normal">(Target: {item.target}d)</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800/80 rounded-full h-3 p-0.5 overflow-hidden border border-slate-700/50">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isLongest
                      ? 'bg-gradient-to-r from-red-600 to-amber-500 shadow-md shadow-red-500/20'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-500'
                  }`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight Footer */}
      {insight && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-300 bg-purple-950/20 p-2.5 rounded-lg border border-purple-500/20">
          <span className="text-purple-400 font-bold">⏱️ CYCLE TIME INSIGHT:</span>
          <span>{insight}</span>
        </div>
      )}
    </div>
  );
}
