import React from 'react';
import { NavLink } from 'react-router-dom';
import { useOperations } from '../context/OperationsContext';
import {
  LayoutDashboard,
  Package,
  Ship,
  Plane,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  CheckSquare,
  FileText,
  Calendar,
  FileCheck,
  BarChart3,
  AlertTriangle,
  Users,
  UserCheck
} from 'lucide-react';

export function Sidebar() {
  const { currentUser } = useOperations();

  const hasOceanAccess = currentUser.access.includes('Ocean');
  const hasAirAccess = currentUser.access.includes('Air');

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
      isActive
        ? 'bg-teal-600/15 text-teal-400 font-bold border-l-2 border-teal-500 pl-2.5'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
    }`;

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 shrink-0 flex flex-col justify-between hidden md:flex overflow-y-auto">
      <div className="p-4 space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center font-bold text-teal-400 text-lg">
            Z
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-wider text-white block">ZIPAWORLD</span>
            <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">
              Operations
            </span>
          </div>
        </div>

        {/* OVERVIEW SECTION */}
        <div>
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Overview
          </div>
          <nav className="space-y-1">
            <NavLink to="/" className={navLinkClass}>
              <LayoutDashboard className="w-4 h-4 text-teal-400" />
              <span>Operations Overview</span>
            </NavLink>
            <NavLink to="/shipments" className={navLinkClass}>
              <Package className="w-4 h-4 text-sky-400" />
              <span>All Shipments</span>
            </NavLink>
          </nav>
        </div>

        {/* OCEAN OPERATIONS SECTION */}
        {hasOceanAccess && (
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Ship className="w-3 h-3 text-sky-400" />
              <span>Ocean</span>
            </div>
            <nav className="space-y-1">
              <NavLink to="/export-operations" className={navLinkClass}>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                <span>Ocean Export</span>
              </NavLink>
              <NavLink to="/import-operations" className={navLinkClass}>
                <ArrowDownLeft className="w-4 h-4 text-amber-400" />
                <span>Ocean Import</span>
              </NavLink>
            </nav>
          </div>
        )}

        {/* AIR OPERATIONS SECTION */}
        {hasAirAccess && (
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Plane className="w-3 h-3 text-teal-400" />
              <span>Air</span>
            </div>
            <nav className="space-y-1">
              <NavLink to="/air-export" className={navLinkClass}>
                <ArrowUpRight className="w-4 h-4 text-teal-400" />
                <span>Air Export</span>
              </NavLink>
              <NavLink to="/air-import" className={navLinkClass}>
                <ArrowDownLeft className="w-4 h-4 text-indigo-400" />
                <span>Air Import</span>
              </NavLink>
            </nav>
          </div>
        )}

        {/* EXECUTION WORKFLOWS */}
        <div>
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Execution
          </div>
          <nav className="space-y-1">
            <NavLink to="/tracking" className={navLinkClass}>
              <Search className="w-4 h-4 text-blue-400" />
              <span>Tracking</span>
            </NavLink>
            <NavLink to="/tasks" className={navLinkClass}>
              <CheckSquare className="w-4 h-4 text-purple-400" />
              <span>Tasks</span>
            </NavLink>
            <NavLink to="/documentation" className={navLinkClass}>
              <FileText className="w-4 h-4 text-yellow-400" />
              <span>Documentation</span>
            </NavLink>
            <NavLink to="/bookings" className={navLinkClass}>
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Bookings</span>
            </NavLink>
            <NavLink to="/bl-management" className={navLinkClass}>
              <FileCheck className="w-4 h-4 text-rose-400" />
              <span>BL / AWB</span>
            </NavLink>
            <NavLink to="/alerts" className={navLinkClass}>
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Alerts</span>
            </NavLink>
          </nav>
        </div>

        {/* ANALYTICS & VIEWS */}
        <div>
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Analytics & Views
          </div>
          <nav className="space-y-1">
            <NavLink to="/analytics" className={navLinkClass}>
              <BarChart3 className="w-4 h-4 text-teal-400" />
              <span>Analytics</span>
            </NavLink>
            <NavLink to="/manager-view" className={navLinkClass}>
              <Users className="w-4 h-4 text-sky-400" />
              <span>Manager View</span>
            </NavLink>
            <NavLink to="/executive-view" className={navLinkClass}>
              <UserCheck className="w-4 h-4 text-indigo-400" />
              <span>Executive View</span>
            </NavLink>
          </nav>
        </div>

      </div>

      {/* Footer Info Badge */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400">
        <div className="font-semibold text-slate-300">ZIPAWORLD v2.4</div>
        <div className="text-[10px] text-slate-500">Enterprise Operations Platform</div>
      </div>
    </aside>
  );
}
