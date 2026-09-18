import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OperationsProvider, useOperations } from './context/OperationsContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ShipmentDrawer } from './components/ShipmentDrawer';
import { QuickActionModal } from './components/QuickActionModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Shipments } from './pages/Shipments';
import { Shipment360 } from './pages/Shipment360';
import { ExportOperations } from './pages/ExportOperations';
import { ImportOperations } from './pages/ImportOperations';
import { AirExport } from './pages/AirExport';
import { AirImport } from './pages/AirImport';
import { Tasks } from './pages/Tasks';
import { Tracking } from './pages/Tracking';
import { Documentation } from './pages/Documentation';
import { Bookings } from './pages/Bookings';
import { BLManagement } from './pages/BLManagement';
import { Alerts } from './pages/Alerts';
import { Analytics } from './pages/Analytics';
import { Reports } from './pages/Reports';
import { ManagerView } from './pages/ManagerView';
import { ExecutiveView } from './pages/ExecutiveView';
import { Utilities } from './pages/Utilities';

import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProtectedRoute = ({ requiredMode, children }) => {
  const { currentUser } = useOperations();
  const allowed = !currentUser.access || currentUser.access.includes(requiredMode);

  if (!allowed) {
    return (
      <div className="bg-white border border-rose-200 rounded-xl p-8 max-w-lg mx-auto text-center space-y-4 my-12 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900">Access Restricted</h2>
          <p className="text-xs text-slate-500 mt-1">
            Your current persona role (<strong className="text-slate-900">{currentUser.name}</strong> - {currentUser.role}) does not have permission to access <strong>{requiredMode} Operations</strong>.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
            Return to Operations Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

const AppLayout = () => {
  const { sideDrawerShipmentId, setSideDrawerShipmentId } = useOperations();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-slate-100 text-slate-900 font-sans antialiased flex overflow-hidden">
      
      {/* Desktop Fixed Deep Navy Sidebar Container */}
      <div className="hidden md:flex w-64 h-full shrink-0 z-40">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-64 max-w-[80%] h-full z-50">
            <Sidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area (Independent Vertical Scroll, No Horizontal Page Scroll) */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-100 overflow-y-auto overflow-x-hidden">
        {/* Compact Header */}
        <Header onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/shipment/:id" element={<Shipment360 />} />
            <Route path="/export-operations" element={<ProtectedRoute requiredMode="Ocean"><ExportOperations /></ProtectedRoute>} />
            <Route path="/import-operations" element={<ProtectedRoute requiredMode="Ocean"><ImportOperations /></ProtectedRoute>} />
            <Route path="/air-export" element={<ProtectedRoute requiredMode="Air"><AirExport /></ProtectedRoute>} />
            <Route path="/air-import" element={<ProtectedRoute requiredMode="Air"><AirImport /></ProtectedRoute>} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bl-management" element={<BLManagement />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/manager-view" element={<ManagerView />} />
            <Route path="/executive-view" element={<ExecutiveView />} />
            <Route path="/utilities" element={<Utilities />} />
          </Routes>
        </main>
      </div>

      {/* Quick Side Drawer Overlay */}
      <ShipmentDrawer
        shipmentId={sideDrawerShipmentId}
        onClose={() => setSideDrawerShipmentId(null)}
      />

      {/* Quick Action Modal Overlay */}
      <QuickActionModal />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <OperationsProvider>
        <AppLayout />
      </OperationsProvider>
    </BrowserRouter>
  );
}

export default App;

