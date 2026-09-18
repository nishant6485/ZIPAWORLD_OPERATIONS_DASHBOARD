import React, { createContext, useContext, useState, useMemo } from 'react';
import { mockShipments } from '../data/mockShipments.js';
import { mockTasks } from '../data/mockTasks.js';
import { mockAlerts } from '../data/mockAlerts.js';
import { mockBookings } from '../data/mockBookings.js';
import { mockBLRecords } from '../data/mockBLRecords.js';
import { mockExecutives } from '../data/mockExecutives.js';
import { mockGlobalDocuments } from '../data/mockDocuments.js';
import { calculateOperationsStats } from '../utils/statsCalculator.js';

const MOCK_USERS = {
  manager: {
    name: "Operations Manager",
    role: "Manager",
    access: ["Ocean", "Air"],
    defaultMode: "ALL"
  },
  oceanExec: {
    name: "Rahul Sharma",
    role: "Executive",
    access: ["Ocean"],
    defaultMode: "Ocean"
  },
  airExec: {
    name: "Priya Sundaram",
    role: "Executive",
    access: ["Air"],
    defaultMode: "Air"
  },
  allExec: {
    name: "Vikram Singh",
    role: "Executive",
    access: ["Ocean", "Air"],
    defaultMode: "ALL"
  }
};

const initialNotifications = [
  { id: 'notif-1', shipmentId: 'EXP-2026-00125', message: 'SI Submission deadline today at 16:00 IST', time: '10 mins ago', read: false, type: 'alert' },
  { id: 'notif-2', shipmentId: 'IMP-2026-00842', message: 'Delivery Order payment overdue from Bharat Heavy', time: '25 mins ago', read: false, type: 'alert' },
  { id: 'notif-3', shipmentId: 'AEX-2026-00105', message: 'Flight BA138 departure delayed by 2 hours at BOM', time: '1 hr ago', read: false, type: 'alert' },
  { id: 'notif-4', shipmentId: 'AIM-2026-00201', message: 'Delhi Customs requested Drug Controller NOC', time: '2 hrs ago', read: true, type: 'update' }
];

const OperationsContext = createContext(undefined);

export const OperationsProvider = ({ children }) => {
  const [currentUserKey, setCurrentUserKey] = useState('manager'); // 'manager', 'oceanExec', 'airExec', 'allExec'
  const currentUser = MOCK_USERS[currentUserKey] || MOCK_USERS.manager;

  const [rawShipments, setShipments] = useState(mockShipments);
  const [rawTasks, setTasks] = useState(mockTasks);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [rawBookings, setBookings] = useState(mockBookings);
  const [rawBLRecords, setBLRecords] = useState(mockBLRecords);
  const [rawDocuments, setDocuments] = useState(mockGlobalDocuments);
  const [executives, setExecutives] = useState(mockExecutives);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [activeModeState, setActiveModeState] = useState('ALL'); // 'ALL', 'Ocean', 'Air'
  const [activeDirection, setActiveDirection] = useState('ALL'); // 'ALL', 'EXPORT', 'IMPORT'
  const [activeShipmentType, setActiveShipmentType] = useState('ALL'); // 'ALL', 'FCL', 'LCL', 'Air Cargo'
  const [globalDateFilter, setGlobalDateFilter] = useState('30d');
  const [executiveFilter, setExecutiveFilter] = useState('ALL');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const [selectedShipmentId, setSelectedShipmentId] = useState(null);
  const [sideDrawerShipmentId, setSideDrawerShipmentId] = useState(null);

  const [isQuickActionModalOpen, setIsQuickActionModalOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState(null);

  // Compute allowed modes for current user
  const allowedModes = useMemo(() => {
    if (!currentUser || !currentUser.access || currentUser.access.length === 0) return ['ALL', 'Ocean', 'Air'];
    if (currentUser.access.length === 1) return currentUser.access;
    return ['ALL', 'Ocean', 'Air'];
  }, [currentUser]);

  // Ensure activeMode is restricted to user permissions
  const activeMode = useMemo(() => {
    if (allowedModes.length === 1) return allowedModes[0];
    if (!allowedModes.includes(activeModeState)) return 'ALL';
    return activeModeState;
  }, [allowedModes, activeModeState]);

  const setActiveMode = (mode) => {
    if (allowedModes.includes(mode)) {
      setActiveModeState(mode);
    }
  };

  // Filter datasets based on activeMode and user role
  const shipments = useMemo(() => {
    let list = rawShipments;
    if (activeMode !== 'ALL') {
      list = list.filter(s => s.mode === activeMode);
    } else if (currentUser && currentUser.access && currentUser.access.length === 1) {
      list = list.filter(s => s.mode === currentUser.access[0]);
    }
    return list;
  }, [rawShipments, activeMode, currentUser]);

  const tasks = useMemo(() => {
    let list = rawTasks;
    if (activeMode !== 'ALL') {
      list = list.filter(t => t.mode === activeMode);
    } else if (currentUser && currentUser.access && currentUser.access.length === 1) {
      list = list.filter(t => t.mode === currentUser.access[0]);
    }
    return list;
  }, [rawTasks, activeMode, currentUser]);

  const documents = useMemo(() => {
    let list = rawDocuments;
    if (activeMode !== 'ALL') {
      list = list.filter(d => d.mode === activeMode);
    } else if (currentUser && currentUser.access && currentUser.access.length === 1) {
      list = list.filter(d => d.mode === currentUser.access[0]);
    }
    return list;
  }, [rawDocuments, activeMode, currentUser]);

  const bookings = useMemo(() => {
    let list = rawBookings;
    if (activeMode !== 'ALL') {
      list = list.filter(b => b.mode === activeMode);
    } else if (currentUser && currentUser.access && currentUser.access.length === 1) {
      list = list.filter(b => b.mode === currentUser.access[0]);
    }
    return list;
  }, [rawBookings, activeMode, currentUser]);

  const blRecords = useMemo(() => {
    let list = rawBLRecords;
    if (activeMode !== 'ALL') {
      list = list.filter(b => b.mode === activeMode);
    } else if (currentUser && currentUser.access && currentUser.access.length === 1) {
      list = list.filter(b => b.mode === currentUser.access[0]);
    }
    return list;
  }, [rawBLRecords, activeMode, currentUser]);

  const openQuickAction = (type) => {
    setQuickActionType(type);
    setIsQuickActionModalOpen(true);
  };

  const switchUser = (userKey) => {
    if (MOCK_USERS[userKey]) {
      setCurrentUserKey(userKey);
      const newU = MOCK_USERS[userKey];
      if (newU.access.length === 1) {
        setActiveModeState(newU.access[0]);
      } else {
        setActiveModeState('ALL');
      }
    }
  };

  const updateWorkflowStep = (shipmentId, stepId, newStatus, remarks) => {
    setShipments(prev => prev.map(shipment => {
      if (shipment.id !== shipmentId) return shipment;
      
      const updatedWorkflow = (shipment.workflow || []).map(step => {
        if (step.id !== stepId) return step;
        return {
          ...step,
          status: newStatus,
          remarks: remarks || step.remarks,
          completedDate: newStatus === 'completed' ? new Date().toISOString().replace('T', ' ').slice(0, 16) : step.completedDate,
          completedBy: newStatus === 'completed' ? currentUser.name : step.completedBy
        };
      });

      const completedSteps = updatedWorkflow.filter(s => s.status === 'completed').length;
      const progress = updatedWorkflow.length ? Math.round((completedSteps / updatedWorkflow.length) * 100) : shipment.progress;

      return {
        ...shipment,
        workflow: updatedWorkflow,
        progress,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };
    }));
  };

  const addOperationalNote = (shipmentId, noteText) => {
    if (!noteText || !noteText.trim()) return;
    const newNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      author: currentUser.name,
      text: noteText,
      type: 'general'
    };

    setShipments(prev => prev.map(s => {
      if (s.id !== shipmentId) return s;
      return {
        ...s,
        notes: [newNote, ...(s.notes || [])],
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };
    }));
  };

  const addFollowUp = (shipmentId, item, assignedTo) => {
    const newFollowUp = {
      id: `fol-${Date.now()}`,
      item,
      requestedDate: new Date().toISOString().slice(0, 10),
      daysWaiting: 0,
      nextFollowUp: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      status: 'Pending',
      assignedTo: assignedTo || currentUser.name
    };

    setShipments(prev => prev.map(s => {
      if (s.id !== shipmentId) return s;
      return {
        ...s,
        followUps: [newFollowUp, ...(s.followUps || [])]
      };
    }));
  };

  const updateShipmentStatus = (shipmentId, status) => {
    setShipments(prev => prev.map(s => {
      if (s.id !== shipmentId) return s;
      return {
        ...s,
        currentStatus: status,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };
    }));
  };

  const completeTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'Completed' } : t));
  };

  const addTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      createdDate: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const createShipment = (newShipmentData) => {
    const newShipment = {
      ...newShipmentData,
      id: newShipmentData.mode === 'Air' 
        ? `${newShipmentData.direction === 'Import' ? 'AIM' : 'AEX'}-2026-${Math.floor(10000 + Math.random() * 90000)}`
        : `${newShipmentData.direction === 'Import' ? 'IMP' : 'EXP'}-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      jobNo: `JOB-${newShipmentData.mode === 'Air' ? 'A' : ''}${newShipmentData.direction === 'Import' ? 'IM' : 'EX'}-${Math.floor(1000 + Math.random() * 9000)}`,
      progress: 15,
      health: 'Healthy',
      currentStatus: 'Query & Rate',
      lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16),
      workflow: [],
      notes: [],
      followUps: [],
      documents: []
    };

    setShipments(prev => [newShipment, ...prev]);
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Resolved' } : a));
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Compute stats dynamically from current state and filters
  const stats = useMemo(() => {
    return calculateOperationsStats(
      shipments,
      tasks,
      documents,
      bookings,
      blRecords,
      alerts,
      executives,
      globalDateFilter,
      activeShipmentType,
      activeMode,
      activeDirection,
      executiveFilter,
      currentUser
    );
  }, [
    shipments, tasks, documents, bookings, blRecords, alerts, executives,
    globalDateFilter, activeShipmentType, activeMode, activeDirection, executiveFilter, currentUser
  ]);

  const value = useMemo(() => ({
    currentUser,
    currentUserKey,
    switchUser,
    mockUsersList: MOCK_USERS,
    shipments,
    tasks,
    alerts,
    bookings,
    blRecords,
    documents,
    executives,
    notifications,
    activeMode,
    allowedModes,
    setActiveMode,
    activeDirection,
    setActiveDirection,
    activeShipmentType,
    setActiveShipmentType,
    globalDateFilter,
    setGlobalDateFilter,
    executiveFilter,
    setExecutiveFilter,
    globalSearchQuery,
    setGlobalSearchQuery,
    selectedShipmentId,
    setSelectedShipmentId,
    sideDrawerShipmentId,
    setSideDrawerShipmentId,
    stats,
    updateWorkflowStep,
    addOperationalNote,
    addFollowUp,
    updateShipmentStatus,
    completeTask,
    addTask,
    createShipment,
    resolveAlert,
    markNotificationAsRead,
    markAllNotificationsRead,
    isQuickActionModalOpen,
    setIsQuickActionModalOpen,
    quickActionType,
    openQuickAction
  }), [
    currentUser, currentUserKey, shipments, tasks, alerts, bookings, blRecords, documents, executives, notifications,
    activeMode, activeDirection, activeShipmentType, globalDateFilter, executiveFilter, globalSearchQuery,
    selectedShipmentId, sideDrawerShipmentId, stats, isQuickActionModalOpen, quickActionType
  ]);

  return (
    <OperationsContext.Provider value={value}>
      {children}
    </OperationsContext.Provider>
  );
};

export const useOperations = () => {
  const context = useContext(OperationsContext);
  if (!context) throw new Error('useOperations must be used within OperationsProvider');
  return context;
};
