import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { Search, Ship, Plane, Clock, ArrowRight, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function Tracking() {
  const { shipments, globalSearchQuery, setGlobalSearchQuery, setSideDrawerShipmentId, activeMode } = useOperations();
  const [selectedTrackShipment, setSelectedTrackShipment] = useState(null);

  const query = globalSearchQuery.trim().toLowerCase();

  const filteredShipments = query ? shipments.filter(s => (
    s.id.toLowerCase().includes(query) ||
    (s.customer && s.customer.toLowerCase().includes(query)) ||
    (s.containerNo && s.containerNo.toLowerCase().includes(query)) ||
    (s.blNo && s.blNo.toLowerCase().includes(query)) ||
    (s.bookingNo && s.bookingNo.toLowerCase().includes(query)) ||
    (s.mawb && s.mawb.toLowerCase().includes(query)) ||
    (s.hawb && s.hawb.toLowerCase().includes(query)) ||
    (s.flightNumber && s.flightNumber.toLowerCase().includes(query)) ||
    (s.vessel && s.vessel.toLowerCase().includes(query))
  )) : shipments;

  const currentShipment = selectedTrackShipment || filteredShipments[0] || shipments[0];

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-900">
      
      {/* Header Banner */}
      <div className="bg-white text-slate-900 rounded-xl p-5 shadow-xs border border-slate-200 border-l-4 border-l-blue-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
            <Search className="w-5 h-5 text-blue-600" />
            <span>Operational Tracking 360 ({activeMode === 'ALL' ? 'Ocean & Air' : `${activeMode} Freight`})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Multi-identifier search by Shipment ID, Container, BL, Booking, MAWB, HAWB, Flight, Vessel, or Customer.
          </p>
        </div>

        <div className="text-xs text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Operational Data Updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST</span>
        </div>
      </div>

      {/* Global Search Input */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Shipment ID, MAWB (020-...), HAWB, Container (MSCU...), BL, Flight (LH761...), Vessel..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-lg pl-12 pr-4 py-3 border border-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Search Results & Operational Tracker Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Shipment List */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col max-h-[700px]">
          <div className="p-4 border-b border-slate-200 font-bold text-xs text-slate-700 flex justify-between bg-slate-50">
            <span>Tracking Results ({filteredShipments.length})</span>
            <span className="text-slate-400">Select record</span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {filteredShipments.map(s => {
              const isSelected = currentShipment && currentShipment.id === s.id;
              const isAir = s.mode === 'Air';

              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedTrackShipment(s)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/60 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                      <span>{s.id}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        isAir ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}>
                        {s.mode} {s.direction}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.health === 'Delayed' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {s.currentStatus}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 mt-1 font-medium">{s.customer}</div>

                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
                    <span>{s.pol || s.originAirport}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span>{s.pod || s.destinationAirport}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{isAir ? `MAWB: ${s.mawb || 'Pending'}` : `Container: ${s.containerNo || 'Allocating'}`}</span>
                    <span className="font-bold text-blue-600">{s.progress}% Complete</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Detailed Selected Shipment Operational View */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          {currentShipment ? (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {currentShipment.mode} {currentShipment.direction} ({currentShipment.shipmentType})
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Job: {currentShipment.jobNo}</span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
                    <span>{currentShipment.id}</span>
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">{currentShipment.customer}</p>
                </div>

                <button
                  onClick={() => setSideDrawerShipmentId(currentShipment.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Full Drawer</span>
                </button>
              </div>

              {/* Route Banner */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Origin</div>
                  <div className="font-bold text-slate-900 mt-0.5">{currentShipment.pol || currentShipment.originAirport}</div>
                  <div className="text-[10px] text-slate-500">ETD: {currentShipment.etd}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Destination</div>
                  <div className="font-bold text-slate-900 mt-0.5">{currentShipment.pod || currentShipment.destinationAirport}</div>
                  <div className="text-[10px] text-slate-500">ETA: {currentShipment.eta}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Carrier</div>
                  <div className="font-bold text-blue-600 mt-0.5">{currentShipment.shippingLine || currentShipment.airline}</div>
                  <div className="text-[10px] text-slate-500">
                    {currentShipment.mode === 'Air' ? `Flight ${currentShipment.flightNumber || 'N/A'}` : `${currentShipment.vessel || 'Vessel'} (${currentShipment.voyage || 'N/A'})`}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Progress</div>
                  <div className="font-extrabold text-emerald-600 mt-0.5 text-sm">{currentShipment.progress}%</div>
                  <div className="text-[10px] text-slate-500">Status: {currentShipment.currentStatus}</div>
                </div>
              </div>

              {/* Workflow Pipeline Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Milestone Pipeline Completion</span>
                  <span>{currentShipment.progress}% Completed</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      currentShipment.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${currentShipment.progress}%` }}
                  />
                </div>
              </div>

            </div>
          ) : (
            <div className="py-12 text-center text-slate-500">Select a shipment record to track details.</div>
          )}
        </div>

      </div>

    </div>
  );
}
