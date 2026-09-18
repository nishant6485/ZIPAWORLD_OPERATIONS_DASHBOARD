import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { Ship, Plane, Layers, User, Calendar, Filter, ChevronDown } from 'lucide-react';

export function FilterBar() {
  const {
    currentUser,
    activeMode,
    setActiveMode,
    activeDirection,
    setActiveDirection,
    activeShipmentType,
    setActiveShipmentType,
    globalDateFilter,
    setGlobalDateFilter,
    executiveFilter,
    setExecutiveFilter,
    executives
  } = useOperations();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const hasOceanAccess = currentUser.access.includes('Ocean');
  const hasAirAccess = currentUser.access.includes('Air');

  const FilterContent = () => (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full">
      {/* Mode & Direction Selectors */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* MODE SELECTOR */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
          {hasOceanAccess && hasAirAccess && (
            <button
              onClick={() => { setActiveMode('ALL'); setActiveShipmentType('ALL'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeMode === 'ALL' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ALL</span>
            </button>
          )}

          {hasOceanAccess && (
            <button
              onClick={() => { setActiveMode('Ocean'); setActiveShipmentType('ALL'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeMode === 'Ocean' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>OCEAN</span>
            </button>
          )}

          {hasAirAccess && (
            <button
              onClick={() => { setActiveMode('Air'); setActiveShipmentType('ALL'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeMode === 'Air' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>AIR</span>
            </button>
          )}
        </div>

        {/* DIRECTION SELECTOR */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveDirection('ALL')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeDirection === 'ALL' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ALL DIR
          </button>
          <button
            onClick={() => setActiveDirection('EXPORT')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeDirection === 'EXPORT' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            EXPORT
          </button>
          <button
            onClick={() => setActiveDirection('IMPORT')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeDirection === 'IMPORT' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            IMPORT
          </button>
        </div>

        {/* DYNAMIC SHIPMENT TYPE FILTER */}
        {activeMode === 'Ocean' && (
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveShipmentType('ALL')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeShipmentType === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ALL TYPE
            </button>
            <button
              onClick={() => setActiveShipmentType('FCL')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeShipmentType === 'FCL' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FCL
            </button>
            <button
              onClick={() => setActiveShipmentType('LCL')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeShipmentType === 'LCL' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              LCL
            </button>
          </div>
        )}

        {activeMode === 'Air' && (
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveShipmentType('ALL')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeShipmentType === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ALL TYPE
            </button>
            <button
              onClick={() => setActiveShipmentType('Air Cargo')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeShipmentType === 'Air Cargo' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AIR CARGO
            </button>
          </div>
        )}

      </div>

      {/* Executive & Date Range Selectors */}
      <div className="flex items-center gap-3">
        
        {/* Executive Filter Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800">
          <User className="w-3.5 h-3.5 text-blue-600" />
          <select
            value={executiveFilter}
            onChange={(e) => setExecutiveFilter(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-white text-slate-800">All Executives</option>
            {executives.map(exec => (
              <option key={exec.id} value={exec.name} className="bg-white text-slate-800">
                {exec.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <select
            value={globalDateFilter}
            onChange={(e) => setGlobalDateFilter(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="7d" className="bg-white text-slate-800">Last 7 Days</option>
            <option value="30d" className="bg-white text-slate-800">Last 30 Days</option>
            <option value="90d" className="bg-white text-slate-800">Last 90 Days</option>
            <option value="This Month" className="bg-white text-slate-800">This Month</option>
          </select>
        </div>

      </div>
    </div>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs mb-6">
      
      {/* Mobile Collapse Toggle Button [ Filters ▼ ] */}
      <div className="md:hidden flex items-center justify-between">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filters ({activeMode} / {activeDirection})</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Desktop View: Always Visible */}
      <div className="hidden md:block">
        <FilterContent />
      </div>

      {/* Mobile Drawer/Accordion Popdown */}
      {isMobileFiltersOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-200 space-y-4">
          <FilterContent />
        </div>
      )}

    </div>
  );
}


