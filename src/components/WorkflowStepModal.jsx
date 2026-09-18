import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { X } from 'lucide-react';

export const WorkflowStepModal = ({ shipmentId, step, onClose }) => {
  const { updateWorkflowStep } = useOperations();
  const [status, setStatus] = useState(step?.status || 'pending');
  const [remarks, setRemarks] = useState(step?.remarks || '');

  if (!step) return null;

  const handleSave = () => {
    updateWorkflowStep(shipmentId, step.id, status, remarks);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-red-500">Workflow Activity Detail</span>
            <h3 className="text-sm font-bold text-white mt-0.5">
              Step {step.stepNumber}: {step.name}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 text-xs">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Update Milestone Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'completed', label: '✓ Completed', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                { value: 'in_progress', label: '● In Progress', color: 'border-red-500 bg-red-50 text-red-800' },
                { value: 'pending', label: '🟡 Pending', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                { value: 'overdue', label: '🔴 Overdue', color: 'border-rose-500 bg-rose-50 text-rose-800' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`p-2.5 rounded-lg border text-xs font-bold transition text-left ${
                    status === opt.value ? `${opt.color} ring-2 ring-red-600` : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {step.dueDate && (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Target Due Date:</span>
              <span className="font-bold text-slate-900 font-mono">{step.dueDate}</span>
            </div>
          )}

          {step.completedBy && (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Completed By:</span>
              <span className="font-bold text-slate-900">{step.completedBy} ({step.completedDate})</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Operational Remarks & Log
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add operational update notes or details..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none text-xs"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition"
          >
            Save Milestone Status
          </button>
        </div>

      </div>
    </div>
  );
};
