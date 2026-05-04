// Shared admin user list used by the login portal for role selection.
// This mirrors the data in nalvel-logistics-services/src/mock/adminUsers.js
// Future: fetch this from the backend on login instead.
export const adminUsers = [
  { id: "ADM-001", name: "Aadhithya Narayan", role: "Super Admin",          region: "All Regions", status: "Active" },
  { id: "ADM-002", name: "Priya Raman",       role: "Operations Manager",   region: "Tamil Nadu",  status: "Active" },
  { id: "ADM-003", name: "Harsh Patel",       role: "Finance",              region: "All Regions", status: "Active" },
  { id: "ADM-004", name: "Sandeep Gowda",     role: "Regional Manager",     region: "Karnataka",   status: "Active" },
  { id: "ADM-005", name: "Nisha Iyer",        role: "Finance",              region: "Maharashtra", status: "Suspended" },
  { id: "ADM-006", name: "Rahul Verma",       role: "Operations Manager",   region: "Maharashtra", status: "Active" },
  { id: "ADM-007", name: "Kavya Menon",       role: "Regional Manager",     region: "Kerala",      status: "Suspended" },
  { id: "ADM-008", name: "Vikram Reddy",      role: "Regional Manager",     region: "Telangana",   status: "Active" },
  { id: "ADM-009", name: "Anjali Desai",      role: "Operations Manager",   region: "Gujarat",     status: "Active" },
  { id: "ADM-010", name: "Sriram Menon",      role: "Finance",              region: "Tamil Nadu",  status: "Active" },
  { id: "ADM-011", name: "Megha Shah",        role: "Regional Manager",     region: "Delhi",       status: "Active" },
  { id: "ADM-012", name: "Arun Kumar",        role: "Operations Manager",   region: "All Regions", status: "Suspended" },
];
