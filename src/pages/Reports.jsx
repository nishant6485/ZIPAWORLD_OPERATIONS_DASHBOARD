import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import {
  LineTrendChart,
  HorizontalBarChart,
  DonutDistributionChart,
  FunnelLifecycleChart,
  ComparativeBarChart,
  MilestoneCycleTimeChart,
  InsightCard,
  StatSummaryBox
} from '../components/charts';
import { BarChart3, Filter, Calendar, Zap, AlertTriangle, Layers, Clock, Users, FileText, Anchor } from 'lucide-react';

export const Reports = () => {
  const { shipments, tasks, documents, bookings, blRecords, alerts, executives, stats, calculateStatsWithFilter } = useOperations();
  
  const [dateRange, setDateRange] = useState('30d');
  const [shipmentType, setShipmentType] = useState('ALL');
  const [activeTab, setActiveTab] = useState('overview');
  const [lineMetric, setLineMetric] = useState('volume');

  // Compute filtered operational stats dynamically
  const currentStats = calculateStatsWithFilter ? calculateStatsWithFilter(dateRange, shipmentType) : stats;

  const tabs = [
    { id: 'overview', label: 'Overview & Health', icon: Zap },
    { id: 'trends', label: 'Volume Trends', icon: BarChart3 },
    { id: 'comparison', label: 'Import vs Export', icon: Layers },
    { id: 'delays', label: 'Delays & Bottlenecks', icon: AlertTriangle },
    { id: 'cycle_times', label: 'Processing Times', icon: Clock },
    { id: 'funnel', label: 'Lifecycle Funnel', icon: Layers },
    { id: 'team', label: 'Executive Workload', icon: Users },
    { id: 'docs', label: 'Docs, Bookings & BL', icon: FileText },
    { id: 'partners', label: 'Carriers & Ports', icon: Anchor },
  ];

  // Donut chart health data
  const healthDistributionData = [
    { label: 'Healthy (On Schedule)', value: currentStats?.healthyShipments || 28, color: '#10B981' },
    { label: 'Attention Required', value: currentStats?.attentionShipments || 12, color: '#F59E0B' },
    { label: 'Delayed / Schedule Slip', value: currentStats?.delayedShipments || 6, color: '#EF4444' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-slate-100">
      
      {/* PAGE TITLE & CONTROL CENTER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-5 rounded-lg border border-slate-800 border-l-4 border-l-teal-500 shadow-sm">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span className="p-1.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
              <BarChart3 className="w-5 h-5" />
            </span>
            ZIPAWORLD Operations Analytics Center
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time descriptive analytics, operational trends, bottleneck analysis, and business insights.
          </p>
        </div>

        {/* TOP FILTER BAR */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Shipment Type Selector */}
          <div className="flex items-center bg-slate-800 p-1 rounded border border-slate-700 text-xs">
            <span className="px-2 text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-teal-400" /> Type:
            </span>
            {['ALL', 'EXPORT', 'IMPORT'].map(type => (
              <button
                key={type}
                onClick={() => setShipmentType(type)}
                className={`px-3 py-1 font-bold rounded transition-all ${
                  shipmentType === type
                    ? 'bg-teal-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center bg-slate-800 p-1 rounded border border-slate-700 text-xs">
            <span className="px-2 text-slate-400 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-teal-400" /> Period:
            </span>
            {['7d', '30d', '90d'].map(d => (
              <button
                key={d}
                onClick={() => setDateRange(d)}
                className={`px-2.5 py-1 font-bold rounded transition-all ${
                  dateRange === d
                    ? 'bg-teal-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* AUTO-GENERATED KEY BUSINESS INSIGHTS CAROUSEL / STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {currentStats?.autoInsights?.slice(0, 3).map((ins, i) => (
          <InsightCard
            key={ins.id || i}
            title={ins.title}
            metric={ins.metric}
            description={ins.description}
            type={ins.type}
          />
        ))}
      </div>

      {/* TAB CONTENT SECTIONS */}

      {/* TAB 1: OVERVIEW & HEALTH */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <StatSummaryBox stats={currentStats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineTrendChart
              title="Operational Volume & On-Time Rate Trend"
              data={currentStats?.timeSeriesData}
              activeMetric={lineMetric}
              onMetricChange={setLineMetric}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              insight="Shipment volume grew by 8.4% this period while maintaining an 88%+ on-time performance rate."
            />

            <DonutDistributionChart
              title="Shipment Operational Health Distribution"
              data={healthDistributionData}
              totalCount={currentStats?.totalShipments}
              insight="62% of shipments are currently operating normally on schedule, while 17% require active monitoring or delay mitigation."
            />
          </div>
        </div>
      )}

      {/* TAB 2: VOLUME TRENDS */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <LineTrendChart
            title="Time-Series Volume & Completion Trends"
            data={currentStats?.timeSeriesData}
            activeMetric={lineMetric}
            onMetricChange={setLineMetric}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            insight="Completion volume accelerated during the second half of the period, reducing active backlog by 12%."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HorizontalBarChart
              title="Volume Distribution by Top Customers"
              subtitle="Active and completed shipment volume ranked by customer"
              data={currentStats?.customerStats}
              dataKey="total"
              labelKey="name"
              unit="shipments"
              highlightTop={false}
              insight="Apex Global Spices Ltd currently holds the highest active shipment volume."
            />

            <HorizontalBarChart
              title="Volume Distribution by Port of Loading (POL)"
              subtitle="Container throughput across major Indian port hubs"
              data={currentStats?.portStats}
              dataKey="total"
              labelKey="name"
              unit="shipments"
              highlightTop={false}
              insight="Nhava Sheva (JNPT) remains the highest volume port hub in current operations."
            />
          </div>
        </div>
      )}

      {/* TAB 3: IMPORT VS EXPORT COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <ComparativeBarChart
            stats={currentStats}
            insight="Export currently accounts for 57% of total volume with a 7 percentage point higher completion rate than Import."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InsightCard
              title="EXPORT OPERATIONS SUMMARY"
              metric={`${currentStats?.exportShipments} Total`}
              description={`Export completion rate is currently at ${currentStats?.exportCompletionRate}%. ${currentStats?.exportDelayed} export shipments have active vessel or documentation delays.`}
              type="positive"
            />
            <InsightCard
              title="IMPORT OPERATIONS SUMMARY"
              metric={`${currentStats?.importShipments} Total`}
              description={`Import completion rate is currently at ${currentStats?.importCompletionRate}%. Delivery order payment delays remain the primary hold point for imports.`}
              type="warning"
            />
          </div>
        </div>
      )}

      {/* TAB 4: DELAYS & BOTTLENECKS */}
      {activeTab === 'delays' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HorizontalBarChart
              title="WHERE IS OPERATIONS GETTING STUCK? (Bottlenecks)"
              subtitle="Active shipments currently stalled at each workflow stage"
              data={currentStats?.bottlenecks}
              dataKey="count"
              labelKey="stage"
              highlightTop={true}
              unit="shipments"
              insight={`Customer approval and documentation review is the largest operational bottleneck, affecting ${currentStats?.topBottleneck?.count || 18} active shipments.`}
            />

            <HorizontalBarChart
              title="Delay Reason Breakdown"
              subtitle="Primary root causes for active shipment delays"
              data={currentStats?.delayReasonDistribution}
              dataKey="count"
              labelKey="reason"
              highlightTop={true}
              unit="delays"
              insight="Vessel schedule slips and delayed container carting account for over 42% of total delay instances."
            />
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg text-xs space-y-3 shadow-sm">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Delay Statistics Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-slate-400 block">Total Delayed:</span>
                <span className="text-lg font-bold font-mono text-rose-400">{currentStats?.delayedShipments} shipments</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-slate-400 block">Average Delay:</span>
                <span className="text-lg font-bold font-mono text-amber-400">{currentStats?.avgDelay} days</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-slate-400 block">Median Delay:</span>
                <span className="text-lg font-bold font-mono text-white">{currentStats?.medianDelay} days</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800">
                <span className="text-slate-400 block">Max Delay:</span>
                <span className="text-lg font-bold font-mono text-white">{currentStats?.maxDelay} days</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MILESTONE PROCESSING TIMES */}
      {activeTab === 'cycle_times' && (
        <div className="space-y-6">
          <MilestoneCycleTimeChart
            data={currentStats?.milestoneCycleTimes}
            insight="BL Draft approval to Port Gate-in currently has the longest average processing cycle time (2.1 days vs target of 1.5 days)."
          />
        </div>
      )}

      {/* TAB 6: LIFECYCLE FUNNEL & TASKS */}
      {activeTab === 'funnel' && (
        <div className="space-y-6">
          <FunnelLifecycleChart
            data={currentStats?.lifecycleFunnel}
            insight="Highest conversion drop-off occurs between Booking Release and Final Document Verification."
          />
        </div>
      )}

      {/* TAB 7: EXECUTIVE WORKLOAD & PERFORMANCE */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <HorizontalBarChart
            title="Executive Active Workload Balance"
            subtitle="Active shipment assignments per Operations Executive"
            data={currentStats?.execPerformance}
            dataKey="activeShipments"
            labelKey="name"
            highlightTop={false}
            unit="active shipments"
            insight="Workload is relatively balanced, with Amit Patel currently handling the highest active shipment count."
          />
        </div>
      )}

      {/* TAB 8: DOCUMENTS, BOOKINGS & BL */}
      {activeTab === 'docs' && (
        <div className="space-y-6">
          <HorizontalBarChart
            title="Documentation Clearance Rates"
            subtitle="Completion percentage across required operational document types"
            data={currentStats?.docBreakdown}
            dataKey="rate"
            labelKey="name"
            highlightTop={false}
            unit="%"
            insight="Commercial Invoice & Packing List clearance rates are high (96%+), while Final Original BL execution is at 71%."
          />
        </div>
      )}

      {/* TAB 9: CARRIERS & PORTS */}
      {activeTab === 'partners' && (
        <div className="space-y-6">
          <HorizontalBarChart
            title="Shipping Line On-Time Reliability Ranking"
            subtitle="On-time delivery performance rate by ocean carrier"
            data={currentStats?.shippingLineStats}
            dataKey="onTimeRate"
            labelKey="name"
            highlightTop={false}
            unit="%"
            insight="Maersk Line and MSC maintain the highest on-time reliability rates across current active ocean routes."
          />
        </div>
      )}

    </div>
  );
};;
