import React from 'react';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { Calendar, Ship, Plane, CheckCircle2, Clock, Plus } from 'lucide-react';

export function Bookings() {
  const { bookings, stats, setSideDrawerShipmentId } = useOperations();

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border border-slate-800 border-l-4 border-l-teal-500 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-teal-400" />
            <span>Space & Booking Tracker</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ocean shipping line space releases & Air freight airline flight space allotments.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-xs font-bold text-teal-400">
          {stats.bookingConfirmationRate}% Booking Confirmation Rate
        </div>
      </div>

      <FilterBar />

      {/* Booking List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-800 font-bold text-xs text-white bg-slate-950">
          Carrier Space Booking Requests
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-semibold">
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Shipment ID</th>
                <th className="py-3 px-4">Carrier / Airline</th>
                <th className="py-3 px-4">Vessel / Flight</th>
                <th className="py-3 px-4">Space / Equipment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/50">
                  <td className="py-3 px-4 font-bold text-white font-mono">{b.bookingNo}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {b.mode} {b.direction}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-400 cursor-pointer hover:underline" onClick={() => setSideDrawerShipmentId(b.shipmentId)}>
                    {b.shipmentId}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-200">{b.carrier}</td>
                  <td className="py-3 px-4 text-slate-400">{b.vesselFlight}</td>
                  <td className="py-3 px-4 text-slate-400">{b.equipmentSpace}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => setSideDrawerShipmentId(b.shipmentId)} className="text-teal-400 hover:underline text-xs font-semibold">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
