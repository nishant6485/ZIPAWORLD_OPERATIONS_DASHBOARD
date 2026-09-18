import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { getWorkflowTemplate } from '../data/mockWorkflows';
import { 
  X, 
  Ship, 
  Plane, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  User, 
  ArrowRight,
  CheckSquare,
  Search,
  ExternalLink
} from 'lucide-react';

export function ShipmentDrawer({ shipmentId, onClose }) {
  const { 
    shipments, 
    tasks,
    updateWorkflowStep, 
    addOperationalNote, 
    addFollowUp,
    completeTask
  } = useOperations();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'workflow', 'documents', 'tasks', 'notes'
  const [newNoteText, setNewNoteText] = useState('');

  if (!shipmentId) return null;

  const shipment = shipments.find(s => s.id === shipmentId);
  if (!shipment) return null;

  const isAir = shipment.mode === 'Air';
  const workflowTemplate = getWorkflowTemplate(shipment.mode, shipment.direction);
  const activeWorkflow = shipment.workflow && shipment.workflow.length > 0 ? shipment.workflow : workflowTemplate.map((step, idx) => ({
    id: `step-${idx+1}`,
    stepNumber: step.stepNumber,
    name: step.name,
    status: idx < Math.floor((shipment.progress / 100) * workflowTemplate.length) ? 'completed' : (idx === Math.floor((shipment.progress / 100) * workflowTemplate.length) ? 'in_progress' : 'pending'),
    dueDate: shipment.etd
  }));

  const shipmentTasks = tasks.filter(t => t.shipmentId === shipment.id);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNoteText.trim()) {
      addOperationalNote(shipment.id, newNoteText);
      setNewNoteText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white border-l border-slate-200 text-slate-800 flex flex-col h-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Drawer Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700">
                {isAir ? <Plane className="w-3.5 h-3.5 text-red-500" /> : <Ship className="w-3.5 h-3.5 text-red-500" />}
                {shipment.mode} {shipment.direction} ({shipment.shipmentType})
              </span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                shipment.health === 'Delayed' ? 'bg-red-950 text-red-400 border border-red-800' :
                shipment.health === 'At Risk' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                'bg-emerald-950 text-emerald-400 border border-emerald-800'
              }`}>
                {shipment.currentStatus}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white mt-1 flex items-center gap-2">
              <span>{shipment.id}</span>
              <span className="text-xs font-normal text-slate-400">({shipment.jobNo})</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium">{shipment.customer}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Operational Overview Specs Bar */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Routing</div>
            <div className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
              <span>{shipment.pol || shipment.originAirport}</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <span>{shipment.pod || shipment.destinationAirport}</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Carrier</div>
            <div className="font-bold text-slate-900 mt-0.5">
              {shipment.shippingLine || shipment.airline}
            </div>
            <div className="text-[10px] text-slate-500">
              {isAir ? `Flight ${shipment.flightNumber || 'N/A'}` : `${shipment.vessel || 'Vessel'} (${shipment.voyage || 'N/A'})`}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">References</div>
            {isAir ? (
              <div className="font-mono text-slate-900 mt-0.5">
                <div>MAWB: {shipment.mawb || 'Pending'}</div>
                <div className="text-[10px] text-slate-500">HAWB: {shipment.hawb || 'Pending'}</div>
              </div>
            ) : (
              <div className="font-mono text-slate-900 mt-0.5">
                <div>BL: {shipment.blNo || 'Pending'}</div>
                <div className="text-[10px] text-slate-500">Cont: {shipment.containerNo || 'Allocating'}</div>
              </div>
            )}
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Schedule</div>
            <div className="text-slate-700 mt-0.5">ETD: <strong className="text-slate-900">{shipment.etd}</strong></div>
            <div className="text-slate-700">ETA: <strong className="text-slate-900">{shipment.eta}</strong></div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Assigned</div>
            <div className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-red-600" />
              <span>{shipment.assignedTo}</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Progress</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
                <div 
                  className={`h-full rounded-full ${shipment.progress === 100 ? 'bg-emerald-500' : 'bg-red-600'}`}
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
              <span className="font-bold text-red-600 text-xs">{shipment.progress}%</span>
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-200 px-6 bg-white text-xs font-bold overflow-x-auto shadow-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'workflow', label: 'Workflow' },
            { id: 'documents', label: `Documents (${(shipment.documents || []).length})` },
            { id: 'tasks', label: `Tasks (${shipmentTasks.length})` },
            { id: 'tracking', label: 'Tracking 360' },
            { id: 'notes', label: `Notes (${(shipment.notes || []).length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'border-red-600 text-red-600 font-extrabold' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* OVERVIEW TAB (Clean Summary) */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900 text-sm">Operational Milestone Summary</span>
                  <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200 text-[11px]">
                    {shipment.currentStatus}
                  </span>
                </div>
                <p className="text-slate-700">
                  Current Workflow Stage: <strong className="text-red-600 font-semibold">{shipment.currentStatus}</strong>
                </p>
                <p className="text-slate-600">
                  Next Action: <strong className="text-amber-700 font-semibold">{shipment.nextAction || 'Pending Milestone Verification'}</strong>
                </p>
                <p className="text-slate-600">
                  Estimated Arrival (ETA): <strong className="text-slate-900 font-mono">{shipment.eta}</strong> (ETD: <span className="font-mono text-slate-700">{shipment.etd}</span>)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Shipper / Customer</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{shipment.customer}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{shipment.shipper || 'Registered Shipper'}</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Consignee</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{shipment.consignee || 'Global Recipient Ltd'}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Incoterm: {shipment.incoterm || 'FOB'}</div>
                </div>
              </div>
            </div>
          )}

          {/* WORKFLOW TIMELINE TAB */}
          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-900">Operational Workflow Execution</span>
                <span className="text-[11px] text-slate-500">Click button to toggle milestone</span>
              </div>

              <div className="relative pl-6 border-l-2 border-slate-200 space-y-5">
                {activeWorkflow.map((step) => {
                  const isDone = step.status === 'completed';
                  const isCurrent = step.status === 'in_progress';

                  return (
                    <div key={step.id || step.stepNumber} className="relative group">
                      <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isDone ? 'bg-emerald-600 border-emerald-500 text-white' :
                        isCurrent ? 'bg-red-600 border-red-400 ring-4 ring-red-100 animate-pulse' :
                        'bg-white border-slate-300'
                      }`}>
                        {isDone && <CheckCircle2 className="w-3 h-3 text-white font-bold" />}
                      </div>

                      <div className={`p-3.5 rounded-lg border transition-colors ${
                        isCurrent ? 'bg-red-50/50 border-red-300' :
                        isDone ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 opacity-70'
                      }`}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Step {step.stepNumber}</span>
                            <h4 className="text-xs font-bold text-slate-900 mt-0.5">{step.name}</h4>
                            {step.remarks && <p className="text-[11px] text-slate-600 mt-1 italic">"{step.remarks}"</p>}
                          </div>

                          <button
                            onClick={() => updateWorkflowStep(shipment.id, step.id, isDone ? 'pending' : 'completed')}
                            className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                              isDone ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200' :
                              isCurrent ? 'bg-red-600 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {isDone ? '✓ Done' : isCurrent ? 'Mark Complete' : 'Pending'}
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-200">
                          <span>{step.completedDate ? `Completed: ${step.completedDate}` : `Due: ${step.dueDate || shipment.etd}`}</span>
                          <span>{step.completedBy ? `By: ${step.completedBy}` : `Assigned: ${step.assignedTo || shipment.assignedTo}`}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="space-y-3 text-xs">
              {(shipment.documents || []).length === 0 ? (
                <div className="p-4 text-center text-slate-500">No documents uploaded.</div>
              ) : (
                shipment.documents.map((doc) => (
                  <div key={doc.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-amber-500" />
                      <div>
                        <div className="font-bold text-slate-900">{doc.name}</div>
                        <div className="text-[10px] text-slate-500">Type: {doc.type} • {doc.updatedAt}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      doc.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TASKS TAB */}
          {activeTab === 'tasks' && (
            <div className="space-y-3 text-xs">
              {shipmentTasks.length === 0 ? (
                <div className="p-4 text-center text-slate-500">No specific tasks linked to this shipment.</div>
              ) : (
                shipmentTasks.map(t => (
                  <div key={t.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900">{t.title}</div>
                      <div className="text-[10px] text-slate-500">Due: {t.dueDate}</div>
                    </div>
                    <button
                      onClick={() => completeTask(t.id)}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold"
                    >
                      {t.status === 'Completed' ? '✓ Completed' : 'Complete'}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TRACKING 360 TAB */}
          {activeTab === 'tracking' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Live Location & Milestone Tracking</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">
                    Live Feed Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div>Current Location: <strong className="text-slate-900">{shipment.pol || shipment.originAirport} (In Transit)</strong></div>
                  <div>Estimated Arrival: <strong className="text-red-600 font-mono">{shipment.eta}</strong></div>
                  <div>Vessel / Flight: <strong className="text-slate-900">{shipment.vessel || shipment.flightNumber || 'Active Carrier'}</strong></div>
                  <div>Carrier: <strong className="text-slate-900">{shipment.shippingLine || shipment.airline}</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* NOTES TAB */}
          {activeTab === 'notes' && (
            <div className="space-y-4 text-xs">
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add operational note..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 rounded-lg px-3 py-2 focus:outline-none focus:border-red-600"
                />
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-bold">
                  Post Note
                </button>
              </form>

              <div className="space-y-2">
                {(shipment.notes || []).map((note) => (
                  <div key={note.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                      <span className="text-red-600 font-bold">{note.author}</span>
                      <span>{note.date}</span>
                    </div>
                    <p className="text-slate-800">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
