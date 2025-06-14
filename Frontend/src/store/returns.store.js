import { create } from "zustand";
import { api } from "@/lib/api";

export const useReturnStore = create((set) => ({
  returns: [],
  pendingReturns: [],
  isLoading: false,
  error: null,

  fetchReturns: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/returns");
      console.log(response);
      set({ returns: response.data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchPendingReturns: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/returns/pending");
      console.log(response);
      set({ pendingReturns: response.data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createReturn: async (returnData) => {
    set({ isLoading: true });
    try {
      console.log(returnData);
      const response = await api.post("/returns", returnData);
      console.log(response.data);
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  returnCheck: async (returnId, operation) => {
    set({ isLoading: true });
    try {
      const response = await api.patch(`/returns/${returnId}/${operation}`);
      console.log(response.data);
      // Optionally, you can refetch returns after the operation
      await set.getState().fetchReturns();
      await set.getState().fetchPendingReturns();
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
