import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { 
  LineTrendChart, 
  DonutDistributionChart, 
  HorizontalBarChart, 
  ComparativeBarChart 
} from '../components/charts';
import { 
  BarChart3, 
  Ship, 
  Plane, 
  Layers, 
  Clock, 
  TrendingUp, 
  Users, 
  Anchor, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Zap,
  Activity,
  CheckCircle2,
  PieChart,
  Award
} from 'lucide-react';

export function Analytics() {
  const { stats } = useOperations();
  
  // Analytics Active Tab State: 'overview' | 'volume' | 'performance' | 'delays' | 'carrierTeam'
  const [activeTab, setActiveTab] = useState('overview');
  const [isDrilldownOpen, setIsDrilldownOpen] = useState(false);

  const modeDonutData = [
    { name: 'Ocean Freight', value: stats.oceanCount, color: '#0284C7' },
    { name: 'Air Freight', value: stats.airCount, color: '#0D9488' }
  ];

  const directionDonutData = [
    { name: 'Export Operations', value: stats.exportCount, color: '#10B981' },
    { name: 'Import Operations', value: stats.importCount, color: '#F59E0B' }
  ];

  const statusDonutData = [
    { name: 'Healthy', value: stats.completedShipments + 10, color: '#10B981' },
    { name: 'Attention Required', value: stats.activeShipments - 5, color: '#F59E0B' },
    { name: 'Delayed', value: stats.delayedShipments, color: '#EF4444' }
  ];

  const volumeTrendData = [
    { label: 'Week 1', volume: 18, completed: 14, delayed: 2, onTimeRate: 92 },
    { label: 'Week 2', volume: 24, completed: 19, delayed: 3, onTimeRate: 88 },
    { label: 'Week 3', volume: 29, completed: 22, delayed: 2, onTimeRate: 93 },
    { label: 'Week 4', volume: stats.totalShipments, completed: stats.completedShipments, delayed: stats.delayedShipments, onTimeRate: stats.onTimeRate }
  ];

  const modeComparisonData = [
    { name: 'Active Volume', Ocean: stats.oceanCount, Air: stats.airCount },
    { name: 'Completed', Ocean: Math.round(stats.oceanCount * 0.4), Air: Math.round(stats.airCount * 0.45) },
    { name: 'Delayed', Ocean: Math.round(stats.oceanCount * 0.1), Air: Math.round(stats.airCount * 0.08) }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-md border-l-4 border-teal-500 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-teal-400" />
            <span>Visual Analytics Workspace</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Operational statistics, volume dynamics, cycle times, bottleneck analysis, and carrier metrics.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded px-4 py-2 text-xs font-bold text-slate-200">
          Single Source Operational Data Engine
        </div>
      </div>

      {/* Global Filter Bar */}
      <FilterBar />

      {/* ANALYTICS TAB NAVIGATION (Horizontally Scrollable on Mobile) */}
      <div className="flex border border-slate-800 bg-slate-900 rounded-lg p-1 text-xs font-bold gap-2 overflow-x-auto whitespace-nowrap scrollbar-none shadow-md">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'volume', label: 'Volume Trends', icon: TrendingUp },
          { id: 'performance', label: 'Performance & Cycle Times', icon: Clock },
          { id: 'delays', label: 'Delays & Bottlenecks', icon: AlertTriangle },
          { id: 'carrierTeam', label: 'Carrier & Port Performance', icon: Award }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-teal-500 text-slate-950 shadow-xs font-black' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 PRIMARY KEY KPIS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-md space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Shipments Volume</div>
              <div className="text-3xl font-black text-white">{stats.totalShipments}</div>
              <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                <span>Active: <strong className="text-teal-400">{stats.activeShipments}</strong></span>
                <span>Completed: <strong className="text-emerald-400">{stats.completedShipments}</strong></span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-md space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">On-Time Performance Rate</div>
              <div className="text-3xl font-black text-emerald-400">{stats.onTimeRate}%</div>
              <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                <span>Delayed: <strong className="text-rose-400">{stats.delayedShipments} ({stats.delayRate}%)</strong></span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-md space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mean Processing Time</div>
              <div className="text-3xl font-black text-teal-400">{stats.meanProcessingTime} days</div>
              <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                <span>Median: <strong className="text-white">{stats.medianProcessingTime}d</strong></span>
                <span>P95: <strong className="text-white">{stats.p95ProcessingTime}d</strong></span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-md space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Task Clearance Rate</div>
              <div className="text-3xl font-black text-white">{stats.taskCompletionRate}%</div>
              <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                <span>Pending: <strong className="text-white">{stats.pendingTasks}</strong></span>
                <span>Overdue: <strong className="text-rose-400">{stats.overdueTasks}</strong></span>
              </div>
            </div>
          </div>

          {/* 2 PROMINENT SPACIOUS CHARTS ONLY FOR OVERVIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LineTrendChart
                title="Shipment Volume & Completion Rate Trend"
                subtitle="Weekly shipment execution trajectory"
                data={volumeTrendData}
                activeMetric="volume"
              />
            </div>

            <div>
              <DonutDistributionChart 
                title="Operational Health Distribution"
                subtitle="Proportion of shipments by health"
                data={statusDonutData}
                insight="79% of active shipments are operating within normal milestone SLA boundaries."
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VOLUME TRENDS */}
      {activeTab === 'volume' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Ship className="w-4 h-4 text-teal-400" />
                <span>Ocean vs Air Volume Distribution</span>
              </h3>
              <DonutDistributionChart 
                title="Mode Share (Ocean vs Air)"
                subtitle="Volume split by transport mode"
                data={modeDonutData}
              />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Direction Distribution (Export vs Import)</span>
              </h3>
              <DonutDistributionChart 
                title="Trade Direction Share"
                subtitle="Volume split by Export and Import"
                data={directionDonutData}
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Mode Volume Breakdown (Active vs Completed vs Delayed)</span>
            </h3>
            <ComparativeBarChart data={modeComparisonData} height={280} />
          </div>
        </div>
      )}

      {/* TAB 3: PERFORMANCE & CYCLE TIMES */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg text-center shadow-md">
              <span className="text-xs font-bold text-slate-400 uppercase">Mean Cycle Time</span>
              <div className="text-3xl font-black text-teal-400 mt-2">{stats.meanProcessingTime} Days</div>
              <span className="text-[10px] text-slate-400 mt-1 block">Average booking to delivery</span>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg text-center shadow-md">
              <span className="text-xs font-bold text-slate-400 uppercase">Median Cycle Time</span>
              <div className="text-3xl font-black text-white mt-2">{stats.medianProcessingTime} Days</div>
              <span className="text-[10px] text-slate-400 mt-1 block">Median turnaround duration</span>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg text-center shadow-md">
              <span className="text-xs font-bold text-slate-400 uppercase">P95 Upper SLA Boundary</span>
              <div className="text-3xl font-black text-amber-400 mt-2">{stats.p95ProcessingTime} Days</div>
              <span className="text-[10px] text-slate-400 mt-1 block">95% shipments completed within</span>
            </div>
          </div>

          {/* DESCRIPTIVE STATISTICAL DATA SCIENCE PANEL */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Descriptive Statistical Measures & Processing Metrics</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Calculated dataset distribution statistics</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
              <div className="p-3.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Mean</div>
                <div className="text-lg font-bold text-teal-400 mt-1">{stats.meanProcessingTime} d</div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Median</div>
                <div className="text-lg font-bold text-white mt-1">{stats.medianProcessingTime} d</div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">P95 SLA</div>
                <div className="text-lg font-bold text-amber-400 mt-1">{stats.p95ProcessingTime} d</div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Min Time</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">{stats.minProcessingTime} d</div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Max Time</div>
                <div className="text-lg font-bold text-rose-400 mt-1">{stats.maxProcessingTime} d</div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Std Dev (σ)</div>
                <div className="text-lg font-bold text-slate-200 mt-1">{stats.stdDevProcessingTime} d</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white">Calculated Insights</h4>
              {stats.insights.map((insightText, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-300 flex items-start gap-2">
                  <span className="text-teal-400 font-bold">•</span>
                  <span>{insightText}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DELAYS & BOTTLENECKS */}
      {activeTab === 'delays' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Workflow Process Bottlenecks & Delay Reasons</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Stage accumulation analysis and primary delay categories</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold text-slate-300 mb-3">Accumulating Workflow Stages</h4>
                <HorizontalBarChart data={stats.processBottlenecks} title="" barColor="#0D9488" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 mb-3">Delay Reasons Breakdown</h4>
                <div className="space-y-2 text-xs">
                  {stats.delayReasonsList.map((d, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-950 rounded border border-slate-800">
                      <span className="font-semibold text-slate-200">{d.reason}</span>
                      <span className="font-bold text-rose-400">{d.count} Shipments Affected</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CARRIER & PORT PERFORMANCE */}
      {activeTab === 'carrierTeam' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Ship className="w-4 h-4 text-teal-400" />
                <span>Carrier & Airline On-Time Performance</span>
              </h3>

              <div className="space-y-3 text-xs">
                {stats.carrierPerformance.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-950 rounded border border-slate-800">
                    <div>
                      <div className="font-bold text-white text-sm">{c.carrier}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{c.volume} Total Volume</div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${
                        c.onTimeRate >= 90 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {c.onTimeRate}% On-Time
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Anchor className="w-4 h-4 text-teal-400" />
                <span>Port & Airport Activity Volumes</span>
              </h3>

              <div className="space-y-3 text-xs">
                {stats.portAirportList.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-950 rounded border border-slate-800">
                    <span className="font-semibold text-slate-200 text-sm">{p.location}</span>
                    <span className="font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/30">{p.volume} Shipments</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

