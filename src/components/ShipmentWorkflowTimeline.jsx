import React from 'react';
import { StatusBadge } from './StatusBadge';
import { CheckCircle2, Clock, ChevronRight, User } from 'lucide-react';

export const ShipmentWorkflowTimeline = ({ workflow = [], onStepClick }) => {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
      {workflow.map((step) => {
        let nodeColor = 'bg-slate-300 border-slate-400 text-slate-600';
        if (step.status === 'completed') nodeColor = 'bg-emerald-600 border-emerald-700 text-white';
        if (step.status === 'in_progress') nodeColor = 'bg-red-600 border-red-700 text-white animate-pulse';
        if (step.status === 'overdue') nodeColor = 'bg-rose-600 border-rose-700 text-white animate-pulse';
        if (step.status === 'pending') nodeColor = 'bg-amber-400 border-amber-500 text-slate-950';

        return (
          <div key={step.id || step.stepNumber} className="relative group">
            {/* Timeline Node Bullet */}
            <div
              className={`absolute -left-[23px] top-2 w-5 h-5 rounded-full border-2 flex items-center justify-center font-bold text-[10px] shadow-2xs ${nodeColor}`}
            >
              {step.status === 'completed' ? '✓' : step.stepNumber}
            </div>

            {/* Step Card */}
            <div
              onClick={() => onStepClick && onStepClick(step)}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-red-600 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">
                    Step {step.stepNumber}: {step.name}
                  </span>
                  {step.dependency && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold border border-slate-200">
                      Dep: {step.dependency}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={step.status} size="sm" />
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition" />
                </div>
              </div>

              {/* Step Info Row */}
              <div className="mt-2.5 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {step.completedDate ? (
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span className="truncate">Completed: {step.completedDate}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                    <Clock className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                    <span className="truncate">Due: {step.dueDate || 'Pending schedule'}</span>
                  </div>
                )}

                {step.completedBy && (
                  <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">By: {step.completedBy}</span>
                  </div>
                )}

                {step.assignedTo && !step.completedBy && (
                  <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Owner: {step.assignedTo}</span>
                  </div>
                )}
              </div>

              {/* Remarks if present */}
              {step.remarks && (
                <p className="mt-2 text-xs text-slate-700 italic bg-amber-50/70 p-2.5 rounded-lg border border-amber-200">
                  "{step.remarks}"
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
