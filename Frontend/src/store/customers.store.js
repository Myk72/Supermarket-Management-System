import { create } from "zustand";
import { api } from "@/lib/api";

export const useCustomerStore = create((set) => ({
  customers: [],
  monthlyCustomer: null,
  purchasedHistory: [],
  isLoading: false,
  error: null,

  fetchCustomers: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/customer");
      console.log(response);
      set({ customers: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCustomer: async (customerData) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/customer/register", customerData);
      console.log(response);
      set((state) => ({
        customers: [...state.customers, response.data.customer],
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  getMonthlyCustomers: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/customer/monthly");
      console.log(response, "monthly customers");
      set({ monthlyCustomer: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateCustomer: async (customerId, customerData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  deleteCustomer: async (customerId) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  fetchPurchasedHistory: async (customerId) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`sales/customer/${customerId}`);
      console.log(response);
      set({ purchasedHistory: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
