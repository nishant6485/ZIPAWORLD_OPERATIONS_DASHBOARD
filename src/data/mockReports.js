export const mockMonthlyVolume = [
  { month: 'Apr 2026', exportCount: 78, importCount: 65, totalTEU: 240 },
  { month: 'May 2026', exportCount: 84, importCount: 70, totalTEU: 265 },
  { month: 'Jun 2026', exportCount: 91, importCount: 74, totalTEU: 288 },
  { month: 'Jul 2026', exportCount: 88, importCount: 79, totalTEU: 295 },
  { month: 'Aug 2026', exportCount: 94, importCount: 81, totalTEU: 310 },
  { month: 'Sep 2026', exportCount: 96, importCount: 82, totalTEU: 325 },
];

export const mockTopPOLs = [
  { portName: 'Nhava Sheva (JNPT)', code: 'INNSA', country: 'India', activeShipments: 64, totalTEUs: 142, sharePercentage: 38 },
  { portName: 'Mundra Port', code: 'INMUN', country: 'India', activeShipments: 45, totalTEUs: 98, sharePercentage: 27 },
  { portName: 'Chennai Port', code: 'MAA', country: 'India', activeShipments: 26, totalTEUs: 52, sharePercentage: 15 },
  { portName: 'Kolkata Port', code: 'CCU', country: 'India', activeShipments: 18, totalTEUs: 34, sharePercentage: 11 },
  { portName: 'Hazira Port', code: 'INHZR', country: 'India', activeShipments: 15, totalTEUs: 28, sharePercentage: 9 },
];

export const mockTopPODs = [
  { portName: 'Hamburg Port', code: 'DEHAM', country: 'Germany', activeShipments: 42, totalTEUs: 94, sharePercentage: 25 },
  { portName: 'Rotterdam Port', code: 'NLRTM', country: 'Netherlands', activeShipments: 38, totalTEUs: 86, sharePercentage: 23 },
  { portName: 'Jebel Ali Port', code: 'AEJEA', country: 'UAE', activeShipments: 34, totalTEUs: 72, sharePercentage: 20 },
  { portName: 'Singapore Hub Port', code: 'SGSIN', country: 'Singapore', activeShipments: 30, totalTEUs: 64, sharePercentage: 18 },
  { portName: 'Antwerp Port', code: 'BEANR', country: 'Belgium', activeShipments: 24, totalTEUs: 48, sharePercentage: 14 },
];

export const mockShippingLineStats = [
  { carrier: 'MSC (Mediterranean Shipping Co)', code: 'MSC', activeShipments: 48, bookingsThisMonth: 62, delayedCount: 3, onTimePercentage: 94.2, avgDelayDays: 0.8, pendingBLs: 4 },
  { carrier: 'Maersk Line', code: 'MAEU', activeShipments: 42, bookingsThisMonth: 54, delayedCount: 4, onTimePercentage: 91.5, avgDelayDays: 1.2, pendingBLs: 3 },
  { carrier: 'CMA CGM', code: 'CMAU', activeShipments: 31, bookingsThisMonth: 38, delayedCount: 2, onTimePercentage: 93.8, avgDelayDays: 0.9, pendingBLs: 2 },
  { carrier: 'Hapag-Lloyd', code: 'HLCU', activeShipments: 22, bookingsThisMonth: 29, delayedCount: 1, onTimePercentage: 96.0, avgDelayDays: 0.5, pendingBLs: 1 },
  { carrier: 'ONE (Ocean Network Express)', code: 'ONEY', activeShipments: 18, bookingsThisMonth: 22, delayedCount: 1, onTimePercentage: 95.1, avgDelayDays: 0.6, pendingBLs: 2 },
  { carrier: 'COSCO Shipping', code: 'COSU', activeShipments: 14, bookingsThisMonth: 18, delayedCount: 2, onTimePercentage: 88.9, avgDelayDays: 1.8, pendingBLs: 2 },
];
