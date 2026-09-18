import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  CheckCircle2, 
  Plus, 
  Mail, 
  Menu, 
  X,
  LayoutDashboard,
  Ship,
  Plane,
  FileText,
  Calendar,
  FileCheck,
  Search as SearchIcon,
  CheckSquare,
  AlertTriangle,
  BarChart3,
  Users,
  UserCheck,
  Layers,
  ArrowUpRight,
  ArrowDownLeft,
  Wrench,
  DollarSign
} from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    currentUser, 
    currentUserKey, 
    switchUser, 
    activeMode, 
    setActiveMode, 
    globalSearchQuery, 
    setGlobalSearchQuery,
    notifications,
    markAllNotificationsRead,
    openQuickAction,
    shipments,
    setSideDrawerShipmentId
  } = useOperations();

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setIsUserMenuOpen(false);
        setIsNotifOpen(false);
        setIsSearchResultsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const hasOceanAccess = currentUser.access.includes('Ocean');
  const hasAirAccess = currentUser.access.includes('Air');

  // Search Results preview
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

  const isActivePath = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-40 shadow-xs" ref={dropdownRef}>
      
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: ZIPAWORLD Logo & Enterprise Branding */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-extrabold text-xl shadow-xs group-hover:bg-red-700 transition-colors">
              Z
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900 block leading-none">
                ZIPAWORLD
              </span>
              <span className="text-[10px] font-bold text-red-600 tracking-wider uppercase block mt-0.5">
                Logistics E-Mall of India
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Logistics Search Bar */}
        <div className="flex-1 max-w-sm relative hidden lg:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Shipment, MAWB, Container, BL..."
              value={globalSearchQuery}
              onChange={(e) => {
                setGlobalSearchQuery(e.target.value);
                setIsSearchResultsOpen(true);
              }}
              onFocus={() => setIsSearchResultsOpen(true)}
              className="w-full bg-slate-100 text-slate-900 placeholder-slate-400 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-300 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
            />
          </form>

          {/* Live Search Results Popup */}
          {isSearchResultsOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden z-50">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-500 border-b border-slate-100 flex justify-between bg-slate-50">
                <span>Matching Records ({searchResults.length})</span>
                <span className="text-red-600 cursor-pointer hover:underline" onClick={() => { setIsSearchResultsOpen(false); navigate('/tracking'); }}>View All</span>
              </div>
              <div className="divide-y divide-slate-100">
                {searchResults.map(s => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setIsSearchResultsOpen(false);
                      setSideDrawerShipmentId(s.id);
                    }}
                    className="p-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{s.id}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${s.mode === 'Air' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}`}>
                          {s.mode} {s.direction}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px]">{s.customer} • {s.pol || s.originAirport} → {s.pod || s.destinationAirport}</div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.health === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
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

        {/* Right Side Controls: New Quotation, Notifications, Profile Switcher */}
        <div className="flex items-center gap-3">
          
          {/* ZIPAWORLD RED Primary Action Button */}
          <button
            onClick={() => openQuickAction(activeMode === 'Air' ? 'create_air' : 'create_ocean')}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Quotation</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setOpenDropdown(null);
                setIsUserMenuOpen(false);
              }}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <span className="font-bold text-slate-900">Notifications ({unreadCount} new)</span>
                  <button onClick={markAllNotificationsRead} className="text-red-600 text-[11px] font-semibold hover:underline cursor-pointer">
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
                      className={`p-2.5 rounded-lg cursor-pointer transition-colors border ${n.read ? 'bg-slate-50 border-slate-100 text-slate-500' : 'bg-red-50/50 border-red-100 text-slate-800 font-medium'}`}
                    >
                      <div className="text-slate-900">{n.message}</div>
                      <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                        <span className="font-mono text-red-600">{n.shipmentId}</span>
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
                setOpenDropdown(null);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
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
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${currentUserKey === 'manager' ? 'bg-red-50 text-red-700 font-bold border border-red-200' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div>
                      <div>Operations Manager</div>
                      <div className="text-[10px] text-slate-500">Full Access (Ocean + Air)</div>
                    </div>
                    {currentUserKey === 'manager' && <CheckCircle2 className="w-4 h-4 text-red-600" />}
                  </button>

                  <button
                    onClick={() => { switchUser('oceanExec'); setIsUserMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${currentUserKey === 'oceanExec' ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div>
                      <div>Rahul Sharma (Ocean Exec)</div>
                      <div className="text-[10px] text-slate-500">Access: Ocean Only</div>
                    </div>
                    {currentUserKey === 'oceanExec' && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
                  </button>

                  <button
                    onClick={() => { switchUser('airExec'); setIsUserMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${currentUserKey === 'airExec' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div>
                      <div>Priya Sundaram (Air Exec)</div>
                      <div className="text-[10px] text-slate-500">Access: Air Only</div>
                    </div>
                    {currentUserKey === 'airExec' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                  </button>

                  <button
                    onClick={() => { switchUser('allExec'); setIsUserMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${currentUserKey === 'allExec' ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div>
                      <div>Vikram Singh (All Exec)</div>
                      <div className="text-[10px] text-slate-500">Access: Ocean + Air Exec</div>
                    </div>
                    {currentUserKey === 'allExec' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Primary Horizontal Navigation Bar */}
      <nav className="bg-slate-900 text-white border-t border-slate-800 text-xs font-semibold hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1">
          
          {/* 1. Dashboard Link */}
          <button
            onClick={() => { navigate('/'); setOpenDropdown(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 hover:bg-slate-800 transition-colors cursor-pointer ${
              isActivePath('/') ? 'bg-red-600 text-white font-bold' : 'text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          {/* 2. Update Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'update' ? null : 'update')}
              className={`flex items-center gap-1.5 px-4 py-2.5 hover:bg-slate-800 transition-colors cursor-pointer ${
                ['/export-operations', '/import-operations', '/air-export', '/air-import', '/manager-view', '/executive-view'].includes(location.pathname)
                  ? 'bg-red-600 text-white font-bold'
                  : 'text-slate-200'
              }`}
            >
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>Update</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {openDropdown === 'update' && (
              <div className="absolute left-0 mt-0.5 w-52 bg-white text-slate-800 border border-slate-200 rounded-b-lg shadow-xl py-1 z-50">
                {hasOceanAccess && (
                  <>
                    <Link to="/export-operations" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900">
                      <ArrowUpRight className="w-3.5 h-3.5 text-sky-600" />
                      <span>Ocean Export Update</span>
                    </Link>
                    <Link to="/import-operations" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900">
                      <ArrowDownLeft className="w-3.5 h-3.5 text-amber-600" />
                      <span>Ocean Import Update</span>
                    </Link>
                  </>
                )}
                {hasAirAccess && (
                  <>
                    <Link to="/air-export" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900">
                      <ArrowUpRight className="w-3.5 h-3.5 text-teal-600" />
                      <span>Air Export Update</span>
                    </Link>
                    <Link to="/air-import" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900">
                      <ArrowDownLeft className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Air Import Update</span>
                    </Link>
                  </>
                )}
                <div className="border-t border-slate-100 my-1" />
                <Link to="/manager-view" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900">
                  <Users className="w-3.5 h-3.5 text-red-600" />
                  <span>Manager Workflow</span>
                </Link>
                <Link to="/executive-view" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900">
                  <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span>Executive Task List</span>
                </Link>
              </div>
            )}
          </div>

          {/* 3. Shipments Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'shipments' ? null : 'shipments')}
              className={`flex items-center gap-1.5 px-4 py-2.5 hover:bg-slate-800 transition-colors cursor-pointer ${
                ['/shipments'].includes(location.pathname) ? 'bg-red-600 text-white font-bold' : 'text-slate-200'
              }`}
            >
              <Ship className="w-4 h-4 text-sky-400" />
              <span>Shipments</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {openDropdown === 'shipments' && (
              <div className="absolute left-0 mt-0.5 w-52 bg-white text-slate-800 border border-slate-200 rounded-b-lg shadow-xl py-1 z-50">
                <Link to="/shipments" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
                  <Layers className="w-3.5 h-3.5 text-red-600" />
                  <span>All Shipments Directory</span>
                </Link>
                <Link to="/export-operations" onClick={() => { setActiveMode('Ocean'); setOpenDropdown(null); }} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <Ship className="w-3.5 h-3.5 text-sky-600" />
                  <span>Ocean Export Shipments</span>
                </Link>
                <Link to="/import-operations" onClick={() => { setActiveMode('Ocean'); setOpenDropdown(null); }} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <Ship className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ocean Import Shipments</span>
                </Link>
                <Link to="/air-export" onClick={() => { setActiveMode('Air'); setOpenDropdown(null); }} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <Plane className="w-3.5 h-3.5 text-teal-600" />
                  <span>Air Export Shipments</span>
                </Link>
                <Link to="/air-import" onClick={() => { setActiveMode('Air'); setOpenDropdown(null); }} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <Plane className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Air Import Shipments</span>
                </Link>
              </div>
            )}
          </div>

          {/* 4. Invoice Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'invoice' ? null : 'invoice')}
              className={`flex items-center gap-1.5 px-4 py-2.5 hover:bg-slate-800 transition-colors cursor-pointer ${
                openDropdown === 'invoice' ? 'bg-slate-800 text-white' : 'text-slate-200'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Invoice</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {openDropdown === 'invoice' && (
              <div className="absolute left-0 mt-0.5 w-48 bg-white text-slate-800 border border-slate-200 rounded-b-lg shadow-xl py-1 z-50">
                <Link to="/analytics" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pending Invoices</span>
                </Link>
                <Link to="/analytics" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Approved Invoices</span>
                </Link>
                <Link to="/analytics" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <DollarSign className="w-3.5 h-3.5 text-teal-600" />
                  <span>Finance Clearance</span>
                </Link>
              </div>
            )}
          </div>

          {/* 5. Reports Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'reports' ? null : 'reports')}
              className={`flex items-center gap-1.5 px-4 py-2.5 hover:bg-slate-800 transition-colors cursor-pointer ${
                ['/reports', '/analytics'].includes(location.pathname) ? 'bg-red-600 text-white font-bold' : 'text-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-teal-400" />
              <span>Reports</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {openDropdown === 'reports' && (
              <div className="absolute left-0 mt-0.5 w-52 bg-white text-slate-800 border border-slate-200 rounded-b-lg shadow-xl py-1 z-50">
                <Link to="/analytics" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
                  <BarChart3 className="w-3.5 h-3.5 text-red-600" />
                  <span>Visual Analytics Workspace</span>
                </Link>
                <Link to="/reports" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <FileText className="w-3.5 h-3.5 text-sky-600" />
                  <span>Operational Reports</span>
                </Link>
                <Link to="/reports" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Volume & Performance SLA</span>
                </Link>
              </div>
            )}
          </div>

          {/* 6. Utility Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'utility' ? null : 'utility')}
              className={`flex items-center gap-1.5 px-4 py-2.5 hover:bg-slate-800 transition-colors cursor-pointer ${
                ['/tasks', '/documentation', '/bookings', '/bl-management', '/tracking', '/alerts', '/utilities'].includes(location.pathname)
                  ? 'bg-red-600 text-white font-bold'
                  : 'text-slate-200'
              }`}
            >
              <Wrench className="w-4 h-4 text-purple-400" />
              <span>Utility</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {openDropdown === 'utility' && (
              <div className="absolute left-0 mt-0.5 w-52 bg-white text-slate-800 border border-slate-200 rounded-b-lg shadow-xl py-1 z-50">
                <Link to="/tracking" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <SearchIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Shipment Tracking</span>
                </Link>
                <Link to="/tasks" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <CheckSquare className="w-3.5 h-3.5 text-purple-600" />
                  <span>Operational Tasks</span>
                </Link>
                <Link to="/documentation" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <FileText className="w-3.5 h-3.5 text-yellow-600" />
                  <span>Documentation Vault</span>
                </Link>
                <Link to="/bookings" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Booking Directory</span>
                </Link>
                <Link to="/bl-management" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <FileCheck className="w-3.5 h-3.5 text-rose-600" />
                  <span>BL & AWB Management</span>
                </Link>
                <Link to="/alerts" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>Critical Exception Alerts</span>
                </Link>
                <Link to="/utilities" onClick={() => setOpenDropdown(null)} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-slate-700">
                  <Wrench className="w-3.5 h-3.5 text-slate-600" />
                  <span>Logistics Tools & Utilities</span>
                </Link>
              </div>
            )}
          </div>

          {/* 7. Logy Mail Direct Link */}
          <button
            onClick={() => { navigate('/alerts'); setOpenDropdown(null); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 hover:bg-slate-800 transition-colors cursor-pointer ${
              openDropdown === 'mail' ? 'bg-red-600 text-white font-bold' : 'text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4 text-red-400" />
            <span>Logy Mail</span>
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white border-t border-slate-800 p-4 space-y-4">
          <div className="space-y-1 text-xs">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800 font-bold">Dashboard</Link>
            <Link to="/shipments" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">All Shipments</Link>
            <Link to="/export-operations" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">Ocean Export</Link>
            <Link to="/import-operations" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">Ocean Import</Link>
            <Link to="/air-export" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">Air Export</Link>
            <Link to="/air-import" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">Air Import</Link>
            <Link to="/tasks" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">Tasks</Link>
            <Link to="/documentation" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">Documentation</Link>
            <Link to="/bookings" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">Bookings</Link>
            <Link to="/bl-management" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">BL / AWB</Link>
            <Link to="/analytics" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 rounded hover:bg-slate-800">Analytics</Link>
          </div>
        </div>
      )}

    </header>
  );
}
