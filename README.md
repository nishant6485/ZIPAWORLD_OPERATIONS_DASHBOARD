# ZIPAWORLD Unified Logistics Operations Platform

## Overview & Purpose
ZIPAWORLD is a high-performance, enterprise-grade freight operations platform built to serve logistics organizations managing **Ocean (Export & Import - FCL & LCL)** and **Air (Export & Import - MAWB & HAWB)** shipments.

The platform provides a progressive disclosure user experience designed around operational cockpit principles:
**SUMMARY → FILTER → SELECT → INSPECT → ACT**.

---

## Core Operational Features

### 1. Operations Cockpit (Dashboard)
- **Compact Summary KPIs**: 6 interactive metrics (Active Shipments, Needs Attention, Due Today, Delayed, Completed, Pending Tasks). Clicking any KPI filters or routes directly to target shipments.
- **Priority Attention Queue**: Urgent exceptions with severity badges, issue breakdown, due times, and assigned owners.
- **Today's Work Schedule**: Concise activity timeline for document deadlines, customs submissions, and flight/vessel milestones.
- **Volume Trend**: Clean, un-cluttered daily shipment volume chart.
- **Recent Operational Activity**: Concise 6-item shipment directory with a direct link to the full `/shipments` master directory.

### 2. Unified Shipment Directory (`/shipments`)
- Master operational view covering all modes.
- Filter by Mode (All, Ocean, Air), Direction (Export, Import), Type (FCL, LCL, Air Cargo), Executive, Date Range (7d, 30d, 90d, This Month), and Status tabs (All, In Transit, Customs Hold, Attention, Delivered).
- **Column Customization (`[ Columns ▼ ]`)**: Toggle optional fields (Weight & Packages, Incoterm, References).
- **Quick View Drawer**: Instant operational snapshot upon row click.
- **Shipment 360 Workspace**: Dedicated full workspace page (`/shipment/:id`) for deep execution.

### 3. Mode-Specific Operations
- **Ocean Export (`/export-operations`)**: FCL/LCL workflows, SI/BL deadlines, Vessel ETD/ETA tracking.
- **Ocean Import (`/import-operations`)**: Pre-alert, IGM filing, Vessel Arrival, Delivery Order (DO), BOE / Customs, OOC, Delivery.
- **Air Export (`/air-export`)**: Booking / Space, MAWB/HAWB allocation, Cargo Readiness, Customs, RCS, Airport Handover, Flight Departure.
- **Air Import (`/air-import`)**: Pre-alert, Flight Arrival, RCF / Cargo Terminal, Customs clearance, OOC, Final Delivery.

### 4. Work Execution Modules
- **Tasks & Follow-ups (`/tasks`)**: Operational action items categorized by Documentation, Customs, Operations, and Finance.
- **Documentation (`/documentation`)**: SI, Shipping Bill, Bill of Lading, Air Waybill, Delivery Order, and Certificate of Origin verification workflow.
- **Space & Bookings (`/bookings`)**: Carrier & Airline booking reference management.
- **BL / AWB Management (`/bl-management`)**: Master & House BL/AWB reference directory with mode-aware views.
- **Tracking 360 (`/tracking`)**: Search-first milestone tracker by Shipment ID, Container No, BL, AWB, Flight, or Vessel.
- **Operational Alerts (`/alerts`)**: Actionable exception feeds connected directly to shipment drawers and task resolution.

### 5. Role-Based Views & Security Framework
- **Manager View (`/manager-view`)**: High-level team workload distribution, SLA compliance, bottleneck tracking, and escalation management.
- **Executive View (`/executive-view`)**: Personal daily workload cockpit for active shipments, pending tasks, and upcoming deadlines.
- **Persona Switcher**: Quick role selector in the header (Operations Manager, Ocean Executive, Air Executive, All Access Executive) to simulate backend permission scopes.

### 6. Visual Analytics Workspace (`/analytics`)
- Single source of truth statistics powered by `statsCalculator.js`.
- Descriptive statistical distribution: Mean processing time (4.6d), Median (4.0d), P95 SLA upper boundary (7.8d).
- Visual charts: Volume Trends, Mode Mix, Import vs Export, Workflow Stage Bottlenecks, and Carrier Performance.

---

## Technical Architecture & Code Structure

```
d:/Desktop/ZIPAWORLD_DASHBOARD/
├── src/
│   ├── components/       # Reusable UI components (Sidebar, Header, FilterBar, ShipmentTable, ShipmentDrawer, QuickActionModal)
│   ├── context/          # OperationsContext (Global state, persona RBAC, multi-filtering)
│   ├── data/             # Centralized datasets (mockShipments, mockWorkflows, mockTasks, mockDocuments, mockBookings, mockBLRecords, mockAlerts, mockExecutives)
│   ├── pages/            # 16 Dedicated operational pages
│   ├── utils/            # Single source of truth stats engine (statsCalculator.js)
│   ├── App.jsx           # Master layout with fixed sticky sidebar & main content scroll container
│   ├── index.css         # Dark slate visual design system & custom scrollbar
│   └── main.jsx          # React DOM entry point
├── README.md             # Platform & IT handover documentation
├── package.json          # Dependencies (React 19, Lucide React, Tailwind CSS v4)
└── vite.config.js        # Pure JavaScript Vite configuration
```

---

## API Integration & Backend Handover Guide

The frontend architecture uses a service/data-access pattern inside `src/context/OperationsContext.jsx`. To connect to real REST or WebSocket APIs, replace the mock data imports with async HTTP/WebSocket service calls:

### Expected Backend Data Schemas

#### 1. Shipment Schema (`/api/v1/shipments`)
```json
{
  "id": "EXP-2026-00125",
  "jobNo": "JOB-99201",
  "mode": "Ocean",
  "direction": "Export",
  "shipmentType": "FCL",
  "customer": "Apex Global Spices",
  "pol": "Nhava Sheva (INNSA)",
  "pod": "Hamburg (DEHAM)",
  "originAirport": null,
  "destinationAirport": null,
  "etd": "2026-09-22",
  "eta": "2026-10-08",
  "shippingLine": "Maersk Line",
  "vessel": "Maersk Seletar",
  "voyage": "2609W",
  "airline": null,
  "flightNumber": null,
  "blNo": "MAEU98217300",
  "containerNo": "MSKU8829102 (40HC)",
  "mawb": null,
  "hawb": null,
  "currentStatus": "Documentation Pending",
  "health": "Attention Required",
  "progress": 67,
  "assignedTo": "Rahul Sharma",
  "incoterm": "FOB",
  "weightKg": "18,400",
  "packagesCount": 420,
  "delayDays": 0,
  "delayReason": null,
  "createdAt": "2026-09-15"
}
```

#### 2. Workflow Milestone Schema (`/api/v1/shipments/:id/workflow`)
```json
{
  "shipmentId": "EXP-2026-00125",
  "currentStageId": 6,
  "milestones": [
    { "id": 1, "name": "Booking Requested", "status": "COMPLETED", "date": "2026-09-15" },
    { "id": 2, "name": "Booking Confirmed", "status": "COMPLETED", "date": "2026-09-16" },
    { "id": 6, "name": "SI Submitted", "status": "IN_PROGRESS", "dueDate": "2026-09-18" },
    { "id": 7, "name": "Draft BL Verification", "status": "PENDING", "dueDate": "2026-09-20" }
  ]
}
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Local Development Server
```bash
npm run dev
```
Access the application locally at `http://localhost:5173`.

### Step 3: Build for Production
```bash
npm run build
```
The optimized bundle will be generated in the `dist/` directory.

---

## Quality Assurance & Verification
- **Build Verification**: Clean build with 0 warnings or errors using `npm run build`.
- **Layout Integrity**: Sticky left sidebar (`h-screen overflow-hidden`) with independent main content scroll container.
- **Pure JavaScript Stack**: 100% pure `.js` and `.jsx` implementation.

---
*Built for ZIPAWORLD Logistics Operations Platform.*
