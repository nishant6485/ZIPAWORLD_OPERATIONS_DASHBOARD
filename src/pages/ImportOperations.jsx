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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-800">
      
      {/* Page Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <Ship className="w-5 h-5 text-red-500" />
            <ArrowDownLeft className="w-4 h-4 text-amber-400" />
            <span>Ocean Import Operations</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Import pre-alerts, IGM filing, vessel arrival, Delivery Order (DO), Customs BOE, and gate-out release.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-slate-800 text-slate-200 font-bold border border-slate-700 text-xs">
            {allOceanImport.length} Ocean Import Records
          </span>
        </div>
      </div>

      {/* TOP SUMMARY METRICS (5 Small Clean Clickable Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setMetricFilter(metricFilter === 'active' ? null : 'active')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'active' ? 'bg-red-50 border-red-500 ring-2 ring-red-200 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Active</span>
            <Ship className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{activeCount}</div>
          <span className="text-[10px] text-red-600 font-semibold block mt-0.5">Filter active</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'attention' ? null : 'attention')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'attention' ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700">Needs Attention</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{attentionCount}</div>
          <span className="text-[10px] text-amber-600 font-semibold block mt-0.5">Filter exceptions</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'dueToday' ? null : 'dueToday')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'dueToday' ? 'bg-red-50 border-red-500 ring-2 ring-red-200 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-red-700">Due Today</span>
            <Clock className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{dueTodayCount}</div>
          <span className="text-[10px] text-red-600 font-semibold block mt-0.5">Filter due</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'pendingCustoms' ? null : 'pendingCustoms')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'pendingCustoms' ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700">Pending Customs</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{pendingCustomsCount}</div>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Filter BOE</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'pendingDelivery' ? null : 'pendingDelivery')}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            metricFilter === 'pendingDelivery' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-700">Pending Delivery</span>
            <Truck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{pendingDeliveryCount}</div>
          <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">Filter DO/Delivery</span>
        </button>
      </div>

      {/* CONTEXTUAL CONTROLS BAR */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-red-600" />
            <span>Contextual Filters:</span>
          </span>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Status: All</option>
            <option value="Delayed">Delayed</option>
            <option value="Attention Required">Attention Required</option>
            <option value="Healthy">Healthy</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Type: All (FCL/LCL)</option>
            <option value="FCL">FCL Only</option>
            <option value="LCL">LCL Only</option>
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none cursor-pointer max-w-[200px]"
          >
            <option value="ALL">Current Stage: All</option>
            {uniqueStages.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>

          <select
            value={assignedFilter}
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none cursor-pointer"
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
            className="text-xs font-bold text-red-600 hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* WORK AREA: TODAY'S / PRIORITY WORK & FULL LIST TOGGLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <span>{showAllShipments ? "All Ocean Import Directory" : "Today's / Priority Ocean Import Work"}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
              {showAllShipments ? filteredShipments.length : Math.min(filteredShipments.length, 6)} Records
            </span>
          </h3>

          <button
            onClick={() => setShowAllShipments(!showAllShipments)}
            className="text-xs font-bold text-red-600 hover:text-red-700 bg-white border border-slate-200 px-3 py-1.5 rounded transition-colors shadow-sm"
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

