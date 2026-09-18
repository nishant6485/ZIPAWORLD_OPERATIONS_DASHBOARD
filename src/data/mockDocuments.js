// Unified Global Mock Documents for Zipaworld Platform

export const mockGlobalDocuments = [
  { id: 'doc-1', shipmentId: 'EXP-2026-00125', mode: 'Ocean', direction: 'Export', name: 'Commercial Invoice', type: 'Invoice', status: 'Approved', updatedAt: '2026-09-14', required: true },
  { id: 'doc-2', shipmentId: 'EXP-2026-00125', mode: 'Ocean', direction: 'Export', name: 'Packing List', type: 'Packing List', status: 'Approved', updatedAt: '2026-09-14', required: true },
  { id: 'doc-3', shipmentId: 'EXP-2026-00125', mode: 'Ocean', direction: 'Export', name: 'Shipping Instruction', type: 'SI', status: 'Pending', updatedAt: '2026-09-16', required: true },
  { id: 'doc-4', shipmentId: 'EXP-2026-00125', mode: 'Ocean', direction: 'Export', name: 'Bill of Lading Draft', type: 'BL Draft', status: 'Pending', updatedAt: '2026-09-16', required: true },
  
  { id: 'adoc-1', shipmentId: 'AEX-2026-00101', mode: 'Air', direction: 'Export', name: 'Master Air Waybill (MAWB)', type: 'MAWB', status: 'Approved', updatedAt: '2026-09-16', required: true },
  { id: 'adoc-2', shipmentId: 'AEX-2026-00101', mode: 'Air', direction: 'Export', name: 'House Air Waybill (HAWB)', type: 'HAWB', status: 'Approved', updatedAt: '2026-09-16', required: true },
  { id: 'adoc-3', shipmentId: 'AEX-2026-00101', mode: 'Air', direction: 'Export', name: 'Air Security Declaration', type: 'Security', status: 'Approved', updatedAt: '2026-09-16', required: true },
  
  { id: 'idoc-1', shipmentId: 'IMP-2026-00842', mode: 'Ocean', direction: 'Import', name: 'Master Bill of Lading', type: 'MBL', status: 'Approved', updatedAt: '2026-08-30', required: true },
  { id: 'idoc-2', shipmentId: 'IMP-2026-00842', mode: 'Ocean', direction: 'Import', name: 'Delivery Order Draft', type: 'DO', status: 'Pending', updatedAt: '2026-09-16', required: true },
  
  { id: 'aimdoc-1', shipmentId: 'AIM-2026-00201', mode: 'Air', direction: 'Import', name: 'Master Air Waybill (MAWB)', type: 'MAWB', status: 'Approved', updatedAt: '2026-09-15', required: true },
  { id: 'aimdoc-2', shipmentId: 'AIM-2026-00201', mode: 'Air', direction: 'Import', name: 'House Air Waybill (HAWB)', type: 'HAWB', status: 'Approved', updatedAt: '2026-09-15', required: true },
  { id: 'aimdoc-3', shipmentId: 'AIM-2026-00201', mode: 'Air', direction: 'Import', name: 'Bill of Entry (BOE)', type: 'BOE', status: 'Pending', updatedAt: '2026-09-16', required: true }
];
