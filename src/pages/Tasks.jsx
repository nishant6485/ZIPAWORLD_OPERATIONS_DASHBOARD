import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { FilterBar } from '../components/FilterBar';
import { HorizontalBarChart } from '../components/charts';
import { CheckSquare, Clock, AlertTriangle, Plus, CheckCircle2, User } from 'lucide-react';

export function Tasks() {
  const { tasks, completeTask, openQuickAction, setSideDrawerShipmentId, stats } = useOperations();

  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredTasks = categoryFilter === 'ALL' 
    ? tasks 
    : tasks.filter(t => t.category === categoryFilter);

  const taskCategoryStats = [
    { name: 'Documentation', count: tasks.filter(t => t.category === 'Documentation').length },
    { name: 'Customs Clearance', count: tasks.filter(t => t.category === 'Customs').length },
    { name: 'Operations & Terminal', count: tasks.filter(t => t.category === 'Operations').length },
    { name: 'Space & Booking', count: tasks.filter(t => t.category === 'Booking').length },
    { name: 'Finance & DO Fees', count: tasks.filter(t => t.category === 'Finance').length },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border border-slate-800 border-l-4 border-l-teal-500 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <CheckSquare className="w-5 h-5 text-teal-400" />
            <span>Task & Follow-up Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Operational action items across Ocean and Air export/import workflows.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('create_task')}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 rounded text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      <FilterBar />

      {/* Task Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Task Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Pending Tasks Queue ({filteredTasks.length})
            </h3>

            <div className="flex items-center gap-2 text-xs overflow-x-auto whitespace-nowrap scrollbar-none max-w-full">
              {['ALL', 'Documentation', 'Customs', 'Operations', 'Finance'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded font-semibold transition-all shrink-0 ${
                    categoryFilter === cat ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">No tasks match selected filters.</div>
            ) : (
              filteredTasks.map(task => {
                const isOverdue = task.status === 'Overdue';
                const isCompleted = task.status === 'Completed';

                return (
                  <div key={task.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-start justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          task.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          {task.priority} Priority
                        </span>
                        <span className="font-mono text-slate-400 text-[10px]">{task.category}</span>
                        <span 
                          onClick={() => setSideDrawerShipmentId(task.shipmentId)} 
                          className="text-teal-400 hover:underline cursor-pointer font-bold"
                        >
                          {task.shipmentId}
                        </span>
                      </div>

                      <h4 className={`font-bold ${isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">{task.description}</p>

                      <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1 flex-wrap">
                        <span>Assigned to: <strong className="text-slate-200">{task.assignedTo}</strong></span>
                        <span>•</span>
                        <span>Due: <strong className={isOverdue ? 'text-rose-400 font-bold' : 'text-slate-200'}>{task.dueDate}</strong></span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {!isCompleted ? (
                        <button
                          onClick={() => completeTask(task.id)}
                          className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded transition-all shadow-xs"
                        >
                          Complete
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4" /> Done
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Col: Task Analytics Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-teal-400" />
            <span>Tasks by Category</span>
          </h3>

          <HorizontalBarChart
            data={taskCategoryStats}
            title=""
            barColor="#14B8A6"
          />
        </div>

      </div>

    </div>
  );
}
