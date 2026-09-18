import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { AlertTriangle, CheckCircle2, ShieldAlert, Clock } from 'lucide-react';

export function Alerts() {
  const { alerts, resolveAlert, setSideDrawerShipmentId } = useOperations();
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const filteredAlerts = severityFilter === 'ALL'
    ? alerts
    : alerts.filter(a => a.severity === severityFilter);

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border border-slate-800 border-l-4 border-l-teal-500 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-teal-400" />
            <span>Operational Alerts & Exception Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time exception alerts for vessel/flight delays, documentation cutoffs, customs holds, and overdue DOs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs overflow-x-auto whitespace-nowrap scrollbar-none max-w-full">
          {['ALL', 'Critical', 'High', 'Medium'].map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded font-bold transition-all shrink-0 ${
                severityFilter === sev ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <FilterBar />

      {/* Alerts Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-800 font-bold text-xs text-white bg-slate-950">
          Open Exception Alerts ({filteredAlerts.filter(a => a.status === 'Open').length})
        </div>

        <div className="divide-y divide-slate-800">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">No alerts match current filter.</div>
          ) : (
            filteredAlerts.map(alt => {
              const isResolved = alt.status === 'Resolved';
              const isCritical = alt.severity === 'Critical';

              return (
                <div key={alt.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCritical ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {alt.severity}
                      </span>
                      <span className="font-mono text-slate-400 text-[10px]">{alt.category}</span>
                      <span 
                        onClick={() => setSideDrawerShipmentId(alt.shipmentId)} 
                        className="text-teal-400 font-bold hover:underline cursor-pointer"
                      >
                        {alt.shipmentId}
                      </span>
                    </div>

                    <h4 className={`font-bold ${isResolved ? 'line-through text-slate-500' : 'text-white'}`}>
                      {alt.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">{alt.message}</p>

                    <div className="text-[10px] text-slate-400 pt-1">
                      Assigned: <strong className="text-slate-200">{alt.assignedTo}</strong> • {alt.timestamp}
                    </div>
                  </div>

                  <div className="shrink-0">
                    {!isResolved ? (
                      <button
                        onClick={() => resolveAlert(alt.id)}
                        className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded transition-all shadow-xs"
                      >
                        Resolve Alert
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Resolved
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
