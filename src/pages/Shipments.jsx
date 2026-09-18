import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { ShipmentTable } from '../components/ShipmentTable';
import { Package, Plus, Search, Filter } from 'lucide-react';

export function Shipments() {
  const { shipments, stats, openQuickAction, activeMode } = useOperations();
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredShipments = statusFilter === 'ALL'
    ? shipments
    : statusFilter === 'Active'
    ? shipments.filter(s => s.currentStatus !== 'Delivered' && s.progress < 100)
    : statusFilter === 'Delayed'
    ? shipments.filter(s => s.health === 'Delayed' || s.health === 'At Risk' || (s.delayDays && s.delayDays > 0))
    : statusFilter === 'Completed'
    ? shipments.filter(s => s.currentStatus === 'Delivered' || s.progress === 100)
    : shipments;

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <Package className="w-5 h-5 text-red-500" />
            <span>Master Shipment Directory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Comprehensive operational dataset across Ocean Export, Ocean Import, Air Export, and Air Import.
          </p>
        </div>

        <button
          onClick={() => openQuickAction(activeMode === 'Air' ? 'create_air' : 'create_ocean')}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Shipment</span>
        </button>
      </div>

      {/* Global Filter Bar */}
      <FilterBar />

      {/* Status Queue Tabs */}
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1.5 w-fit text-xs font-bold shadow-sm">
        {[
          { id: 'ALL', label: `All (${shipments.length})` },
          { id: 'Active', label: `Active (${stats.activeShipments})` },
          { id: 'Delayed', label: `Delayed (${stats.delayedShipments})` },
          { id: 'Completed', label: `Completed (${stats.completedShipments})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3 py-1.5 rounded transition-all ${
              statusFilter === tab.id ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Master Shipment Table */}
      <ShipmentTable 
        customShipments={filteredShipments}
        title="Operational Shipments" 
      />

    </div>
  );
}
