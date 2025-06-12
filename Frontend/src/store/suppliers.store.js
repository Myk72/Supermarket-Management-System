import { create } from "zustand";
import { api } from "@/lib/api";

export const useSupplierStore = create((set) => ({
  suppliers: [],
  isLoading: false,
  error: null,

  fetchSuppliers: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/supplier");
      // console.log(response,"eue")
      set({ suppliers: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addSupplier: async (supplierData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  updateSupplier: async (supplierId, supplierData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  deleteSupplier: async (supplierId) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },
}));
