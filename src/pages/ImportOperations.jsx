import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { ShipmentTable } from '../components/ShipmentTable';
import { Ship, ArrowDownLeft, AlertTriangle, Clock, ShieldCheck, Truck, Filter } from 'lucide-react';

export function ImportOperations() {
  const { shipments } = useOperations();

  // Mode dataset fixed to Ocean Import
  const allOceanImport = shipments.filter(s => s.mode === 'Ocean' && s.direction === 'Import');

  // Contextual filters state
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [assignedFilter, setAssignedFilter] = useState('ALL');
  const [metricFilter, setMetricFilter] = useState(null);
  const [showAllShipments, setShowAllShipments] = useState(false);

  // Calculate 5 top summary metrics
  const activeCount = allOceanImport.filter(s => s.currentStatus !== 'Delivered').length;
  const attentionCount = allOceanImport.filter(s => s.health === 'Delayed' || s.health === 'Attention Required' || s.health === 'At Risk').length;
  const dueTodayCount = allOceanImport.filter(s => s.delayDays > 0 || s.currentStatus.includes('Arrival') || s.currentStatus.includes('Pending')).length;
  const pendingCustomsCount = allOceanImport.filter(s => s.currentStatus.includes('Customs') || s.currentStatus.includes('BOE')).length;
  const pendingDeliveryCount = allOceanImport.filter(s => s.currentStatus.includes('DO') || s.currentStatus.includes('Gate-out') || s.currentStatus.includes('Delivery')).length;

  // Apply contextual filtering
  let filteredShipments = allOceanImport.filter(s => {
    if (statusFilter !== 'ALL' && s.health !== statusFilter) return false;
    if (typeFilter !== 'ALL' && (s.shipmentType || 'FCL') !== typeFilter) return false;
    if (stageFilter !== 'ALL' && s.currentStatus !== stageFilter) return false;
    if (assignedFilter !== 'ALL' && s.assignedTo !== assignedFilter) return false;

    if (metricFilter === 'active') return s.currentStatus !== 'Delivered';
    if (metricFilter === 'attention') return s.health === 'Delayed' || s.health === 'Attention Required' || s.health === 'At Risk';
    if (metricFilter === 'dueToday') return s.delayDays > 0 || s.currentStatus.includes('Arrival') || s.currentStatus.includes('Pending');
    if (metricFilter === 'pendingCustoms') return s.currentStatus.includes('Customs') || s.currentStatus.includes('BOE');
    if (metricFilter === 'pendingDelivery') return s.currentStatus.includes('DO') || s.currentStatus.includes('Gate-out') || s.currentStatus.includes('Delivery');

    return true;
  });

  const uniqueStages = Array.from(new Set(allOceanImport.map(s => s.currentStatus)));
  const uniqueExecutives = Array.from(new Set(allOceanImport.map(s => s.assignedTo).filter(Boolean)));

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Page Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border border-slate-800 border-l-4 border-l-teal-500 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <Ship className="w-5 h-5 text-teal-400" />
            <ArrowDownLeft className="w-4 h-4 text-amber-400" />
            <span>Ocean Import Operations</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Import pre-alerts, IGM filing, vessel arrival, Delivery Order (DO), Customs BOE, and gate-out release.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-teal-500/10 text-teal-400 font-bold border border-teal-500/20 text-xs">
            {allOceanImport.length} Ocean Import Records
          </span>
        </div>
      </div>

      {/* TOP SUMMARY METRICS (5 Small Clean Clickable Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setMetricFilter(metricFilter === 'active' ? null : 'active')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'active' ? 'bg-teal-500/10 border-teal-500 shadow-sm' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">Active</span>
            <Ship className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-xl font-extrabold text-white mt-1">{activeCount}</div>
          <span className="text-[10px] text-teal-400 font-semibold block mt-0.5">Filter active</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'attention' ? null : 'attention')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'attention' ? 'bg-amber-500/10 border-amber-500 shadow-sm' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-400">Needs Attention</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-extrabold text-white mt-1">{attentionCount}</div>
          <span className="text-[10px] text-amber-400 font-semibold block mt-0.5">Filter exceptions</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'dueToday' ? null : 'dueToday')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'dueToday' ? 'bg-rose-500/10 border-rose-500 shadow-sm' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-400">Due Today</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-extrabold text-white mt-1">{dueTodayCount}</div>
          <span className="text-[10px] text-rose-400 font-semibold block mt-0.5">Filter due</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'pendingCustoms' ? null : 'pendingCustoms')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'pendingCustoms' ? 'bg-emerald-500/10 border-emerald-500 shadow-sm' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400">Pending Customs</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-extrabold text-white mt-1">{pendingCustomsCount}</div>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">Filter BOE</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'pendingDelivery' ? null : 'pendingDelivery')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'pendingDelivery' ? 'bg-sky-500/10 border-sky-500 shadow-sm' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-400">Pending Delivery</span>
            <Truck className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-extrabold text-white mt-1">{pendingDeliveryCount}</div>
          <span className="text-[10px] text-sky-400 font-semibold block mt-0.5">Filter DO/Delivery</span>
        </button>
      </div>

      {/* CONTEXTUAL CONTROLS BAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-extrabold text-slate-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-teal-400" />
            <span>Contextual Filters:</span>
          </span>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 font-medium text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Status: All</option>
            <option value="Delayed">Delayed</option>
            <option value="Attention Required">Attention Required</option>
            <option value="Healthy">Healthy</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 font-medium text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Type: All (FCL/LCL)</option>
            <option value="FCL">FCL Only</option>
            <option value="LCL">LCL Only</option>
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 font-medium text-slate-200 focus:outline-none cursor-pointer max-w-[200px]"
          >
            <option value="ALL">Current Stage: All</option>
            {uniqueStages.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>

          <select
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 font-medium text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Assigned: All</option>
            {uniqueExecutives.map(ex => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </div>

        {(statusFilter !== 'ALL' || typeFilter !== 'ALL' || stageFilter !== 'ALL' || assignedFilter !== 'ALL' || metricFilter !== null) && (
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setTypeFilter('ALL');
              setStageFilter('ALL');
              setAssignedFilter('ALL');
              setMetricFilter(null);
            }}
            className="text-xs font-bold text-teal-400 hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* WORK AREA: TODAY'S / PRIORITY WORK & FULL LIST TOGGLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <span>{showAllShipments ? "All Ocean Import Directory" : "Today's / Priority Ocean Import Work"}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
              {showAllShipments ? filteredShipments.length : Math.min(filteredShipments.length, 6)} Records
            </span>
          </h3>

          <button
            onClick={() => setShowAllShipments(!showAllShipments)}
            className="text-xs font-bold text-teal-400 hover:text-teal-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded transition-colors shadow-sm"
          >
            {showAllShipments ? "Show Priority Work Only" : "View All Ocean Import Shipments"}
          </button>
        </div>

        <ShipmentTable 
          customShipments={filteredShipments} 
          title={showAllShipments ? "Complete Ocean Import Queue" : "Priority Operational Work"}
          limit={showAllShipments ? null : 6}
        />
      </div>

    </div>
  );
}

