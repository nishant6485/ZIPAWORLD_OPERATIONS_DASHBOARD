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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Operational Alerts & Exception Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time exception alerts for vessel/flight delays, documentation cutoffs, customs holds, and overdue DOs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {['ALL', 'Critical', 'High', 'Medium'].map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded font-bold transition-all ${
                severityFilter === sev ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <FilterBar />

      {/* Alerts Queue */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 font-bold text-xs text-slate-900 bg-slate-50">
          Open Exception Alerts ({filteredAlerts.filter(a => a.status === 'Open').length})
        </div>

        <div className="divide-y divide-slate-200">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">No alerts match current filter.</div>
          ) : (
            filteredAlerts.map(alt => {
              const isResolved = alt.status === 'Resolved';
              const isCritical = alt.severity === 'Critical';

              return (
                <div key={alt.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCritical ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {alt.severity}
                      </span>
                      <span className="font-mono text-slate-500 text-[10px]">{alt.category}</span>
                      <span 
                        onClick={() => setSideDrawerShipmentId(alt.shipmentId)} 
                        className="text-red-600 font-bold hover:underline cursor-pointer"
                      >
                        {alt.shipmentId}
                      </span>
                    </div>

                    <h4 className={`font-bold ${isResolved ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {alt.title}
                    </h4>
                    <p className="text-[11px] text-slate-600">{alt.message}</p>

                    <div className="text-[10px] text-slate-500 pt-1">
                      Assigned: <strong className="text-slate-800">{alt.assignedTo}</strong> • {alt.timestamp}
                    </div>
                  </div>

                  <div>
                    {!isResolved ? (
                      <button
                        onClick={() => resolveAlert(alt.id)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-all shadow-xs"
                      >
                        Resolve Alert
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
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
