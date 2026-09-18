import React from 'react';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { FileText, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Download } from 'lucide-react';

export function Documentation() {
  const { documents, stats, setSideDrawerShipmentId } = useOperations();

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border border-slate-800 border-l-4 border-l-teal-500 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-teal-400" />
            <span>Documentation Compliance Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verification queue for Shipping Instructions, Draft BLs, MAWB/HAWB, Invoices, and Customs Bills.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-xs font-bold text-teal-400">
          {stats.docCompletionRate}% Compliance Rate
        </div>
      </div>

      <FilterBar />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Tracked Docs</div>
          <div className="text-2xl font-black text-white mt-1">{stats.totalDocs}</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-400">Approved Documents</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{stats.approvedDocs}</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-400">Pending Verification</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{stats.pendingDocs}</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-400">Doc Clearance Rate</div>
          <div className="text-2xl font-black text-teal-400 mt-1">{stats.docCompletionRate}%</div>
        </div>
      </div>

      {/* Document Queue Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-800 font-bold text-xs text-white bg-slate-950">
          Document Queue & Verification Status
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-semibold">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Shipment ID</th>
                <th className="py-3 px-4">Doc Type</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/50">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {doc.mode || 'Ocean'} {doc.direction}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-400 cursor-pointer hover:underline" onClick={() => setSideDrawerShipmentId(doc.shipmentId)}>
                    {doc.shipmentId}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{doc.type}</td>
                  <td className="py-3 px-4 text-slate-400">{doc.updatedAt}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      doc.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => setSideDrawerShipmentId(doc.shipmentId)} className="text-teal-400 hover:underline text-xs font-semibold">
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
