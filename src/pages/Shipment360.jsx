import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import { getWorkflowTemplate } from '../data/mockWorkflows';
import { 
  ArrowLeft, 
  Ship, 
  Plane, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  User, 
  FileText, 
  Calendar, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Building2,
  MapPin,
  Tag
} from 'lucide-react';

export function Shipment360() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shipments, updateWorkflowStep, addOperationalNote } = useOperations();
  const [newNoteText, setNewNoteText] = useState('');

  const shipment = shipments.find(s => s.id === id) || shipments[0];
  if (!shipment) return <div className="p-8 text-white">Shipment not found.</div>;

  const isAir = shipment.mode === 'Air';
  const workflowTemplate = getWorkflowTemplate(shipment.mode, shipment.direction);
  const activeWorkflow = shipment.workflow && shipment.workflow.length > 0 ? shipment.workflow : workflowTemplate.map((step, idx) => ({
    id: `step-${idx+1}`,
    stepNumber: step.stepNumber,
    name: step.name,
    status: idx < Math.floor((shipment.progress / 100) * workflowTemplate.length) ? 'completed' : (idx === Math.floor((shipment.progress / 100) * workflowTemplate.length) ? 'in_progress' : 'pending'),
    dueDate: shipment.etd
  }));

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (newNoteText.trim()) {
      addOperationalNote(shipment.id, newNoteText);
      setNewNoteText('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-800">
      
      {/* Top Navigation & Action Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-red-600" />
          <span>Back to Operations</span>
        </button>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            shipment.health === 'Delayed' ? 'bg-red-100 text-red-700 border border-red-200' :
            shipment.health === 'At Risk' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
            'bg-emerald-100 text-emerald-700 border border-emerald-200'
          }`}>
            {shipment.currentStatus}
          </span>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                {isAir ? <Plane className="w-4 h-4 text-red-600" /> : <Ship className="w-4 h-4 text-red-600" />}
                <span>{shipment.mode} {shipment.direction} ({shipment.shipmentType})</span>
              </span>
              <span className="text-xs text-slate-500 font-mono">Job: {shipment.jobNo}</span>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 mt-2 flex items-center gap-3">
              <span>{shipment.id}</span>
              <span className="text-sm font-normal text-slate-500">| {shipment.customer}</span>
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                {shipment.pol || shipment.originAirport} → {shipment.pod || shipment.destinationAirport}
              </span>
              <span>•</span>
              <span>Commodity: <strong className="text-slate-800">{shipment.commodity}</strong></span>
              <span>•</span>
              <span>Incoterm: <strong className="text-slate-800">{shipment.incoterm}</strong></span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-slate-500">Workflow Progress</div>
            <div className="text-2xl font-black text-red-600">{shipment.progress}%</div>
            <div className="w-36 bg-slate-100 h-2 rounded-full overflow-hidden mt-1 border border-slate-200">
              <div 
                className={`h-full rounded-full ${shipment.progress === 100 ? 'bg-emerald-500' : 'bg-red-600'}`}
                style={{ width: `${shipment.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Detailed Operational Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Carrier & Transport</span>
            <div className="font-bold text-slate-900 mt-0.5">{shipment.shippingLine || shipment.airline}</div>
            <div className="text-[11px] text-slate-500">
              {isAir ? `Flight ${shipment.flightNumber || 'N/A'}` : `${shipment.vessel || 'Vessel'} (V.${shipment.voyage || 'N/A'})`}
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Document References</span>
            {isAir ? (
              <div className="font-mono text-slate-800 mt-0.5">
                <div>MAWB: {shipment.mawb || 'Pending'}</div>
                <div className="text-[10px] text-slate-500">HAWB: {shipment.hawb || 'Pending'}</div>
              </div>
            ) : (
              <div className="font-mono text-slate-800 mt-0.5">
                <div>BL: {shipment.blNo || 'Pending'}</div>
                <div className="text-[10px] text-slate-500">Cont: {shipment.containerNo || 'Allocating'}</div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Schedule Window</span>
            <div className="text-slate-700 mt-0.5">ETD: <strong className="text-slate-900">{shipment.etd}</strong></div>
            <div className="text-slate-700">ETA: <strong className="text-slate-900">{shipment.eta}</strong></div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Assigned Executive</span>
            <div className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-red-600" />
              <span>{shipment.assignedTo}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Priority: {shipment.priority}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Workflow Milestones & Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Milestone Pipeline */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span>Operational Milestone Workflow Timeline</span>
            </h3>
            <span className="text-xs text-slate-500">{activeWorkflow.length} Standard Stages</span>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
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

                  <div className={`p-4 rounded-lg border transition-colors ${
                    isCurrent ? 'bg-red-50/50 border-red-300' :
                    isDone ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 opacity-70'
                  }`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          Stage {step.stepNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">{step.name}</h4>
                        {step.remarks && (
                          <p className="text-xs text-slate-600 mt-1 italic">"{step.remarks}"</p>
                        )}
                      </div>

                      <button
                        onClick={() => updateWorkflowStep(shipment.id, step.id, isDone ? 'pending' : 'completed')}
                        className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                          isDone ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200' :
                          isCurrent ? 'bg-red-600 text-white shadow-xs hover:bg-red-700' :
                          'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {isDone ? '✓ Completed' : isCurrent ? 'Mark Complete' : 'Pending'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-2 border-t border-slate-200">
                      <span>{step.completedDate ? `Completed: ${step.completedDate}` : `Due: ${step.dueDate || shipment.etd}`}</span>
                      <span>{step.completedBy ? `By: ${step.completedBy}` : `Assigned: ${step.assignedTo || shipment.assignedTo}`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Documents & Notes */}
        <div className="space-y-6">
          
          {/* Documents Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Compliance Documents</span>
            </h3>

            <div className="space-y-2">
              {(shipment.documents || []).map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{doc.name}</div>
                    <div className="text-[10px] text-slate-500">Type: {doc.type}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    doc.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Notes Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-red-600" />
              <span>Operational Communication Log</span>
            </h3>

            <form onSubmit={handleNoteSubmit} className="space-y-2">
              <textarea
                rows={2}
                placeholder="Write an operational update or customer note..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-lg p-2.5 focus:outline-none focus:border-red-600"
              />
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-semibold transition-colors">
                Post Operational Note
              </button>
            </form>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {(shipment.notes || []).map((note) => (
                <div key={note.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                    <span className="text-red-600 font-bold">{note.author}</span>
                    <span>{note.date}</span>
                  </div>
                  <p className="text-slate-800">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
