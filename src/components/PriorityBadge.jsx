import React from 'react';

export const PriorityBadge = ({ priority }) => {
  let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  switch (priority) {
    case 'Critical':
      colorClass = 'bg-rose-100 text-rose-900 border-rose-300 font-bold';
      dotColor = 'bg-rose-600 animate-pulse';
      break;
    case 'High':
      colorClass = 'bg-amber-100 text-amber-900 border-amber-300 font-semibold';
      dotColor = 'bg-amber-600';
      break;
    case 'Medium':
      colorClass = 'bg-sky-50 text-sky-800 border-sky-300 font-medium';
      dotColor = 'bg-sky-500';
      break;
    case 'Low':
      colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
      dotColor = 'bg-slate-400';
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs border ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {priority}
    </span>
  );
};
