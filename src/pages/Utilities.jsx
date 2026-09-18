import React from 'react';
import { mockShippingLineStats, mockTopPODs } from '../data/mockReports.js';
import { useOperations } from '../context/OperationsContext';
import { Sliders, Ship, MapPin } from 'lucide-react';

export const Utilities = () => {
  const { stats } = useOperations();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-red-500" />
            <span>Port Utilities & Shipping Line Performance Matrix</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational benchmarks for ocean carriers (MSC, Maersk, CMA CGM, Hapag-Lloyd, ONE) and global destination hub ports
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden space-y-3 p-5">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-200">
          <Ship className="w-4 h-4 text-red-600" /> Carrier Reliability & On-Time Performance Rating
        </h3>

        <table className="w-full text-left text-xs text-slate-700 divide-y divide-slate-200">
          <thead className="bg-slate-900 text-slate-200 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-3.5">Ocean Carrier</th>
              <th className="py-3.5 px-3.5">SCAC Code</th>
              <th className="py-3.5 px-3.5">Active Shipments</th>
              <th className="py-3.5 px-3.5">Bookings (MTD)</th>
              <th className="py-3.5 px-3.5">On-Time %</th>
              <th className="py-3.5 px-3.5">Avg Delay</th>
              <th className="py-3.5 px-3.5">Pending BLs</th>
              <th className="py-3.5 px-3.5">Performance Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {mockShippingLineStats.map((line) => (
              <tr key={line.code} className="hover:bg-slate-50 transition">
                <td className="py-3 px-3.5 font-bold text-slate-900">{line.carrier}</td>
                <td className="py-3 px-3.5 font-mono text-slate-700 font-bold">{line.code}</td>
                <td className="py-3 px-3.5 font-extrabold text-red-600 font-mono">{line.activeShipments}</td>
                <td className="py-3 px-3.5 font-semibold">{line.bookingsThisMonth}</td>
                <td className="py-3 px-3.5">
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                    {line.onTimePercentage}%
                  </span>
                </td>
                <td className="py-3 px-3.5 text-slate-600 font-semibold">{line.avgDelayDays} days</td>
                <td className="py-3 px-3.5 font-bold text-amber-700">{line.pendingBLs}</td>
                <td className="py-3 px-3.5">
                  <span className="text-[10px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded border border-slate-200">
                    Tier 1 Preferred
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-200">
          <MapPin className="w-4 h-4 text-red-600" /> Top Destination Discharge Hub Ports (POD)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {mockTopPODs.map((pod) => (
            <div key={pod.code} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                {pod.code}
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">{pod.portName}</h4>
              <p className="text-[11px] text-slate-500 font-medium">{pod.country}</p>
              <div className="pt-2 flex justify-between text-xs font-bold text-slate-800 border-t border-slate-200 mt-2">
                <span>{pod.activeShipments} Active</span>
                <span className="text-red-600 font-mono">{pod.sharePercentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
