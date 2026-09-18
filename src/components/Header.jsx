import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  CheckCircle2, 
  Plus, 
  Menu, 
  X,
  Building2,
  Calendar,
  Filter
} from 'lucide-react';

export function Header({ onToggleMobileSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    currentUser, 
    currentUserKey, 
    switchUser, 
    globalSearchQuery, 
    setGlobalSearchQuery,
    notifications,
    markAllNotificationsRead,
    openQuickAction,
    shipments,
    setSideDrawerShipmentId,
    activeMode,
    setActiveMode,
    allowedModes
  } = useOperations();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
        setIsNotifOpen(false);
        setIsSearchResultsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const searchResults = globalSearchQuery.trim() ? shipments.filter(s => {
    const q = globalSearchQuery.toLowerCase();
    return (
      s.id.toLowerCase().includes(q) ||
      (s.customer && s.customer.toLowerCase().includes(q)) ||
      (s.containerNo && s.containerNo.toLowerCase().includes(q)) ||
      (s.blNo && s.blNo.toLowerCase().includes(q)) ||
      (s.bookingNo && s.bookingNo.toLowerCase().includes(q)) ||
      (s.mawb && s.mawb.toLowerCase().includes(q)) ||
      (s.hawb && s.hawb.toLowerCase().includes(q)) ||
      (s.flightNumber && s.flightNumber.toLowerCase().includes(q)) ||
      (s.vessel && s.vessel.toLowerCase().includes(q))
    );
  }).slice(0, 5) : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (globalSearchQuery.trim()) {
      setIsSearchResultsOpen(false);
      navigate('/tracking');
    }
  };

  // Derive active module title from current pathname
  const getModuleTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Operations Dashboard';
    if (path === '/shipments') return 'All Shipments Directory';
    if (path === '/export-operations') return 'Ocean Export Operations';
    if (path === '/import-operations') return 'Ocean Import Operations';
    if (path === '/air-export') return 'Air Export Operations';
    if (path === '/air-import') return 'Air Import Operations';
    if (path === '/tracking') return 'Shipment Tracking';
    if (path === '/tasks') return 'Operational Tasks';
    if (path === '/documentation') return 'Documentation Vault';
    if (path === '/bookings') return 'Booking Directory';
    if (path === '/bl-management') return 'BL & AWB Management';
    if (path === '/analytics') return 'Visual Analytics';
    if (path === '/reports') return 'Operational Reports';
    if (path === '/manager-view') return 'Manager View';
    if (path === '/executive-view') return 'Executive View';
    return 'Logistics Operations';
  };

  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-30 shadow-xs" ref={dropdownRef}>
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Page Module Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
            title="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="font-bold text-base sm:text-lg text-slate-900 leading-tight">
              {getModuleTitle()}
            </h1>
            <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2">
              <span>ZIPAWORLD Operations</span>
              <span>•</span>
              <span className="text-blue-600 font-semibold">{currentUser.role}</span>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md relative hidden lg:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Shipment ID, BL, AWB, Container, Customer..."
              value={globalSearchQuery}
              onChange={(e) => {
                setGlobalSearchQuery(e.target.value);
                setIsSearchResultsOpen(true);
              }}
              onFocus={() => setIsSearchResultsOpen(true)}
              className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-2xs"
            />
          </form>

          {/* Search Results Dropdown */}
          {isSearchResultsOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-500 border-b border-slate-100 flex justify-between bg-slate-50">
                <span>Matching Records ({searchResults.length})</span>
                <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => { setIsSearchResultsOpen(false); navigate('/tracking'); }}>View All</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {searchResults.map(s => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setIsSearchResultsOpen(false);
                      setSideDrawerShipmentId(s.id);
                    }}
                    className="p-3 hover:bg-blue-50/50 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{s.id}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${s.mode === 'Air' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}`}>
                          {s.mode} {s.direction}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px]">{s.customer} • {s.pol || s.originAirport} → {s.pod || s.destinationAirport}</div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.health === 'Delayed' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {s.currentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Global Controls */}
        <div className="flex items-center gap-2">

          {/* Operation Mode Selector */}
          <div className="flex items-center gap-1 bg-slate-100 text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <select
              value={activeMode}
              onChange={(e) => setActiveMode(e.target.value)}
              className="bg-transparent focus:outline-none text-slate-900 cursor-pointer font-extrabold text-xs uppercase"
            >
              {allowedModes.includes('ALL') && (
                <option value="ALL">ALL OPERATIONS</option>
              )}
              {allowedModes.includes('Ocean') && (
                <option value="Ocean">OCEAN MODE</option>
              )}
              {allowedModes.includes('Air') && (
                <option value="Air">AIR MODE</option>
              )}
            </select>
          </div>

          {/* Quick Action Record Creation Button */}
          <button
            onClick={() => openQuickAction('create_shipment')}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Record</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsUserMenuOpen(false);
              }}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <span className="font-bold text-slate-900">Notifications ({unreadCount} new)</span>
                  <button onClick={markAllNotificationsRead} className="text-blue-600 text-[11px] font-semibold hover:underline cursor-pointer">
                    Mark all read
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => {
                        setIsNotifOpen(false);
                        setSideDrawerShipmentId(n.shipmentId);
                      }}
                      className={`p-2.5 rounded-lg cursor-pointer transition-colors border ${n.read ? 'bg-slate-50 border-slate-100 text-slate-500' : 'bg-blue-50/50 border-blue-200 text-slate-900 font-medium'}`}
                    >
                      <div className="text-slate-900">{n.message}</div>
                      <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                        <span className="font-mono text-blue-600 font-bold">{n.shipmentId}</span>
                        <span>{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden md:block text-left text-xs">
                <div className="font-bold text-slate-900 leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500">{currentUser.role}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Switch Persona Role
                </div>
                <div className="py-1 space-y-1">
                  <button
                    onClick={() => { switchUser('manager'); setIsUserMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${currentUserKey === 'manager' ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div>
                      <div className="font-bold">Operations Manager</div>
                      <div className="text-[10px] text-slate-500">Full Access (Ocean + Air)</div>
                    </div>
                    {currentUserKey === 'manager' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </button>

                  <button
                    onClick={() => { switchUser('oceanExec'); setIsUserMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${currentUserKey === 'oceanExec' ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div>
                      <div className="font-bold">Rahul Sharma</div>
                      <div className="text-[10px] text-slate-500">Ocean Executive</div>
                    </div>
                    {currentUserKey === 'oceanExec' && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
                  </button>

                  <button
                    onClick={() => { switchUser('airExec'); setIsUserMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${currentUserKey === 'airExec' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div>
                      <div className="font-bold">Priya Sundaram</div>
                      <div className="text-[10px] text-slate-500">Air Executive</div>
                    </div>
                    {currentUserKey === 'airExec' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                  </button>

                  <button
                    onClick={() => { switchUser('allExec'); setIsUserMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${currentUserKey === 'allExec' ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div>
                      <div className="font-bold">Vikram Singh</div>
                      <div className="text-[10px] text-slate-500">All Operations Exec</div>
                    </div>
                    {currentUserKey === 'allExec' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}

