import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import { Ship, Plane, ArrowRight, Columns, ChevronDown, ChevronRight, User } from 'lucide-react';

export function ShipmentTable({ customShipments = null, title = "Shipment Directory", limit = null }) {
  const navigate = useNavigate();
  const { shipments, setSideDrawerShipmentId } = useOperations();

  // Row expansion state (stores Set of expanded shipment IDs)
  const [expandedRowIds, setExpandedRowIds] = useState(new Set());

  // Column customization state - DEFAULT TO ESSENTIAL 7 COLUMNS ONLY
  const [showColumnPicker, setShowColumnPicker] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    expand: true,
    id: true,
    mode: true,
    customer: true,
    route: true,
    currentStage: true,
    dueEta: true,
    status: true,
    // Optional columns (hidden by default)
    carrier: false,
    reference: false,
    assigned: false,
    progress: false,
    weightPackages: false,
    incoterm: false,
    actions: true
  });

  const toggleRowExpand = (id, e) => {
    e.stopPropagation();
    setExpandedRowIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleColumn = (key) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allData = customShipments || shipments;
  const dataToDisplay = limit ? allData.slice(0, limit) : allData;

  const activeColCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Table Header Controls */}
      <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2.5">
            <span>{title}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-blue-600 border border-slate-200">
              {limit ? `Showing ${dataToDisplay.length} of ${allData.length}` : `${dataToDisplay.length} Records`}
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Column Customization Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowColumnPicker(!showColumnPicker)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              <Columns className="w-3.5 h-3.5 text-blue-600" />
              <span>Columns</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Column Selector Popover */}
            {showColumnPicker && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-30 divide-y divide-slate-100 text-slate-800"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Customize Columns</span>
                  <button 
                    onClick={() => setShowColumnPicker(false)}
                    className="text-[10px] text-blue-600 hover:underline font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
                <div className="pt-2 space-y-2 text-xs text-slate-700 max-h-72 overflow-y-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Default Essential Columns</span>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.id} onChange={() => toggleColumn('id')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Shipment ID</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.mode} onChange={() => toggleColumn('mode')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Mode / Direction</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.customer} onChange={() => toggleColumn('customer')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Customer</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.route} onChange={() => toggleColumn('route')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Origin → Destination</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.currentStage} onChange={() => toggleColumn('currentStage')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Current Stage</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.dueEta} onChange={() => toggleColumn('dueEta')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Due / ETA</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.status} onChange={() => toggleColumn('status')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Status</span>
                  </label>

                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block pt-2">Optional Secondary Columns</span>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.carrier} onChange={() => toggleColumn('carrier')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Carrier / Vessel / Flight</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.reference} onChange={() => toggleColumn('reference')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>BL / AWB / Container No</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.assigned} onChange={() => toggleColumn('assigned')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Assigned Executive</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.progress} onChange={() => toggleColumn('progress')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Progress Bar</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.weightPackages} onChange={() => toggleColumn('weightPackages')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Weight & Packages</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" checked={visibleColumns.incoterm} onChange={() => toggleColumn('incoterm')} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>Incoterm</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {limit && (
            <button
              onClick={() => navigate('/shipments')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all shipments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold tracking-wider uppercase text-[10px] sticky top-0">
              {visibleColumns.expand && <th className="py-3 px-3 w-8"></th>}
              {visibleColumns.id && <th className="py-3 px-4">Shipment ID</th>}
              {visibleColumns.mode && <th className="py-3 px-4 hidden sm:table-cell">Mode / Dir</th>}
              {visibleColumns.customer && <th className="py-3 px-4">Customer</th>}
              {visibleColumns.route && <th className="py-3 px-4 hidden md:table-cell">Origin → Destination</th>}
              {visibleColumns.currentStage && <th className="py-3 px-4">Current Stage</th>}
              {visibleColumns.dueEta && <th className="py-3 px-4 hidden sm:table-cell">Due / ETA</th>}
              {visibleColumns.status && <th className="py-3 px-4">Status</th>}

              {/* Optional Columns */}
              {visibleColumns.carrier && <th className="py-3 px-4 hidden lg:table-cell">Carrier / Vessel / Flight</th>}
              {visibleColumns.reference && <th className="py-3 px-4 hidden lg:table-cell">Ref (BL / AWB / Cont)</th>}
              {visibleColumns.incoterm && <th className="py-3 px-4 hidden lg:table-cell">Incoterm</th>}
              {visibleColumns.weightPackages && <th className="py-3 px-4 hidden lg:table-cell">Weight & Pkgs</th>}
              {visibleColumns.progress && <th className="py-3 px-4 hidden lg:table-cell">Progress</th>}
              {visibleColumns.assigned && <th className="py-3 px-4 hidden lg:table-cell">Assigned</th>}
              {visibleColumns.actions && <th className="py-3 px-4 text-right">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {dataToDisplay.length === 0 ? (
              <tr>
                <td colSpan={activeColCount} className="py-12 text-center text-slate-500 font-bold">
                  No operational shipments match current filter criteria.
                </td>
              </tr>
            ) : (
              dataToDisplay.map((s) => {
                const isAir = s.mode === 'Air';
                const isExpanded = expandedRowIds.has(s.id);

                return (
                  <React.Fragment key={s.id}>
                    <tr 
                      onClick={(e) => toggleRowExpand(s.id, e)}
                      className={`hover:bg-blue-50/40 cursor-pointer transition-colors group ${
                        isExpanded ? 'bg-blue-50/60 border-l-4 border-l-blue-600' : ''
                      }`}
                    >
                      {/* Expand Toggle Button [ > ] */}
                      {visibleColumns.expand && (
                        <td className="py-3.5 px-3 text-center">
                          <button
                            onClick={(e) => toggleRowExpand(s.id, e)}
                            className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            title={isExpanded ? "Collapse row" : "Expand row details"}
                          >
                            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-blue-600' : ''}`} />
                          </button>
                        </td>
                      )}

                      {/* Shipment ID */}
                      {visibleColumns.id && (
                        <td className="py-3.5 px-4 font-black text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                          <span 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSideDrawerShipmentId(s.id);
                            }}
                            className="hover:underline text-blue-600 font-mono"
                          >
                            {s.id}
                          </span>
                          <span className="block text-[10px] text-slate-500 font-normal mt-0.5">{s.jobNo}</span>
                        </td>
                      )}

                      {/* Mode / Dir Badge */}
                      {visibleColumns.mode && (
                        <td className="py-3.5 px-4 whitespace-nowrap hidden sm:table-cell">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold ${
                            isAir ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-sky-50 text-sky-700 border border-sky-200'
                          }`}>
                            {isAir ? <Plane className="w-3.5 h-3.5" /> : <Ship className="w-3.5 h-3.5" />}
                            <span>{s.mode} {s.direction}</span>
                          </span>
                        </td>
                      )}

                      {/* Customer */}
                      {visibleColumns.customer && (
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {s.customer}
                          <span className="block text-[10px] text-slate-500 font-normal">{s.shipmentType || 'FCL'}</span>
                        </td>
                      )}

                      {/* Routing */}
                      {visibleColumns.route && (
                        <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            <span>{s.pol || s.originAirport}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                            <span>{s.pod || s.destinationAirport}</span>
                          </div>
                        </td>
                      )}

                      {/* Current Stage */}
                      {visibleColumns.currentStage && (
                        <td className="py-3.5 px-4 text-slate-900 font-bold whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[11px]">
                            {s.currentStatus}
                          </span>
                        </td>
                      )}

                      {/* Due / ETA */}
                      {visibleColumns.dueEta && (
                        <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap font-mono text-[11px] hidden sm:table-cell">
                          <div>ETA: {s.eta}</div>
                          <div className="text-[10px] text-slate-500">ETD: {s.etd}</div>
                        </td>
                      )}

                      {/* Status & Health */}
                      {visibleColumns.status && (
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              s.health === 'Delayed' ? 'bg-rose-500' :
                              s.health === 'At Risk' ? 'bg-amber-500' :
                              s.health === 'Attention Required' ? 'bg-yellow-500' : 'bg-emerald-500'
                            }`} />
                            <span className="font-bold text-slate-900">{s.health || 'Healthy'}</span>
                          </div>
                          {s.delayDays > 0 && (
                            <span className="text-[10px] text-rose-600 font-bold block mt-0.5">
                              +{s.delayDays}d Delay
                            </span>
                          )}
                        </td>
                      )}

                      {/* OPTIONAL COLUMNS */}
                      {visibleColumns.carrier && (
                        <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap hidden lg:table-cell">
                          <div className="font-bold text-slate-900">{s.shippingLine || s.airline}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {isAir ? `Flight ${s.flightNumber || 'N/A'}` : `${s.vessel || 'Vessel'} (V.${s.voyage || 'N/A'})`}
                          </div>
                        </td>
                      )}

                      {visibleColumns.reference && (
                        <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap font-mono text-[11px] hidden lg:table-cell">
                          {isAir ? (
                            <div>MAWB: {s.mawb || 'Pending'}</div>
                          ) : (
                            <div>BL: {s.blNo || 'Pending'}</div>
                          )}
                        </td>
                      )}

                      {visibleColumns.incoterm && (
                        <td className="py-3.5 px-4 font-mono text-xs hidden lg:table-cell">{s.incoterm || 'FOB'}</td>
                      )}

                      {visibleColumns.weightPackages && (
                        <td className="py-3.5 px-4 font-mono text-xs hidden lg:table-cell">{s.weightKg || '1,200'} kg</td>
                      )}

                      {visibleColumns.progress && (
                        <td className="py-3.5 px-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-blue-600" style={{ width: `${s.progress}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold">{s.progress}%</span>
                        </td>
                      )}

                      {visibleColumns.assigned && (
                        <td className="py-3.5 px-4 text-xs font-bold text-slate-700 hidden lg:table-cell">{s.assignedTo || 'Unassigned'}</td>
                      )}

                      {/* Action */}
                      {visibleColumns.actions && (
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSideDrawerShipmentId(s.id);
                            }}
                            className="px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-pointer shadow-xs"
                            title="Inspect in Shipment Drawer"
                          >
                            Inspect
                          </button>
                        </td>
                      )}
                    </tr>

                    {/* EXPANDED ROW ACCORDION CONTAINER */}
                    {isExpanded && (
                      <tr className="bg-slate-50/80 border-b border-slate-200">
                        <td colSpan={activeColCount} className="p-4 md:p-5">
                          <div className="bg-white border border-slate-200 rounded-lg p-4 text-xs shadow-xs">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                                <span>Operational Breakdown — {s.id}</span>
                                <span className="text-xs font-normal text-slate-500">({s.customer})</span>
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSideDrawerShipmentId(s.id);
                                }}
                                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <span>Open Full Drawer</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              {/* Booking & Ref */}
                              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Booking & Equipment</span>
                                <div className="font-mono text-slate-900 font-bold">{s.bookingNo || 'BKG-991204'}</div>
                                <div className="text-slate-700 mt-1">{isAir ? `Cargo: ${s.weightKg || '1,200'} kg` : `Cont: ${s.containerNo || 'MSKU-88192'}`}</div>
                                <div className="text-[10px] text-emerald-700 mt-1 font-bold">VGM Status: Verified</div>
                              </div>

                              {/* Carrier / Flight / Vessel */}
                              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Carrier Details</span>
                                <div className="font-bold text-slate-900">{s.shippingLine || s.airline}</div>
                                <div className="text-slate-700 mt-1">{isAir ? `Flight ${s.flightNumber || 'AI-121'}` : `Vessel ${s.vessel || 'MSC Lauren'}`}</div>
                                <div className="text-[10px] text-slate-500 mt-1">Voyage: {s.voyage || '2609E'}</div>
                              </div>

                              {/* Documents & Customs */}
                              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Documents & Clearance</span>
                                <div className="font-bold text-slate-900">{isAir ? `MAWB: ${s.mawb || '988-12903'}` : `BL: ${s.blNo || 'MEDU19284'}`}</div>
                                <div className="text-slate-700 mt-1">Shipping Instruction: Approved</div>
                                <div className="text-[10px] text-emerald-700 mt-1 font-bold">Customs BOE: Released</div>
                              </div>

                              {/* Executive & Next Action */}
                              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Assigned Executive</span>
                                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-blue-600" />
                                  <span>{s.assignedTo || 'Rahul Sharma'}</span>
                                </div>
                                <div className="text-[10px] text-amber-700 font-bold mt-2">
                                  Next Action: {s.nextAction || 'Confirm departure schedule'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



