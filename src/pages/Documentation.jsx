import React from 'react';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { FileText, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Download } from 'lucide-react';

export function Documentation() {
  const { documents, stats, setSideDrawerShipmentId } = useOperations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-red-500" />
            <span>Documentation Compliance Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verification queue for Shipping Instructions, Draft BLs, MAWB/HAWB, Invoices, and Customs Bills.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-xs font-bold text-slate-200">
          {stats.docCompletionRate}% Compliance Rate
        </div>
      </div>

      <FilterBar />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">Total Tracked Docs</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalDocs}</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">Approved Documents</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{stats.approvedDocs}</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">Pending Verification</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{stats.pendingDocs}</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">Doc Clearance Rate</div>
          <div className="text-2xl font-black text-red-600 mt-1">{stats.docCompletionRate}%</div>
        </div>
      </div>

      {/* Document Queue Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 font-bold text-xs text-slate-900 bg-slate-50">
          Document Queue & Verification Status
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Shipment ID</th>
                <th className="py-3 px-4">Doc Type</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {doc.mode || 'Ocean'} {doc.direction}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-red-600 cursor-pointer hover:underline" onClick={() => setSideDrawerShipmentId(doc.shipmentId)}>
                    {doc.shipmentId}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{doc.type}</td>
                  <td className="py-3 px-4 text-slate-500">{doc.updatedAt}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      doc.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => setSideDrawerShipmentId(doc.shipmentId)} className="text-red-600 hover:underline text-xs font-semibold">
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
