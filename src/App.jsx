import React from 'react';
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
import { ManagerView } from './pages/ManagerView';
import { ExecutiveView } from './pages/ExecutiveView';
import { Utilities } from './pages/Utilities';

const AppLayout = () => {
  const { sideDrawerShipmentId, setSideDrawerShipmentId } = useOperations();

  return (
    <div className="min-h-screen w-screen overflow-x-hidden flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Sticky Horizontal Navigation Header */}
      <Header />
      
      {/* Scrollable Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50 max-w-7xl w-full mx-auto space-y-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/shipment/:id" element={<Shipment360 />} />
          <Route path="/export-operations" element={<ExportOperations />} />
          <Route path="/import-operations" element={<ImportOperations />} />
          <Route path="/air-export" element={<AirExport />} />
          <Route path="/air-import" element={<AirImport />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bl-management" element={<BLManagement />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Analytics />} />
          <Route path="/manager-view" element={<ManagerView />} />
          <Route path="/executive-view" element={<ExecutiveView />} />
          <Route path="/utilities" element={<Utilities />} />
        </Routes>
      </main>

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
