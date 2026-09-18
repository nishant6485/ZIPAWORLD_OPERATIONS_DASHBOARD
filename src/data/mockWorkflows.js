// Workflow Definitions & Milestones for Zipaworld Logistics Operations Platform

export const OCEAN_EXPORT_STEPS = [
  { stepNumber: 1, name: "Enquiry / Query & Rate Approved", code: "RATE_APPROVED" },
  { stepNumber: 2, name: "Booking Request Submitted", code: "BKG_REQUESTED" },
  { stepNumber: 3, name: "Booking Confirmation Released", code: "BKG_CONFIRMED" },
  { stepNumber: 4, name: "Shipping Instruction (SI) Submitted", code: "SI_SUBMITTED" },
  { stepNumber: 5, name: "Draft Bill of Lading Prepared", code: "BL_DRAFT_READY" },
  { stepNumber: 6, name: "Customer Draft BL Approved", code: "BL_APPROVED" },
  { stepNumber: 7, name: "Customs Export Shipping Bill Cleared", code: "CUSTOMS_CLEARED" },
  { stepNumber: 8, name: "Factory Loading & Container Carting", code: "CARGO_READINESS" },
  { stepNumber: 9, name: "Port Gate-In & Container Stacking", code: "GATE_IN" },
  { stepNumber: 10, name: "Vessel Departure (ATD)", code: "VESSEL_DEPARTED" },
  { stepNumber: 11, name: "Final Original BL Execution & Dispatch", code: "BL_RELEASED" },
  { stepNumber: 12, name: "Pre-Alert Sent to Consignee/Agent", code: "PRE_ALERT" },
  { stepNumber: 13, name: "Transshipment Port Relay (If Applicable)", code: "TRANSSHIPMENT" },
  { stepNumber: 14, name: "Vessel Arrival at Destination (ATA)", code: "VESSEL_ARRIVED" },
  { stepNumber: 15, name: "Destination Cargo Delivery", code: "CARGO_DELIVERED" },
  { stepNumber: 16, name: "Proof of Delivery (POD) & Job Closure", code: "POD_CLOSED" }
];

export const OCEAN_IMPORT_STEPS = [
  { stepNumber: 1, name: "Pre-Alert & Shipping Docs Received", code: "PRE_ALERT_REC" },
  { stepNumber: 2, name: "Import Documentation Verification", code: "DOC_VERIFIED" },
  { stepNumber: 3, name: "Import General Manifest (IGM) Filed", code: "IGM_FILED" },
  { stepNumber: 4, name: "Vessel Arrival at Port of Discharge", code: "VESSEL_ARRIVED" },
  { stepNumber: 5, name: "Delivery Order (DO) Charges Paid", code: "DO_PAID" },
  { stepNumber: 6, name: "Delivery Order (DO) Issued", code: "DO_ISSUED" },
  { stepNumber: 7, name: "Customs Bill of Entry (BOE) Filed", code: "BOE_FILED" },
  { stepNumber: 8, name: "Customs Examination & Clearance", code: "CUSTOMS_CLEARED" },
  { stepNumber: 9, name: "Out of Charge (OOC) Issued", code: "OOC_ISSUED" },
  { stepNumber: 10, name: "Container Gate-Out & Terminal Pick", code: "GATE_OUT" },
  { stepNumber: 11, name: "Final Door Delivery to Consignee", code: "FINAL_DELIVERY" },
  { stepNumber: 12, name: "Proof of Delivery (POD) & Job Closure", code: "POD_CLOSED" }
];

export const AIR_EXPORT_STEPS = [
  { stepNumber: 1, name: "Enquiry & Airline Rate Approved", code: "RATE_APPROVED" },
  { stepNumber: 2, name: "Space Booking Requested with Airline", code: "SPACE_REQUESTED" },
  { stepNumber: 3, name: "Airline Allotment / Flight Confirmed", code: "FLIGHT_CONFIRMED" },
  { stepNumber: 4, name: "Cargo Readiness & Packing Inspection", code: "CARGO_READY" },
  { stepNumber: 5, name: "Cargo Pickup & Handover to CTO", code: "CARGO_PICKUP" },
  { stepNumber: 6, name: "Export Commercial Docs Verified", code: "DOCS_VERIFIED" },
  { stepNumber: 7, name: "Shipping Instruction (SI) Submitted", code: "SI_SUBMITTED" },
  { stepNumber: 8, name: "House Air Waybill (HAWB) Issued", code: "HAWB_ISSUED" },
  { stepNumber: 9, name: "Master Air Waybill (MAWB) Prepared", code: "MAWB_PREPARED" },
  { stepNumber: 10, name: "Airport Customs Clearance & LEO Issued", code: "CUSTOMS_CLEARED" },
  { stepNumber: 11, name: "Air Cargo Terminal Acceptance (RCS)", code: "CARGO_ACCEPTED" },
  { stepNumber: 12, name: "Flight Departure (ATD / DEP)", code: "FLIGHT_DEPARTED" },
  { stepNumber: 13, name: "Transit Hub Connection (If Applicable)", code: "TRANSIT_HUB" },
  { stepNumber: 14, name: "Flight Arrival at Destination Airport (ATA)", code: "FLIGHT_ARRIVED" },
  { stepNumber: 15, name: "Destination Airport Customs Clearance", code: "DEST_CUSTOMS" },
  { stepNumber: 16, name: "Final Express Delivery to Consignee", code: "CARGO_DELIVERED" },
  { stepNumber: 17, name: "Proof of Delivery (POD) & Job Closure", code: "POD_CLOSED" }
];

export const AIR_IMPORT_STEPS = [
  { stepNumber: 1, name: "Air Pre-Alert & Flight Manifest Received", code: "PRE_ALERT_REC" },
  { stepNumber: 2, name: "Flight Schedule & Arrival Information Confirmed", code: "FLIGHT_INFO" },
  { stepNumber: 3, name: "MAWB & HAWB Document Check", code: "AWB_CHECK" },
  { stepNumber: 4, name: "Arrival Notice (NOA) Sent to Consignee", code: "NOA_SENT" },
  { stepNumber: 5, name: "Flight Arrived at Destination Airport (ATA)", code: "FLIGHT_ARRIVED" },
  { stepNumber: 6, name: "Cargo Unloading & Air Cargo Terminal Availability", code: "CARGO_UNLOADED" },
  { stepNumber: 7, name: "Import Customs Bill of Entry (BOE) Filed", code: "BOE_FILED" },
  { stepNumber: 8, name: "Customs Duty Paid & Assessment Completed", code: "DUTY_PAID" },
  { stepNumber: 9, name: "Customs Examination & Out of Charge (OOC)", code: "OOC_ISSUED" },
  { stepNumber: 10, name: "Airline Delivery Order (DO) / Release Note Issued", code: "DO_RELEASED" },
  { stepNumber: 11, name: "Cargo Ready for Terminal Pick-Up (RCF)", code: "CARGO_AVAILABLE" },
  { stepNumber: 12, name: "Local Pickup & Express Trucking Planning", code: "TRUCKING_PLANNED" },
  { stepNumber: 13, name: "Door Delivery to Consignee Facility", code: "FINAL_DELIVERY" },
  { stepNumber: 14, name: "Proof of Delivery (POD) & Job Closure", code: "POD_CLOSED" }
];

export const getWorkflowTemplate = (mode, direction) => {
  if (mode === 'Air') {
    return direction === 'Import' ? AIR_IMPORT_STEPS : AIR_EXPORT_STEPS;
  }
  return direction === 'Import' ? OCEAN_IMPORT_STEPS : OCEAN_EXPORT_STEPS;
};
