import React from 'react';

export const StatusBadge = ({ status, size = 'sm' }) => {
  let badgeStyles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotStyle = 'bg-slate-400';
  let label = status;

  switch (status) {
    case 'Completed':
    case 'completed':
      badgeStyles = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold';
      dotStyle = 'bg-emerald-500';
      label = 'Completed';
      break;
    case 'In Transit':
    case 'in_progress':
    case 'Active':
      badgeStyles = 'bg-sky-50 text-sky-800 border-sky-300 font-bold';
      dotStyle = 'bg-sky-500 animate-pulse';
      label = status === 'in_progress' ? 'In Progress' : status;
      break;
    case 'Booked':
    case 'Booking Confirmed':
    case 'Documentation':
    case 'Customs':
    case 'Arrived':
    case 'Delivery':
    case 'Gate-In':
    case 'Port Gate-In':
    case 'BL Draft Preparation':
      badgeStyles = 'bg-blue-50 text-blue-800 border-blue-300 font-semibold';
      dotStyle = 'bg-blue-500';
      label = status;
      break;
    case 'Pending':
    case 'pending':
    case 'Attention Required':
      badgeStyles = 'bg-amber-50 text-amber-800 border-amber-300 font-semibold';
      dotStyle = 'bg-amber-500';
      label = status === 'pending' ? 'Pending' : status;
      break;
    case 'Overdue':
    case 'overdue':
    case 'Delayed':
    case 'At Risk':
      badgeStyles = 'bg-rose-50 text-rose-800 border-rose-300 font-bold';
      dotStyle = 'bg-rose-600 animate-pulse';
      label = status === 'overdue' ? 'Overdue' : status;
      break;
    case 'On Hold':
      badgeStyles = 'bg-purple-50 text-purple-800 border-purple-300 font-semibold';
      dotStyle = 'bg-purple-500';
      label = 'On Hold';
      break;
    case 'New':
      badgeStyles = 'bg-indigo-50 text-indigo-800 border-indigo-300 font-semibold';
      dotStyle = 'bg-indigo-500';
      label = 'New';
      break;
    case 'not_started':
    case 'Not Started':
    case 'not_applicable':
      badgeStyles = 'bg-slate-100 text-slate-600 border-slate-200';
      dotStyle = 'bg-slate-400';
      label = status === 'not_applicable' ? 'N/A' : 'Not Started';
      break;
    default:
      badgeStyles = 'bg-slate-100 text-slate-700 border-slate-200';
      dotStyle = 'bg-slate-400';
      break;
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : (size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm');

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border ${padding} ${badgeStyles} whitespace-nowrap shadow-2xs`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
      {label}
    </span>
  );
};
