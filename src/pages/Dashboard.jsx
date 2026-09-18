import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { ShipmentTable } from '../components/ShipmentTable';
import { 
  LineTrendChart, 
  DonutDistributionChart 
} from '../components/charts';
import { 
  Ship, 
  Plane, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Calendar, 
  CheckSquare, 
  FileText, 
  ArrowRight,
  ChevronRight,
  Filter,
  FileCheck,
  DollarSign,
  Search,
  ChevronDown
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { shipments, stats, alerts, setSideDrawerShipmentId, currentUser, globalDateFilter, setGlobalDateFilter } = useOperations();

  // Active Shipment Manager Filter Pill: 'ALL' | 'OPEN' | 'RATES_AVAILABLE' | 'RATES_QUOTED' | 'RATES_CONFIRMED' | 'BOOKING' | 'BL'
  const [managerStageFilter, setManagerStageFilter] = useState('ALL');
  const [managerModeFilter, setManagerModeFilter] = useState('ALL');
  const [managerDirFilter, setManagerDirFilter] = useState('ALL');
  const [showExtraSummary, setShowExtraSummary] = useState(false);

  // Filter shipments dynamically for Shipment Manager based on user clicks
  const filteredManagerShipments = shipments.filter(s => {
    if (managerModeFilter !== 'ALL' && s.mode !== managerModeFilter) return false;
    if (managerDirFilter !== 'ALL' && s.direction !== managerDirFilter) return false;
    
    if (managerStageFilter === 'OPEN') return s.currentStatus.includes('Draft') || s.currentStatus.includes('New') || s.health === 'Healthy';
    if (managerStageFilter === 'RATES_AVAILABLE') return s.currentStatus.includes('Booking') || s.currentStatus.includes('Draft');
    if (managerStageFilter === 'RATES_QUOTED') return s.currentStatus.includes('Booked') || s.currentStatus.includes('Draft');
    if (managerStageFilter === 'RATES_CONFIRMED') return s.currentStatus.includes('Booked') || s.currentStatus.includes('Booking Confirmed');
    if (managerStageFilter === 'BOOKING') return s.currentStatus.includes('Booking') || s.currentStatus.includes('Booked');
    if (managerStageFilter === 'BL') return s.currentStatus.includes('BL') || s.currentStatus.includes('Customs') || s.blNo;

    return true;
  });

  const trendData = [
    { label: 'Week 1', volume: 18, completed: 14, delayed: 2, onTimeRate: 92 },
    { label: 'Week 2', volume: 24, completed: 19, delayed: 3, onTimeRate: 88 },
    { label: 'Week 3', volume: 29, completed: 22, delayed: 2, onTimeRate: 93 },
    { label: 'Week 4', volume: stats.totalShipments, completed: stats.completedShipments, delayed: stats.delayedShipments, onTimeRate: stats.onTimeRate }
  ];

  const modeDonutData = [
    { name: 'Ocean Freight', value: stats.oceanCount, color: '#0284C7' },
    { name: 'Air Freight', value: stats.airCount, color: '#0D9488' }
  ];

  const criticalAlerts = alerts.filter(a => a.status === 'Open' && (a.severity === 'Critical' || a.severity === 'High')).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* 1. Page Header & Global Date Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 bg-white p-4 rounded-xl border shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-600" />
            <span>Dashboard Overview</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Operational snapshot • {currentUser.name} ({currentUser.role})
          </p>
        </div>

        {/* Global Date Filter Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800">
            <Calendar className="w-4 h-4 text-red-600" />
            <span>Date Range:</span>
            <select
              value={globalDateFilter}
              onChange={(e) => setGlobalDateFilter(e.target.value)}
              className="bg-transparent font-bold text-red-600 focus:outline-none cursor-pointer"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="This Month">This Month</option>
            </select>
          </div>

          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Health: Optimal ({stats.onTimeRate}%)</span>
          </div>
        </div>
      </div>

      {/* 2. Concise Operational Summary Blocks (Clickable on demand) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* SUMMARY 1: QUERIES */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-red-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4 text-red-600" />
              QUERIES
            </span>
            <button 
              onClick={() => setShowExtraSummary(!showExtraSummary)} 
              className="text-[11px] text-red-600 font-bold hover:underline cursor-pointer"
            >
              {showExtraSummary ? 'Show Less' : 'Show More...'}
            </button>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <div 
              onClick={() => { setManagerStageFilter('OPEN'); }}
              className="cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors"
            >
              <div className="text-slate-500 font-medium">Open</div>
              <div className="text-lg font-black text-slate-900">{stats.activeShipments}</div>
            </div>
            <div 
              onClick={() => { setManagerStageFilter('RATES_AVAILABLE'); }}
              className="cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors text-right"
            >
              <div className="text-slate-500 font-medium">Rates Available</div>
              <div className="text-lg font-black text-red-600">12</div>
            </div>
          </div>
        </div>

        {/* SUMMARY 2: BOOKING */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-red-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-sky-600" />
              BOOKING
            </span>
            <span className="text-[10px] text-slate-400 font-bold">Active</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <div 
              onClick={() => { setManagerStageFilter('BOOKING'); }}
              className="cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors"
            >
              <div className="text-slate-500 font-medium">Booking Pending</div>
              <div className="text-lg font-black text-amber-600">{stats.pendingBookings}</div>
            </div>
            <div 
              onClick={() => { setManagerStageFilter('BOOKING'); navigate('/bookings'); }}
              className="cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors text-right"
            >
              <div className="text-slate-500 font-medium">Booking Confirmed</div>
              <div className="text-lg font-black text-emerald-700 font-mono">59</div>
            </div>
          </div>
        </div>

        {/* SUMMARY 3: BL / AWB */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-red-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-purple-600" />
              BL / AWB
            </span>
            <span className="text-[10px] text-slate-400 font-bold">Docs</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <div 
              onClick={() => { setManagerStageFilter('BL'); navigate('/bl-management'); }}
              className="cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors"
            >
              <div className="text-slate-500 font-medium">BL Created</div>
              <div className="text-lg font-black text-red-600 font-mono">1</div>
            </div>
            <div 
              onClick={() => { setManagerStageFilter('BL'); }}
              className="cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors text-right"
            >
              <div className="text-slate-500 font-medium">BL Final / Executed</div>
              <div className="text-lg font-black text-slate-900">14</div>
            </div>
          </div>
        </div>

        {/* SUMMARY 4: INVOICE */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-red-300 transition-all">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              INVOICE
            </span>
            <span className="text-[10px] text-slate-400 font-bold">Finance</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <div 
              onClick={() => { navigate('/analytics'); }}
              className="cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors"
            >
              <div className="text-slate-500 font-medium">Pending Invoice</div>
              <div className="text-lg font-black text-slate-900 font-mono">0</div>
            </div>
            <div 
              onClick={() => { navigate('/analytics'); }}
              className="cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors text-right"
            >
              <div className="text-slate-500 font-medium">Approved Invoice</div>
              <div className="text-lg font-black text-emerald-700">28</div>
            </div>
          </div>
        </div>

      </div>

      {/* Extra Detail Summary Drawer (Revealed when clicking Show More...) */}
      {showExtraSummary && (
        <div className="bg-slate-100 border border-slate-300 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-slate-500 font-bold">Task Clearance Rate</div>
            <div className="text-xl font-black text-slate-900 mt-1">{stats.taskCompletionRate}%</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Pending: {stats.pendingTasks}</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-slate-500 font-bold">Documentation SLA</div>
            <div className="text-xl font-black text-emerald-700 mt-1">{stats.docCompletionRate}%</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Pending: {stats.pendingDocs}</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-slate-500 font-bold">Delayed Shipments</div>
            <div className="text-xl font-black text-red-600 mt-1">{stats.delayedShipments}</div>
            <div className="text-[10px] text-red-600 font-semibold mt-0.5">Needs immediate attention</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-slate-500 font-bold">Mean Processing Time</div>
            <div className="text-xl font-black text-slate-900 mt-1">{stats.meanProcessingTime} Days</div>
            <div className="text-[10px] text-slate-500 mt-0.5">P95 SLA: {stats.p95ProcessingTime}d</div>
          </div>
        </div>
      )}

      {/* 3. PROMINENT SHIPMENT MANAGER SECTION */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        
        {/* Dark Charcoal / Black Section Header Banner */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <h2 className="text-base font-black tracking-wider uppercase">SHIPMENT MANAGER</h2>
            <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {filteredManagerShipments.length} Active Records
            </span>
          </div>

          {/* Mode & Filter Dropdowns */}
          <div className="flex items-center gap-2">
            <select
              value={managerModeFilter}
              onChange={(e) => setManagerModeFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Ocean & Air All</option>
              <option value="Ocean">Ocean Only</option>
              <option value="Air">Air Only</option>
            </select>

            <select
              value={managerDirFilter}
              onChange={(e) => setManagerDirFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Export & Import All</option>
              <option value="Export">Export Only</option>
              <option value="Import">Import Only</option>
            </select>
          </div>
        </div>

        {/* Operational Filter Pills Row (Interactive Buttons) */}
        <div className="bg-slate-100 border-b border-slate-200 p-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'ALL', label: 'ALL' },
              { id: 'OPEN', label: 'OPEN' },
              { id: 'RATES_AVAILABLE', label: 'RATES AVAILABLE' },
              { id: 'RATES_QUOTED', label: 'RATES QUOTED' },
              { id: 'RATES_CONFIRMED', label: 'RATES CONFIRMED' },
              { id: 'BOOKING', label: 'BOOKING' },
              { id: 'BL', label: 'BL' }
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setManagerStageFilter(pill.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  managerStageFilter === pill.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => { setManagerStageFilter('ALL'); setManagerModeFilter('ALL'); setManagerDirFilter('ALL'); }} 
            className="text-xs font-bold text-slate-500 hover:text-red-600 hover:underline px-2 py-1 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>

        {/* Filtered Shipment Table */}
        <ShipmentTable 
          customShipments={filteredManagerShipments}
          title={`Shipment Directory (${managerStageFilter.replace('_', ' ')})`}
          limit={10} 
        />
      </div>

      {/* 4. Operational Flow & Milestones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Volume Trend Chart */}
        <div className="lg:col-span-2">
          <LineTrendChart
            title="Operational Shipment Volume Trend"
            data={trendData}
            activeMetric="volume"
          />
        </div>

        {/* Right Col: Ocean vs Air & Exceptions */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-600" />
              <span>Ocean vs Air Volume Share</span>
            </h3>

            <DonutDistributionChart data={modeDonutData} height={140} />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Attention Required</span>
              </h3>
              <button 
                onClick={() => navigate('/alerts')}
                className="text-[11px] text-red-600 hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {criticalAlerts.map(alt => (
                <div 
                  key={alt.id}
                  onClick={() => setSideDrawerShipmentId(alt.shipmentId)}
                  className="p-2.5 bg-red-50/50 border border-red-200 hover:border-red-400 rounded-lg cursor-pointer transition-colors text-xs space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 group-hover:text-red-600">{alt.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{alt.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{alt.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
