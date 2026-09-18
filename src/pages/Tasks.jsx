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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-4 shadow-sm border-l-4 border-red-600 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2.5">
            <CheckSquare className="w-5 h-5 text-red-500" />
            <span>Task & Follow-up Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Operational action items across Ocean and Air export/import workflows.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('create_task')}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      <FilterBar />

      {/* Task Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Task Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pending Tasks Queue ({filteredTasks.length})
            </h3>

            <div className="flex items-center gap-2 text-xs">
              {['ALL', 'Documentation', 'Customs', 'Operations', 'Finance'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded font-semibold transition-all ${
                    categoryFilter === cat ? 'bg-red-600 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">No tasks match selected filters.</div>
            ) : (
              filteredTasks.map(task => {
                const isOverdue = task.status === 'Overdue';
                const isCompleted = task.status === 'Completed';

                return (
                  <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.priority === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                          task.priority === 'High' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                          'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {task.priority} Priority
                        </span>
                        <span className="font-mono text-slate-500 text-[10px]">{task.category}</span>
                        <span 
                          onClick={() => setSideDrawerShipmentId(task.shipmentId)} 
                          className="text-red-600 hover:underline cursor-pointer font-bold"
                        >
                          {task.shipmentId}
                        </span>
                      </div>

                      <h4 className={`font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-slate-600">{task.description}</p>

                      <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-1">
                        <span>Assigned to: <strong className="text-slate-800">{task.assignedTo}</strong></span>
                        <span>•</span>
                        <span>Due: <strong className={isOverdue ? 'text-red-600 font-bold' : 'text-slate-800'}>{task.dueDate}</strong></span>
                      </div>
                    </div>

                    <div>
                      {!isCompleted ? (
                        <button
                          onClick={() => completeTask(task.id)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-all shadow-xs"
                        >
                          Complete
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
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
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-red-600" />
            <span>Tasks by Category</span>
          </h3>

          <HorizontalBarChart
            data={taskCategoryStats}
            title=""
            barColor="#DC2626"
          />
        </div>

      </div>

    </div>
  );
}
