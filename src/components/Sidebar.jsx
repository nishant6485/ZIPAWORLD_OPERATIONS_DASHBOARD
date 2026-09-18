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
  Users,
  UserCheck,
  FileSpreadsheet
} from 'lucide-react';

export function Sidebar({ onCloseMobile }) {
  const { currentUser, shipments = [], tasks = [] } = useOperations();

  const activeShipmentsCount = shipments.filter(s => s.status !== 'Completed').length;
  const pendingTasksCount = tasks.filter(t => t.status !== 'Completed').length;

  const navLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
      isActive
        ? 'bg-blue-600 text-white font-semibold shadow-xs border-l-4 border-blue-400 pl-2.5'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
    }`;

  return (
    <aside className="w-64 h-full bg-slate-900 border-r border-slate-800 shrink-0 flex flex-col justify-between overflow-y-auto">
      <div className="p-4 space-y-5">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-1.5 border-b border-slate-800/80 pb-4">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xl shadow-md">
            Z
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-sm tracking-wide text-white block">ZIPAWORLD</span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              LOGISTICS E-MALL
            </span>
          </div>
        </div>

        {/* OPERATIONS SECTION */}
        <div>
          <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Operations
          </div>
          <nav className="space-y-1">
            <NavLink to="/" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-blue-400" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            <NavLink to="/shipments" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-sky-400" />
                <span>All Shipments</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-bold text-slate-300 border border-slate-700">
                {activeShipmentsCount}
              </span>
            </NavLink>
          </nav>
        </div>

        {/* OCEAN OPERATIONS */}
        {(!currentUser.access || currentUser.access.includes('Ocean')) && (
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Ship className="w-3.5 h-3.5 text-sky-400" />
              <span>Ocean</span>
            </div>
            <nav className="space-y-1">
              <NavLink to="/export-operations" onClick={onCloseMobile} className={navLinkClass}>
                <div className="flex items-center gap-2.5">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  <span>Ocean Export</span>
                </div>
              </NavLink>
              <NavLink to="/import-operations" onClick={onCloseMobile} className={navLinkClass}>
                <div className="flex items-center gap-2.5">
                  <ArrowDownLeft className="w-4 h-4 text-amber-400" />
                  <span>Ocean Import</span>
                </div>
              </NavLink>
            </nav>
          </div>
        )}

        {/* AIR OPERATIONS */}
        {(!currentUser.access || currentUser.access.includes('Air')) && (
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-teal-400" />
              <span>Air</span>
            </div>
            <nav className="space-y-1">
              <NavLink to="/air-export" onClick={onCloseMobile} className={navLinkClass}>
                <div className="flex items-center gap-2.5">
                  <ArrowUpRight className="w-4 h-4 text-teal-400" />
                  <span>Air Export</span>
                </div>
              </NavLink>
              <NavLink to="/air-import" onClick={onCloseMobile} className={navLinkClass}>
                <div className="flex items-center gap-2.5">
                  <ArrowDownLeft className="w-4 h-4 text-indigo-400" />
                  <span>Air Import</span>
                </div>
              </NavLink>
            </nav>
          </div>
        )}

        {/* EXECUTION */}
        <div>
          <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Execution
          </div>
          <nav className="space-y-1">
            <NavLink to="/tracking" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-blue-400" />
                <span>Tracking</span>
              </div>
            </NavLink>
            <NavLink to="/tasks" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <CheckSquare className="w-4 h-4 text-purple-400" />
                <span>Tasks</span>
              </div>
              <span className="text-[10px] bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded-full font-bold border border-purple-800">
                {pendingTasksCount}
              </span>
            </NavLink>
            <NavLink to="/documentation" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Documentation</span>
              </div>
            </NavLink>
            <NavLink to="/bookings" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Bookings</span>
              </div>
            </NavLink>
            <NavLink to="/bl-management" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-rose-400" />
                <span>BL / AWB</span>
              </div>
            </NavLink>
          </nav>
        </div>

        {/* INSIGHTS */}
        <div>
          <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Insights
          </div>
          <nav className="space-y-1">
            <NavLink to="/analytics" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>Analytics</span>
              </div>
            </NavLink>
            <NavLink to="/reports" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Reports</span>
              </div>
            </NavLink>
          </nav>
        </div>

        {/* MANAGEMENT */}
        <div>
          <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Management
          </div>
          <nav className="space-y-1">
            <NavLink to="/manager-view" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-sky-400" />
                <span>Manager View</span>
              </div>
            </NavLink>
            <NavLink to="/executive-view" onClick={onCloseMobile} className={navLinkClass}>
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                <span>Executive View</span>
              </div>
            </NavLink>
          </nav>
        </div>

      </div>

      {/* Footer Info Badge */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400">
        <div className="font-semibold text-slate-200">ZIPAWORLD v2.4</div>
        <div className="text-[10px] text-slate-400">Enterprise Operations Platform</div>
      </div>
    </aside>
  );
}

