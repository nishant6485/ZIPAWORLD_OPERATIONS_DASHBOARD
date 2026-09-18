import React from 'react';

/**
 * InsightCard - Plain-English Business Insight Callout Card
 * Displays contextual operational findings with type-based styling.
 */
export default function InsightCard({
  title = "OPERATIONAL INSIGHT",
  metric = "",
  description = "",
  type = "neutral",
  icon = "💡"
}) {
  const typeStyles = {
    positive: 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300',
    warning: 'bg-amber-950/30 border-amber-500/30 text-amber-300',
    delay: 'bg-red-950/30 border-red-500/30 text-red-300',
    improving: 'bg-cyan-950/30 border-cyan-500/30 text-cyan-300',
    neutral: 'bg-slate-900 border-slate-800 text-slate-300',
  };

  const styleClass = typeStyles[type] || typeStyles.neutral;

  return (
    <div className={`p-4 rounded-xl border backdrop-blur-md shadow-md ${styleClass} transition-all hover:border-slate-700`}>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        {metric && (
          <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-950/60 border border-current">
            {metric}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
}
