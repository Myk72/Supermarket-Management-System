import { create } from "zustand";
import { api } from "@/lib/api";

export const useEmployeeStore = create((set) => ({
  employees: [],
  shifts: [],
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/users");
      console.log(response.data);
      set({
        employees: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addEmployee: async (employeeData) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/auth/register", employeeData);
      console.log(response);
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  updateEmployee: async (employeeId, employeeData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  assignShift: async (shiftData) => {
    try {
      const response = await api.post(`/users/assign-shift`, shiftData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  getShifts: async (employeeId) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/users/${parseInt(employeeId)}/shifts`);
      console.log(response.data);
      set({ shifts: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
      return [];
    }
  },
  deleteEmployee: async (employeeId) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(`/users/${parseInt(employeeId)}`);
      console.log(response);
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },
}));
