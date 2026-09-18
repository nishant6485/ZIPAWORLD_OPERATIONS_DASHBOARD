import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { KpiCard } from '../components/KpiCard';
import { ShipmentTable } from '../components/ShipmentTable';
import { 
  LineTrendChart, 
  DonutDistributionChart,
  HorizontalBarChart,
  ComparativeBarChart
} from '../components/charts';
import { 
  Ship, 
  Plane, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Package, 
  Activity, 
  FileText, 
  ArrowRight,
  ChevronRight,
  Users,
  CheckSquare
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { shipments, stats, alerts, setSideDrawerShipmentId, executives } = useOperations();

  const [activeKpiFilter, setActiveKpiFilter] = useState('ALL');

  // Filter priority shipments based on active KPI card click
  const priorityShipments = shipments.filter(s => {
    if (activeKpiFilter === 'ATTENTION') return s.health === 'Delayed' || s.health === 'At Risk' || s.health === 'Attention Required';
    if (activeKpiFilter === 'DUE_TODAY') return s.eta === new Date().toISOString().slice(0,10) || s.health === 'At Risk';
    if (activeKpiFilter === 'DELAYED') return s.health === 'Delayed' || s.delayDays > 0;
    if (activeKpiFilter === 'ON_TIME') return s.health === 'Healthy' && s.delayDays === 0;
    if (activeKpiFilter === 'DOCS') return s.currentStatus.includes('SI') || s.currentStatus.includes('BL') || s.currentStatus.includes('Doc');
    if (activeKpiFilter === 'COMPLETED') return s.status === 'Completed' || s.currentStatus === 'Delivered';
    return s.status !== 'Completed'; // Active default
  });

  const modeDonutData = [
    { name: 'Ocean Freight', value: stats.oceanCount, color: '#0284C7' },
    { name: 'Air Freight', value: stats.airCount, color: '#0D9488' }
  ];

  const bottleneckData = [
    { stage: 'Pre-alert & Booking', count: 8, percentage: 32, color: '#3B82F6' },
    { stage: 'Customs BOE Clearance', count: 6, percentage: 24, color: '#E11D48' },
    { stage: 'Vessel / Flight Gate-In', count: 5, percentage: 20, color: '#F59E0B' },
    { stage: 'BL / AWB Execution', count: 4, percentage: 16, color: '#0D9488' },
    { stage: 'Final Gate-Out & Delivery', count: 2, percentage: 8, color: '#10B981' }
  ];

  const criticalAlerts = alerts.filter(a => a.status === 'Open' && (a.severity === 'Critical' || a.severity === 'High')).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-900">
      
      {/* 1. Global Filter Toolbar */}
      <FilterBar />

      {/* 2. Core KPIs Section (5–7 Important Operational Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3">
        <KpiCard
          title="Active Shipments"
          value={stats.activeShipments}
          subtitle="In Transit / Operational"
          icon={Package}
          iconBgColor="bg-blue-50"
          iconTextColor="text-blue-600"
          isActive={activeKpiFilter === 'ALL'}
          onClick={() => setActiveKpiFilter('ALL')}
        />

        <KpiCard
          title="Needs Attention"
          value={stats.needsAttentionCount}
          subtitle="Pending Action Items"
          icon={AlertTriangle}
          iconBgColor="bg-amber-50"
          iconTextColor="text-amber-600"
          trendType="warning"
          trend={`${stats.needsAttentionCount} items`}
          isActive={activeKpiFilter === 'ATTENTION'}
          onClick={() => setActiveKpiFilter('ATTENTION')}
        />

        <KpiCard
          title="Due Today"
          value={stats.dueTodayCount}
          subtitle="Milestones Due"
          icon={Clock}
          iconBgColor="bg-sky-50"
          iconTextColor="text-sky-600"
          isActive={activeKpiFilter === 'DUE_TODAY'}
          onClick={() => setActiveKpiFilter('DUE_TODAY')}
        />

        <KpiCard
          title="Delayed"
          value={stats.delayedShipments}
          subtitle="Behind Schedule"
          icon={AlertTriangle}
          iconBgColor="bg-rose-50"
          iconTextColor="text-rose-600"
          trendType="danger"
          trend={`+${stats.delayedShipments}`}
          isActive={activeKpiFilter === 'DELAYED'}
          onClick={() => setActiveKpiFilter('DELAYED')}
        />

        <KpiCard
          title="On-Time"
          value={stats.activeShipments - stats.delayedShipments}
          subtitle="Meeting SLAs"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
          trendType="up"
          trend={`${stats.onTimeRate}%`}
          isActive={activeKpiFilter === 'ON_TIME'}
          onClick={() => setActiveKpiFilter('ON_TIME')}
        />

        <KpiCard
          title="Pending Docs"
          value={stats.pendingDocs}
          subtitle="BL/AWB & Customs"
          icon={FileText}
          iconBgColor="bg-purple-50"
          iconTextColor="text-purple-600"
          isActive={activeKpiFilter === 'DOCS'}
          onClick={() => setActiveKpiFilter('DOCS')}
        />

        <KpiCard
          title="Completed"
          value={stats.completedShipments}
          subtitle="Delivered Records"
          icon={CheckCircle2}
          iconBgColor="bg-teal-50"
          iconTextColor="text-teal-600"
          isActive={activeKpiFilter === 'COMPLETED'}
          onClick={() => setActiveKpiFilter('COMPLETED')}
        />
      </div>

      {/* 3. Primary Visual — Shipment Volume Trend */}
      <LineTrendChart
        title="Primary Shipment Volume Trend"
        activeMetric="volume"
        insight="Shipment volume peaks mid-month with high on-time delivery rates across Ocean and Air routes."
      />

      {/* 4. Secondary Visuals — Ocean vs Air Share & Import vs Export Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonutDistributionChart
          title="Ocean vs Air Shipment Volume Share"
          subtitle="Distribution of operational workload across freight modes"
          data={modeDonutData}
          totalCount={stats.totalShipments}
          insight="Ocean freight accounts for 60% of volume, with Air freight driving urgent time-sensitive movements."
        />

        <ComparativeBarChart
          title="Import vs Export Operational Workload"
          subtitle="Side-by-side performance metrics across freight directions"
          stats={stats}
          insight="Export shipments demonstrate 94% on-time execution, while Import clearance requires close customs follow-up."
        />
      </div>

      {/* 5. Operational Analysis — Workflow Bottlenecks & Exceptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Bottlenecks */}
        <div className="lg:col-span-2">
          <HorizontalBarChart
            title="Workflow Bottlenecks Analysis"
            subtitle="Shipments currently waiting at each operational milestone stage"
            data={bottleneckData}
            dataKey="count"
            labelKey="stage"
            insight="Customs BOE clearance represents the primary operational bottleneck (24% of pending workload)."
          />
        </div>

        {/* Right Col: Attention Items & Alerts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Operational Exceptions</span>
            </h3>
            <button 
              onClick={() => navigate('/alerts')}
              className="text-[11px] text-blue-600 hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
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
                className="p-3 bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-lg cursor-pointer transition-colors text-xs space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 group-hover:text-blue-600">{alt.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{alt.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-1">{alt.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Team Workload Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Operations Team Workload Management</span>
          </h3>
          <button
            onClick={() => navigate('/manager-view')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Manager View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {executives.map(exec => (
            <div key={exec.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-xs">{exec.name}</div>
                <div className="text-[10px] text-slate-500">{exec.role}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-blue-600 text-sm">{exec.activeCount} Active</div>
                <div className="text-[10px] text-emerald-700 font-semibold">{exec.completedCount} Completed</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Priority Shipments Table (5–8 records preview with drawer trigger) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Priority Operational Records</span>
            {activeKpiFilter !== 'ALL' && (
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Filtered: {activeKpiFilter}
              </span>
            )}
          </h3>
          <button
            onClick={() => navigate('/shipments')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Shipments →</span>
          </button>
        </div>

        <ShipmentTable
          customShipments={priorityShipments}
          title="Priority Operations Directory"
          limit={6}
        />
      </div>

    </div>
  );
}

