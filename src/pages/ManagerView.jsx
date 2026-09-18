import React from 'react';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { ShipmentTable } from '../components/ShipmentTable';
import { DonutDistributionChart, HorizontalBarChart } from '../components/charts';
import { Users, Ship, Plane, Layers, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export function ManagerView() {
  const { stats, currentUser } = useOperations();

  const modeDonutData = [
    { name: 'Ocean Freight', value: stats.oceanCount, color: '#0284C7' },
    { name: 'Air Freight', value: stats.airCount, color: '#0D9488' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <Users className="w-5 h-5 text-red-500" />
            <span>Operations Manager Control View</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Departmental operational oversight, team workload distribution, and mode performance.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-xs font-bold text-slate-200">
          Departmental Scope: All Operational Teams
        </div>
      </div>

      <FilterBar />

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">Department Active Shipments</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.activeShipments}</div>
          <div className="text-[10px] text-slate-500 mt-1">Ocean: {stats.oceanCount} • Air: {stats.airCount}</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">Department On-Time Rate</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{stats.onTimeRate}%</div>
          <div className="text-[10px] text-slate-500 mt-1">{stats.delayedShipments} Delayed Shipments</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">Department Tasks Pending</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{stats.pendingTasks}</div>
          <div className="text-[10px] text-red-600 mt-1">{stats.overdueTasks} Overdue Tasks</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">Department Doc Clearance</div>
          <div className="text-2xl font-black text-red-600 mt-1">{stats.docCompletionRate}%</div>
          <div className="text-[10px] text-slate-500 mt-1">{stats.pendingDocs} Pending Docs</div>
        </div>
      </div>

      {/* Team Load Grid */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-red-600" />
          <span>Executive Workload & On-Time Performance</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {stats.teamWorkload.map((exec, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{exec.name}</div>
                  <div className="text-[10px] text-slate-500">{exec.role}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {exec.onTimeRate}% On-Time
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-700">
                <span>Active: <strong className="text-red-600">{exec.active}</strong></span>
                <span>Completed: <strong className="text-emerald-600">{exec.completed}</strong></span>
                <span>Delayed: <strong className="text-red-600">{exec.delayed}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ShipmentTable title="Department Operational Directory" />

    </div>
  );
}
