import React from 'react';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { FileCheck, Ship, Plane, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export function BLManagement() {
  const { blRecords, setSideDrawerShipmentId } = useOperations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-red-500" />
            <span>BL & Air Waybill Lifecycle Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Master Bill of Lading (MBL), House Bill of Lading (HBL), Master Air Waybill (MAWB), and HAWB execution tracker.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-xs font-bold text-slate-200">
          {blRecords.length} Active Waybill Records
        </div>
      </div>

      <FilterBar />

      {/* BL & AWB Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 font-bold text-xs text-slate-900 bg-slate-50">
          Bills of Lading & Air Waybills Directory
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold">
                <th className="py-3 px-4">BL / AWB Number</th>
                <th className="py-3 px-4">Mode & Type</th>
                <th className="py-3 px-4">Shipment ID</th>
                <th className="py-3 px-4">Shipper → Consignee</th>
                <th className="py-3 px-4">Vessel / Flight</th>
                <th className="py-3 px-4">Status & Lifecycle Stage</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {blRecords.map((bl) => (
                <tr key={bl.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900 font-mono">{bl.blNumber}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {bl.mode} ({bl.blType})
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-red-600 cursor-pointer hover:underline" onClick={() => setSideDrawerShipmentId(bl.shipmentId)}>
                    {bl.shipmentId}
                  </td>
                  <td className="py-3 px-4 text-slate-800">
                    <div className="font-semibold text-slate-900">{bl.shipper}</div>
                    <div className="text-[10px] text-slate-500">To: {bl.consignee}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{bl.vesselFlight}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-red-600">{bl.status}</div>
                    <div className="text-[10px] text-slate-500">{bl.stage}</div>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button onClick={() => setSideDrawerShipmentId(bl.shipmentId)} className="text-red-600 hover:underline text-xs font-semibold">
                      Inspect 360
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
