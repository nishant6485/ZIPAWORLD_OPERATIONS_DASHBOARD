// Unified Mock Operational Alerts for Zipaworld Platform

export const mockAlerts = [
  {
    id: "ALT-101",
    shipmentId: "EXP-2026-00125",
    mode: "Ocean",
    direction: "Export",
    title: "Shipping Instruction (SI) Deadline Approaching",
    severity: "High",
    timestamp: "10 mins ago",
    status: "Open",
    category: "Documentation",
    message: "SI Submission cutoff for MSC Lauren (V.2609E) is today at 16:00 IST.",
    assignedTo: "Rahul Sharma"
  },
  {
    id: "ALT-102",
    shipmentId: "IMP-2026-00842",
    mode: "Ocean",
    direction: "Import",
    title: "Delivery Order (DO) Payment Overdue",
    severity: "Critical",
    timestamp: "25 mins ago",
    status: "Open",
    category: "Finance",
    message: "DO Charges remittance pending from Bharat Heavy. Demurrage accumulating at Mundra Port.",
    assignedTo: "Amit Patel"
  },
  {
    id: "ALT-103",
    shipmentId: "AEX-2026-00105",
    mode: "Air",
    direction: "Export",
    title: "Flight Departure Delayed (BA138)",
    severity: "Critical",
    timestamp: "1 hr ago",
    status: "Open",
    category: "Flight Delay",
    message: "British Airways flight BA138 delayed by 2 hours at Mumbai BOM airport.",
    assignedTo: "Priya Sundaram"
  },
  {
    id: "ALT-104",
    shipmentId: "AIM-2026-00201",
    mode: "Air",
    direction: "Import",
    title: "Customs Medical NOC Verification Required",
    severity: "High",
    timestamp: "2 hrs ago",
    status: "Open",
    category: "Customs Hold",
    message: "Delhi Airport customs inspector requested Drug Controller NOC certificate.",
    assignedTo: "Ananya Roy"
  },
  {
    id: "ALT-105",
    shipmentId: "EXP-2026-00127",
    mode: "Ocean",
    direction: "Export",
    title: "Customs ADC NOC Verification Pending",
    severity: "Critical",
    timestamp: "3 hrs ago",
    status: "Open",
    category: "Customs Hold",
    message: "Reefer container HLCU3321940 held at Mundra port for ADC clearance.",
    assignedTo: "Vikram Singh"
  }
];
