import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { ShipmentTable } from '../components/ShipmentTable';
import { Plane, ArrowUpRight, AlertTriangle, Clock, FileText, Filter } from 'lucide-react';

export function AirExport() {
  const { shipments } = useOperations();

  const allAirExport = shipments.filter(s => s.mode === 'Air' && s.direction === 'Export');

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [assignedFilter, setAssignedFilter] = useState('ALL');
  const [metricFilter, setMetricFilter] = useState(null);
  const [showAllShipments, setShowAllShipments] = useState(false);

  const activeCount = allAirExport.filter(s => s.currentStatus !== 'Delivered').length;
  const attentionCount = allAirExport.filter(s => s.health === 'Delayed' || s.health === 'Attention Required' || s.health === 'At Risk').length;
  const dueTodayCount = allAirExport.filter(s => s.delayDays > 0 || s.currentStatus.includes('Cutoff') || s.currentStatus.includes('Flight')).length;
  const pendingMawbCount = allAirExport.filter(s => s.currentStatus.includes('MAWB') || s.currentStatus.includes('Booking')).length;

  let filteredShipments = allAirExport.filter(s => {
    if (statusFilter !== 'ALL' && s.health !== statusFilter) return false;
    if (stageFilter !== 'ALL' && s.currentStatus !== stageFilter) return false;
    if (assignedFilter !== 'ALL' && s.assignedTo !== assignedFilter) return false;

    if (metricFilter === 'active') return s.currentStatus !== 'Delivered';
    if (metricFilter === 'attention') return s.health === 'Delayed' || s.health === 'Attention Required' || s.health === 'At Risk';
    if (metricFilter === 'dueToday') return s.delayDays > 0 || s.currentStatus.includes('Cutoff') || s.currentStatus.includes('Flight');
    if (metricFilter === 'pendingMawb') return s.currentStatus.includes('MAWB') || s.currentStatus.includes('Booking');

    return true;
  });

  const uniqueStages = Array.from(new Set(allAirExport.map(s => s.currentStatus)));
  const uniqueExecutives = Array.from(new Set(allAirExport.map(s => s.assignedTo).filter(Boolean)));

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 bg-white p-4 rounded-xl border shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Plane className="w-5 h-5 text-red-600" />
            <ArrowUpRight className="w-4 h-4 text-red-600" />
            <span>Air Export Operations</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Space allocation, MAWB/HAWB issuance, cargo readiness, airport customs, and flight departures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 font-bold border border-teal-200 text-xs">
            {allAirExport.length} Air Export Records
          </span>
        </div>
      </div>

      {/* TOP SUMMARY METRICS (4 Small Clean Clickable Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={() => setMetricFilter(metricFilter === 'active' ? null : 'active')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'active' ? 'bg-red-50 border-red-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Active Air Exports</span>
            <Plane className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{activeCount}</div>
          <span className="text-[10px] text-red-600 font-bold block mt-1">Click to filter active</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'attention' ? null : 'attention')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'attention' ? 'bg-amber-50 border-amber-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700">Needs Attention</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{attentionCount}</div>
          <span className="text-[10px] text-amber-700 font-bold block mt-1">Click to view exceptions</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'dueToday' ? null : 'dueToday')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'dueToday' ? 'bg-red-50 border-red-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-600">Flight Cutoffs / Delayed</span>
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{dueTodayCount}</div>
          <span className="text-[10px] text-red-600 font-bold block mt-1">Click to view flight cutoffs</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'pendingMawb' ? null : 'pendingMawb')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'pendingMawb' ? 'bg-purple-50 border-purple-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700">MAWB / Space Pending</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{pendingMawbCount}</div>
          <span className="text-[10px] text-purple-700 font-bold block mt-1">Click to view MAWB</span>
        </button>
      </div>

      {/* CONTEXTUAL CONTROLS BAR */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-red-600" />
            <span>Contextual Filters:</span>
          </span>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Status: All</option>
            <option value="Delayed">Delayed</option>
            <option value="Attention Required">Attention Required</option>
            <option value="Healthy">Healthy</option>
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none cursor-pointer max-w-[200px]"
          >
            <option value="ALL">Current Stage: All</option>
            {uniqueStages.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>

          <select
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Assigned: All</option>
            {uniqueExecutives.map(ex => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </div>

        {(statusFilter !== 'ALL' || stageFilter !== 'ALL' || assignedFilter !== 'ALL' || metricFilter !== null) && (
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setStageFilter('ALL');
              setAssignedFilter('ALL');
              setMetricFilter(null);
            }}
            className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* WORK AREA: TODAY'S / PRIORITY WORK & FULL LIST TOGGLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span>{showAllShipments ? "All Air Export Directory" : "Today's / Priority Air Export Work"}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {showAllShipments ? filteredShipments.length : Math.min(filteredShipments.length, 6)} Records
            </span>
          </h3>

          <button
            onClick={() => setShowAllShipments(!showAllShipments)}
            className="text-xs font-bold text-red-600 hover:text-red-700 bg-white border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            {showAllShipments ? "Show Priority Work Only" : "View All Air Export Shipments"}
          </button>
        </div>

        <ShipmentTable 
          customShipments={filteredShipments} 
          title={showAllShipments ? "Complete Air Export Queue" : "Priority Air Export Work"}
          limit={showAllShipments ? null : 6}
        />
      </div>

    </div>
  );
}

