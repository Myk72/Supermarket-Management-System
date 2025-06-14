import { create } from "zustand";
import { api } from "@/lib/api";

export const useSaleStore = create((set) => ({
  sales: [],
  currentSale: null,
  saleItems: [],
  isLoading: false,
  error: null,

  fetchSales: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/sales");
      const data = response.data;
      console.log(data);
      set({ sales: data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createSale: async (saleData) => {
    set({ isLoading: true });
    try {
      const resp = await api.post("/sales", saleData);
      console.log(resp.data);

    } catch (error) {
      set({ error: error.message, isLoading: false });

    }
  },

  getSale: async (saleId) => {
    set({ isLoading: true });
    try {
      const id = Number(saleId);
      const response = await api.get(`/sales/${id}`);
      const data = response.data;
      console.log(data);
      set({ sales: data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  fetchSaleItems: async (saleId) => {
    set({ isLoading: true });
    try {
      const id = Number(saleId);
      const response = await api.get(`/sales/${id}/items`);
      const data = response.data;
      console.log(data);
      set({ saleItems: data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getSaleByEmployeeId: async (employeeId) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/sales/employee/${employeeId}`);
      const data = response.data;
      console.log(data);
      set({ sales: data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
