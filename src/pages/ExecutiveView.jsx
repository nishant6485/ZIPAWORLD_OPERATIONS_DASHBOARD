import React from 'react';
import { useOperations } from '../context/OperationsContext';
import { ShipmentTable } from '../components/ShipmentTable';
import { UserCheck, CheckSquare, Clock, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export function ExecutiveView() {
  const { currentUser, shipments, tasks, documents } = useOperations();

  // Filter personal workload for current logged-in executive
  const execName = currentUser.name;
  const myShipments = shipments.filter(s => s.assignedTo === execName);
  const myActiveShipments = myShipments.filter(s => s.currentStatus !== 'Delivered' && s.progress < 100);
  const myDelayedShipments = myShipments.filter(s => s.health === 'Delayed' || s.health === 'At Risk');

  const myTasks = tasks.filter(t => t.assignedTo === execName);
  const myPendingTasks = myTasks.filter(t => t.status !== 'Completed');
  const myOverdueTasks = myTasks.filter(t => t.status === 'Overdue');

  const myOnTimeRate = myShipments.length ? Math.round(((myShipments.length - myDelayedShipments.length) / myShipments.length) * 100) : 100;
  const myTaskCompletionRate = myTasks.length ? Math.round(((myTasks.length - myPendingTasks.length) / myTasks.length) * 100) : 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-red-500" />
            <span>Personal Executive Workspace — {execName}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personal workload, assigned shipments, pending tasks, and upcoming milestone deadlines.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded px-4 py-2 text-xs font-bold text-slate-200">
          Personal Performance Score: {myOnTimeRate}% On-Time
        </div>
      </div>

      {/* Personal KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">My Assigned Shipments</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{myShipments.length}</div>
          <div className="text-[10px] text-red-600 mt-1 font-bold">{myActiveShipments.length} Active</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">My On-Time Rate</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{myOnTimeRate}%</div>
          <div className="text-[10px] text-red-600 mt-1">{myDelayedShipments.length} Delayed</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">My Pending Tasks</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{myPendingTasks.length}</div>
          <div className="text-[10px] text-red-600 mt-1">{myOverdueTasks.length} Overdue</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="text-[10px] uppercase font-bold text-slate-500">My Task Completion</div>
          <div className="text-2xl font-black text-red-600 mt-1">{myTaskCompletionRate}%</div>
        </div>
      </div>

      {/* Personal Task Queue */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-red-600" />
          <span>My Action Items ({myPendingTasks.length} Pending)</span>
        </h3>

        <div className="space-y-2 text-xs">
          {myPendingTasks.length === 0 ? (
            <div className="p-4 text-center text-slate-500">All assigned tasks completed! Great job.</div>
          ) : (
            myPendingTasks.map(t => (
              <div key={t.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900">{t.title}</div>
                  <div className="text-[10px] text-slate-500">{t.shipmentId} • Due: {t.dueDate}</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  t.priority === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {t.priority}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Personal Assigned Shipments Table */}
      <ShipmentTable 
        customShipments={myShipments} 
        title={`Assigned Shipments Directory — ${execName}`} 
      />

    </div>
  );
}
