import { create } from "zustand";
import { api } from "@/lib/api";

export const useEmployeeStore = create((set) => ({
  employees: [],
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
