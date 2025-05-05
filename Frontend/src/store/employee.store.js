import { create } from "zustand";

const mockEmployees = [
  {
    employee_id: 1,
    name: "Alex Johnson",
    role: "manager",
    salary: 4500.0,
    hire_date: "2022-01-10",
    phone: "555-111-2222",
  },
  {
    employee_id: 2,
    name: "Maria Garcia",
    role: "cashier",
    salary: 2800.0,
    hire_date: "2022-03-15",
    phone: "555-222-3333",
  },
  {
    employee_id: 3,
    name: "James Wilson",
    role: "stock_clerk",
    salary: 2600.0,
    hire_date: "2022-05-20",
    phone: "555-333-4444",
  },
  {
    employee_id: 4,
    name: "Sophia Lee",
    role: "cashier",
    salary: 2800.0,
    hire_date: "2022-07-05",
    phone: "555-444-5555",
  },
  {
    employee_id: 5,
    name: "Robert Brown",
    role: "admin",
    salary: 4200.0,
    hire_date: "2022-02-01",
    phone: "555-555-6666",
  },
];

export const useEmployeeStore = create((set) => ({
  employees: [],
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true });
    try {
      setTimeout(() => {
        set({ employees: mockEmployees, isLoading: false });
      }, 300);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addEmployee: async (employeeData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  updateEmployee: async (employeeId, employeeData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  deleteEmployee: async (employeeId) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },
}));
