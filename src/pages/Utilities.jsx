import React from 'react';
import { mockShippingLineStats, mockTopPODs } from '../data/mockReports.js';
import { useOperations } from '../context/OperationsContext';
import { Sliders, Ship, MapPin } from 'lucide-react';

export const Utilities = () => {
  const { stats } = useOperations();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border border-slate-800 border-l-4 border-l-teal-500 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-teal-400" />
            <span>Port Utilities & Shipping Line Performance Matrix</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational benchmarks for ocean carriers (MSC, Maersk, CMA CGM, Hapag-Lloyd, ONE) and global destination hub ports
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 shadow-sm overflow-hidden space-y-3 p-5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
          <Ship className="w-4 h-4 text-teal-400" /> Carrier Reliability & On-Time Performance Rating
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
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
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {mockShippingLineStats.map((line) => (
                <tr key={line.code} className="hover:bg-slate-800/50 transition">
                  <td className="py-3 px-3.5 font-bold text-white">{line.carrier}</td>
                  <td className="py-3 px-3.5 font-mono text-slate-300 font-bold">{line.code}</td>
                  <td className="py-3 px-3.5 font-extrabold text-teal-400 font-mono">{line.activeShipments}</td>
                  <td className="py-3 px-3.5 font-semibold text-slate-300">{line.bookingsThisMonth}</td>
                  <td className="py-3 px-3.5">
                    <span className="font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                      {line.onTimePercentage}%
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-slate-400 font-semibold">{line.avgDelayDays} days</td>
                  <td className="py-3 px-3.5 font-bold text-amber-400">{line.pendingBLs}</td>
                  <td className="py-3 px-3.5">
                    <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-700">
                      Tier 1 Preferred
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-900 p-5 rounded-lg border border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
          <MapPin className="w-4 h-4 text-teal-400" /> Top Destination Discharge Hub Ports (POD)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {mockTopPODs.map((pod) => (
            <div key={pod.code} className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
              <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">
                {pod.code}
              </span>
              <h4 className="text-xs font-bold text-white mt-1">{pod.portName}</h4>
              <p className="text-[11px] text-slate-400 font-medium">{pod.country}</p>
              <div className="pt-2 flex justify-between text-xs font-bold text-slate-300 border-t border-slate-800 mt-2">
                <span>{pod.activeShipments} Active</span>
                <span className="text-teal-400 font-mono">{pod.sharePercentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
