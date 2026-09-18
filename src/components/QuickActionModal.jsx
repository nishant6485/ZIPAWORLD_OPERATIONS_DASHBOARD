import React, { useState } from 'react';
import { useOperations } from '../context/OperationsContext';
import { X, Ship, Plane, Plus, CheckSquare, FileText, Calendar } from 'lucide-react';

export function QuickActionModal() {
  const {
    isQuickActionModalOpen,
    setIsQuickActionModalOpen,
    quickActionType,
    createShipment,
    addTask
  } = useOperations();

  const [mode, setMode] = useState('Ocean');
  const [direction, setDirection] = useState('Export');
  const [customer, setCustomer] = useState('');
  const [polOrigin, setPolOrigin] = useState('');
  const [podDest, setPodDest] = useState('');
  const [carrier, setCarrier] = useState('');
  const [commodity, setCommodity] = useState('');

  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('High');

  if (!isQuickActionModalOpen) return null;

  const handleCreateShipmentSubmit = (e) => {
    e.preventDefault();
    if (!customer.trim()) return;

    createShipment({
      mode,
      direction,
      shipmentType: mode === 'Air' ? 'Air Cargo' : 'FCL',
      customer,
      pol: mode === 'Ocean' ? polOrigin || 'Nhava Sheva' : null,
      pod: mode === 'Ocean' ? podDest || 'Hamburg' : null,
      originAirport: mode === 'Air' ? polOrigin || 'Delhi (DEL)' : null,
      destinationAirport: mode === 'Air' ? podDest || 'Frankfurt (FRA)' : null,
      shippingLine: mode === 'Ocean' ? carrier || 'MSC' : null,
      airline: mode === 'Air' ? carrier || 'Lufthansa Cargo' : null,
      commodity: commodity || 'General Freight',
      etd: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
      eta: new Date(Date.now() + 86400000 * 18).toISOString().slice(0, 10),
      assignedTo: 'Rahul Sharma'
    });

    setIsQuickActionModalOpen(false);
  };

  const handleCreateTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addTask({
      title: taskTitle,
      priority: taskPriority,
      category: 'Operations',
      status: 'In Progress',
      assignedTo: 'Rahul Sharma',
      dueDate: new Date(Date.now() + 86400000).toISOString().replace('T', ' ').slice(0, 16)
    });

    setIsQuickActionModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden text-slate-800">
        
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-red-500" />
            <span>Create New Operational Record</span>
          </h3>
          <button
            onClick={() => setIsQuickActionModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {quickActionType === 'create_task' ? (
            <form onSubmit={handleCreateTaskSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Verify HAWB Draft with Air Terminal Agent"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2.5 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Priority Level</label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2.5 focus:outline-none focus:border-red-600"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical Priority</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg shadow-sm transition-colors">
                Create Operational Task
              </button>
            </form>
          ) : (
            <form onSubmit={handleCreateShipmentSubmit} className="space-y-4 text-xs">
              
              {/* Mode & Direction Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Transportation Mode</label>
                  <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setMode('Ocean')}
                      className={`flex-1 py-1.5 rounded text-xs font-bold flex items-center justify-center gap-1 ${
                        mode === 'Ocean' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Ship className="w-3.5 h-3.5" /> Ocean
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('Air')}
                      className={`flex-1 py-1.5 rounded text-xs font-bold flex items-center justify-center gap-1 ${
                        mode === 'Air' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Plane className="w-3.5 h-3.5" /> Air
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Direction</label>
                  <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setDirection('Export')}
                      className={`flex-1 py-1.5 rounded text-xs font-bold ${
                        direction === 'Export' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Export
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirection('Import')}
                      className={`flex-1 py-1.5 rounded text-xs font-bold ${
                        direction === 'Import' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Import
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Spices Ltd"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2.5 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">
                    {mode === 'Air' ? 'Origin Airport' : 'Port of Loading (POL)'}
                  </label>
                  <input
                    type="text"
                    placeholder={mode === 'Air' ? 'e.g. Delhi (DEL)' : 'e.g. Nhava Sheva'}
                    value={polOrigin}
                    onChange={(e) => setPolOrigin(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2.5 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-medium">
                    {mode === 'Air' ? 'Destination Airport' : 'Port of Discharge (POD)'}
                  </label>
                  <input
                    type="text"
                    placeholder={mode === 'Air' ? 'e.g. Frankfurt (FRA)' : 'e.g. Hamburg'}
                    value={podDest}
                    onChange={(e) => setPodDest(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2.5 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-medium">
                    {mode === 'Air' ? 'Airline Name' : 'Shipping Line'}
                  </label>
                  <input
                    type="text"
                    placeholder={mode === 'Air' ? 'e.g. Lufthansa Cargo' : 'e.g. MSC'}
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2.5 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-medium">Commodity</label>
                  <input
                    type="text"
                    placeholder="e.g. Organic Spices"
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg p-2.5 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg shadow-sm mt-2 transition-colors">
                Create {mode} {direction} Shipment
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
