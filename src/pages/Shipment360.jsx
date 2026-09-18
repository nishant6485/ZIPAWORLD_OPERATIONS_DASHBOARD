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
    <div className="max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Top Navigation & Action Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-teal-400" />
          <span>Back to Operations</span>
        </button>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            shipment.health === 'Delayed' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
            shipment.health === 'At Risk' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {shipment.currentStatus}
          </span>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700">
                {isAir ? <Plane className="w-4 h-4 text-teal-400" /> : <Ship className="w-4 h-4 text-teal-400" />}
                <span>{shipment.mode} {shipment.direction} ({shipment.shipmentType})</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">Job: {shipment.jobNo}</span>
            </div>

            <h1 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-3">
              <span>{shipment.id}</span>
              <span className="text-sm font-normal text-slate-400">| {shipment.customer}</span>
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {shipment.pol || shipment.originAirport} → {shipment.pod || shipment.destinationAirport}
              </span>
              <span>•</span>
              <span>Commodity: <strong className="text-slate-200">{shipment.commodity}</strong></span>
              <span>•</span>
              <span>Incoterm: <strong className="text-slate-200">{shipment.incoterm}</strong></span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-slate-400">Workflow Progress</div>
            <div className="text-2xl font-black text-teal-400">{shipment.progress}%</div>
            <div className="w-36 bg-slate-950 h-2 rounded-full overflow-hidden mt-1 border border-slate-800">
              <div 
                className={`h-full rounded-full ${shipment.progress === 100 ? 'bg-emerald-500' : 'bg-teal-500'}`}
                style={{ width: `${shipment.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Detailed Operational Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Carrier & Transport</span>
            <div className="font-bold text-white mt-0.5">{shipment.shippingLine || shipment.airline}</div>
            <div className="text-[11px] text-slate-400">
              {isAir ? `Flight ${shipment.flightNumber || 'N/A'}` : `${shipment.vessel || 'Vessel'} (V.${shipment.voyage || 'N/A'})`}
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Document References</span>
            {isAir ? (
              <div className="font-mono text-slate-300 mt-0.5">
                <div>MAWB: {shipment.mawb || 'Pending'}</div>
                <div className="text-[10px] text-slate-400">HAWB: {shipment.hawb || 'Pending'}</div>
              </div>
            ) : (
              <div className="font-mono text-slate-300 mt-0.5">
                <div>BL: {shipment.blNo || 'Pending'}</div>
                <div className="text-[10px] text-slate-400">Cont: {shipment.containerNo || 'Allocating'}</div>
              </div>
            )}
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Schedule Window</span>
            <div className="text-slate-300 mt-0.5">ETD: <strong className="text-white">{shipment.etd}</strong></div>
            <div className="text-slate-300">ETA: <strong className="text-white">{shipment.eta}</strong></div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Assigned Executive</span>
            <div className="font-bold text-white mt-0.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-teal-400" />
              <span>{shipment.assignedTo}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Priority: {shipment.priority}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Workflow Milestones & Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Milestone Pipeline */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Operational Milestone Workflow Timeline</span>
            </h3>
            <span className="text-xs text-slate-400">{activeWorkflow.length} Standard Stages</span>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
            {activeWorkflow.map((step) => {
              const isDone = step.status === 'completed';
              const isCurrent = step.status === 'in_progress';

              return (
                <div key={step.id || step.stepNumber} className="relative group">
                  <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950' :
                    isCurrent ? 'bg-teal-500 border-teal-400 ring-4 ring-teal-500/20 animate-pulse' :
                    'bg-slate-900 border-slate-700'
                  }`}>
                    {isDone && <CheckCircle2 className="w-3 h-3 text-slate-950 font-bold" />}
                  </div>

                  <div className={`p-4 rounded-lg border transition-colors ${
                    isCurrent ? 'bg-teal-500/10 border-teal-500/40' :
                    isDone ? 'bg-slate-950 border-slate-800' : 'bg-slate-950/50 border-slate-800/80 opacity-70'
                  }`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Stage {step.stepNumber}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-0.5">{step.name}</h4>
                        {step.remarks && (
                          <p className="text-xs text-slate-400 mt-1 italic">"{step.remarks}"</p>
                        )}
                      </div>

                      <button
                        onClick={() => updateWorkflowStep(shipment.id, step.id, isDone ? 'pending' : 'completed')}
                        className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                          isDone ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30' :
                          isCurrent ? 'bg-teal-500 text-slate-950 font-bold shadow-xs hover:bg-teal-400' :
                          'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {isDone ? '✓ Completed' : isCurrent ? 'Mark Complete' : 'Pending'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800">
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
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Compliance Documents</span>
            </h3>

            <div className="space-y-2">
              {(shipment.documents || []).map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{doc.name}</div>
                    <div className="text-[10px] text-slate-400">Type: {doc.type}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    doc.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Notes Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>Operational Communication Log</span>
            </h3>

            <form onSubmit={handleNoteSubmit} className="space-y-2">
              <textarea
                rows={2}
                placeholder="Write an operational update or customer note..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs rounded-lg p-2.5 focus:outline-none focus:border-teal-400"
              />
              <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 py-2 rounded-lg text-xs font-bold transition-colors">
                Post Operational Note
              </button>
            </form>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {(shipment.notes || []).map((note) => (
                <div key={note.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                    <span className="text-teal-400 font-bold">{note.author}</span>
                    <span>{note.date}</span>
                  </div>
                  <p className="text-slate-300">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
