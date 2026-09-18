import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { ShipmentTable } from '../components/ShipmentTable';
import { Plane, ArrowDownLeft, AlertTriangle, Clock, ShieldCheck, Truck, Filter } from 'lucide-react';

export function AirImport() {
  const { shipments } = useOperations();

  const allAirImport = shipments.filter(s => s.mode === 'Air' && s.direction === 'Import');

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [assignedFilter, setAssignedFilter] = useState('ALL');
  const [metricFilter, setMetricFilter] = useState(null);
  const [showAllShipments, setShowAllShipments] = useState(false);

  const activeCount = allAirImport.filter(s => s.currentStatus !== 'Delivered').length;
  const attentionCount = allAirImport.filter(s => s.health === 'Delayed' || s.health === 'Attention Required' || s.health === 'At Risk').length;
  const dueTodayCount = allAirImport.filter(s => s.delayDays > 0 || s.currentStatus.includes('Arrival') || s.currentStatus.includes('Pending')).length;
  const pendingRcfCount = allAirImport.filter(s => s.currentStatus.includes('RCF') || s.currentStatus.includes('Terminal') || s.currentStatus.includes('Flight')).length;
  const pendingCustomsCount = allAirImport.filter(s => s.currentStatus.includes('Customs') || s.currentStatus.includes('BOE')).length;

  let filteredShipments = allAirImport.filter(s => {
    if (statusFilter !== 'ALL' && s.health !== statusFilter) return false;
    if (stageFilter !== 'ALL' && s.currentStatus !== stageFilter) return false;
    if (assignedFilter !== 'ALL' && s.assignedTo !== assignedFilter) return false;

    if (metricFilter === 'active') return s.currentStatus !== 'Delivered';
    if (metricFilter === 'attention') return s.health === 'Delayed' || s.health === 'Attention Required' || s.health === 'At Risk';
    if (metricFilter === 'dueToday') return s.delayDays > 0 || s.currentStatus.includes('Arrival') || s.currentStatus.includes('Pending');
    if (metricFilter === 'pendingRcf') return s.currentStatus.includes('RCF') || s.currentStatus.includes('Terminal') || s.currentStatus.includes('Flight');
    if (metricFilter === 'pendingCustoms') return s.currentStatus.includes('Customs') || s.currentStatus.includes('BOE');

    return true;
  });

  const uniqueStages = Array.from(new Set(allAirImport.map(s => s.currentStatus)));
  const uniqueExecutives = Array.from(new Set(allAirImport.map(s => s.assignedTo).filter(Boolean)));

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 bg-white p-4 rounded-xl border shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Plane className="w-5 h-5 text-red-600" />
            <ArrowDownLeft className="w-4 h-4 text-red-600" />
            <span>Air Import Operations</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Pre-alerts, flight arrival, RCF terminal clearance, BOE customs, OOC, and final delivery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-xs">
            {allAirImport.length} Air Import Records
          </span>
        </div>
      </div>

      {/* TOP SUMMARY METRICS (5 Small Clean Clickable Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setMetricFilter(metricFilter === 'active' ? null : 'active')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'active' ? 'bg-red-50 border-red-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Active</span>
            <Plane className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">{activeCount}</div>
          <span className="text-[10px] text-red-600 font-bold block mt-0.5">Filter active</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'attention' ? null : 'attention')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'attention' ? 'bg-amber-50 border-amber-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700">Needs Attention</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">{attentionCount}</div>
          <span className="text-[10px] text-amber-700 font-bold block mt-0.5">Filter exceptions</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'dueToday' ? null : 'dueToday')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'dueToday' ? 'bg-red-50 border-red-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-red-600">Due Today</span>
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">{dueTodayCount}</div>
          <span className="text-[10px] text-red-600 font-bold block mt-0.5">Filter due</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'pendingRcf' ? null : 'pendingRcf')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'pendingRcf' ? 'bg-sky-50 border-sky-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-700">Arrival / RCF</span>
            <Truck className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">{pendingRcfCount}</div>
          <span className="text-[10px] text-sky-700 font-bold block mt-0.5">Filter terminal</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'pendingCustoms' ? null : 'pendingCustoms')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'pendingCustoms' ? 'bg-indigo-50 border-indigo-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-700">Customs Clearance</span>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">{pendingCustomsCount}</div>
          <span className="text-[10px] text-indigo-700 font-bold block mt-0.5">Filter BOE/OOC</span>
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
            <span>{showAllShipments ? "All Air Import Directory" : "Today's / Priority Air Import Work"}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {showAllShipments ? filteredShipments.length : Math.min(filteredShipments.length, 6)} Records
            </span>
          </h3>

          <button
            onClick={() => setShowAllShipments(!showAllShipments)}
            className="text-xs font-bold text-red-600 hover:text-red-700 bg-white border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            {showAllShipments ? "Show Priority Work Only" : "View All Air Import Shipments"}
          </button>
        </div>

        <ShipmentTable 
          customShipments={filteredShipments} 
          title={showAllShipments ? "Complete Air Import Queue" : "Priority Air Import Work"}
          limit={showAllShipments ? null : 6}
        />
      </div>

    </div>
  );
}

