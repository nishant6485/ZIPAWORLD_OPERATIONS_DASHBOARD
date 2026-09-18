import React from 'react';

export const KpiCard = ({
  title,
  value,
  subtitle,
  trend,
  trendType = 'neutral',
  icon: Icon,
  iconBgColor = 'bg-sky-50',
  iconTextColor = 'text-sky-600',
  borderColor = 'hover:border-sky-400',
  onClick,
  isActive = false,
  percentage,
  explanation
}) => {
  let trendColor = 'text-slate-500';
  if (trendType === 'up') trendColor = 'text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold';
  if (trendType === 'danger') trendColor = 'text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-bold';
  if (trendType === 'warning') trendColor = 'text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border p-4 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${borderColor} ${
        isActive ? 'ring-2 ring-sky-600 border-sky-600 bg-sky-50/20' : 'border-slate-200/90'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
            {title}
          </span>
          {Icon && (
            <div className={`p-2 rounded-lg ${iconBgColor} ${iconTextColor} shrink-0`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="mt-2.5 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900 font-mono">
              {value}
            </span>
            {percentage !== undefined && percentage !== null && (
              <span className="text-xs font-bold text-slate-500">
                ({percentage}%)
              </span>
            )}
          </div>
          {trend && (
            <span className={`text-[11px] ${trendColor}`}>
              {trend}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-600 font-medium truncate">
            {subtitle}
          </p>
        )}
      </div>

      {explanation && (
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0"></span>
          <span className="italic truncate">{explanation}</span>
        </div>
      )}
    </div>
  );
};
