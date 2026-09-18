import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, Clock } from 'lucide-react';

export const HealthBadge = ({ health }) => {
  switch (health) {
    case 'Healthy':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          HEALTHY
        </span>
      );
    case 'Attention Required':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          ATTENTION REQUIRED
        </span>
      );
    case 'At Risk':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-900 border border-orange-300">
          <Clock className="w-3.5 h-3.5 text-orange-600" />
          AT RISK
        </span>
      );
    case 'Delayed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300 animate-pulse">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          DELAYED
        </span>
      );
    default:
      return null;
  }
};
