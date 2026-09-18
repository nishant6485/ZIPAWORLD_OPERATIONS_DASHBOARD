import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { ShipmentTable } from '../components/ShipmentTable';
import { Ship, ArrowUpRight, AlertTriangle, Clock, FileText, Filter } from 'lucide-react';

export function ExportOperations() {
  const { shipments } = useOperations();

  // Mode dataset fixed to Ocean Export
  const allOceanExport = shipments.filter(s => s.mode === 'Ocean' && s.direction === 'Export');

  // Contextual filters state
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [assignedFilter, setAssignedFilter] = useState('ALL');
  const [metricFilter, setMetricFilter] = useState(null); // 'attention', 'dueToday', 'pendingDoc', 'active'
  const [showAllShipments, setShowAllShipments] = useState(false);

  // Calculate top summary metrics
  const activeCount = allOceanExport.filter(s => s.currentStatus !== 'Delivered').length;
  const attentionCount = allOceanExport.filter(s => s.health === 'Delayed' || s.health === 'Attention Required' || s.health === 'At Risk').length;
  const dueTodayCount = allOceanExport.filter(s => s.delayDays > 0 || s.currentStatus.includes('Cutoff') || s.currentStatus.includes('Pending')).length;
  const pendingDocCount = allOceanExport.filter(s => s.currentStatus.includes('Documentation') || s.currentStatus.includes('SI')).length;

  // Apply contextual filtering
  let filteredShipments = allOceanExport.filter(s => {
    if (statusFilter !== 'ALL' && s.health !== statusFilter) return false;
    if (typeFilter !== 'ALL' && (s.shipmentType || 'FCL') !== typeFilter) return false;
    if (stageFilter !== 'ALL' && s.currentStatus !== stageFilter) return false;
    if (assignedFilter !== 'ALL' && s.assignedTo !== assignedFilter) return false;

    if (metricFilter === 'active') return s.currentStatus !== 'Delivered';
    if (metricFilter === 'attention') return s.health === 'Delayed' || s.health === 'Attention Required' || s.health === 'At Risk';
    if (metricFilter === 'dueToday') return s.delayDays > 0 || s.currentStatus.includes('Cutoff') || s.currentStatus.includes('Pending');
    if (metricFilter === 'pendingDoc') return s.currentStatus.includes('Documentation') || s.currentStatus.includes('SI');

    return true;
  });

  // Unique stages and assigned executives for contextual dropdowns
  const uniqueStages = Array.from(new Set(allOceanExport.map(s => s.currentStatus)));
  const uniqueExecutives = Array.from(new Set(allOceanExport.map(s => s.assignedTo).filter(Boolean)));

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 bg-white p-4 rounded-xl border shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Ship className="w-5 h-5 text-red-600" />
            <ArrowUpRight className="w-4 h-4 text-red-600" />
            <span>Ocean Export Operations</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            FCL & LCL Ocean Export execution, SI submission, BL confirmation, and vessel cutoffs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 font-bold border border-sky-200 text-xs">
            {allOceanExport.length} Ocean Export Records
          </span>
        </div>
      </div>

      {/* TOP SUMMARY METRICS (4 Small Clean Clickable Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={() => setMetricFilter(metricFilter === 'active' ? null : 'active')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'active' 
              ? 'bg-red-50 border-red-300 shadow-xs' 
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Active Shipments</span>
            <Ship className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{activeCount}</div>
          <span className="text-[10px] text-red-600 font-bold block mt-1">Click to filter active</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'attention' ? null : 'attention')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'attention' 
              ? 'bg-amber-50 border-amber-300 shadow-xs' 
              : 'bg-white border-slate-200 hover:border-slate-300'
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
            metricFilter === 'dueToday' 
              ? 'bg-red-50 border-red-300 shadow-xs' 
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-600">Due Today / Delayed</span>
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{dueTodayCount}</div>
          <span className="text-[10px] text-red-600 font-bold block mt-1">Click to view cutoffs</span>
        </button>

        <button
          onClick={() => setMetricFilter(metricFilter === 'pendingDoc' ? null : 'pendingDoc')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            metricFilter === 'pendingDoc' 
              ? 'bg-purple-50 border-purple-300 shadow-xs' 
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700">Pending Documentation</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{pendingDocCount}</div>
          <span className="text-[10px] text-purple-700 font-bold block mt-1">Click to view SI/BL</span>
        </button>
      </div>

      {/* CONTEXTUAL CONTROLS BAR (No global mode controls) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-red-600" />
            <span>Contextual Filters:</span>
          </span>

          {/* Status Dropdown */}
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

          {/* FCL / LCL Dropdown */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Type: All (FCL/LCL)</option>
            <option value="FCL">FCL Only</option>
            <option value="LCL">LCL Only</option>
          </select>

          {/* Stage Dropdown */}
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

          {/* Assigned Executive Dropdown */}
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

        {(statusFilter !== 'ALL' || typeFilter !== 'ALL' || stageFilter !== 'ALL' || assignedFilter !== 'ALL' || metricFilter !== null) && (
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setTypeFilter('ALL');
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
            <span>{showAllShipments ? "All Ocean Export Directory" : "Today's / Priority Ocean Export Work"}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {showAllShipments ? filteredShipments.length : Math.min(filteredShipments.length, 6)} Records
            </span>
          </h3>

          <button
            onClick={() => setShowAllShipments(!showAllShipments)}
            className="text-xs font-bold text-red-600 hover:text-red-700 bg-white border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            {showAllShipments ? "Show Priority Work Only" : "View All Ocean Export Shipments"}
          </button>
        </div>

        <ShipmentTable 
          customShipments={filteredShipments} 
          title={showAllShipments ? "Complete Ocean Export Queue" : "Priority Operational Work"}
          limit={showAllShipments ? null : 6}
        />
      </div>

    </div>
  );
}

