import { create } from "zustand";
import { api } from "@/lib/api";


export const useCustomerStore = create((set) => ({
  customers: [],
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
      console.log("here", customerData)
      const response = await api.post("/customer/register", customerData);
      console.log(response);
    } catch (error) {
      console.log(error)
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
}));
