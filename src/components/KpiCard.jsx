import React from 'react';

export const KpiCard = ({
  title,
  value,
  subtitle,
  trend,
  trendType = 'neutral',
  icon: Icon,
  iconBgColor = 'bg-blue-50',
  iconTextColor = 'text-blue-600',
  borderColor = 'hover:border-blue-400',
  onClick,
  isActive = false,
  percentage,
  explanation
}) => {
  let trendColor = 'text-slate-500 bg-slate-100';
  if (trendType === 'up') trendColor = 'text-emerald-700 bg-emerald-50 border border-emerald-200 font-semibold';
  if (trendType === 'danger') trendColor = 'text-rose-700 bg-rose-50 border border-rose-200 font-semibold';
  if (trendType === 'warning') trendColor = 'text-amber-700 bg-amber-50 border border-amber-200 font-semibold';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border p-4 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between min-w-0 ${borderColor} ${
        isActive ? 'ring-2 ring-blue-600 border-blue-600 bg-blue-50/20' : 'border-slate-200'
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
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${trendColor}`}>
              {trend}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-500 font-medium truncate">
            {subtitle}
          </p>
        )}
      </div>

      {explanation && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
          <span className="italic truncate">{explanation}</span>
        </div>
      )}
    </div>
  );
};


