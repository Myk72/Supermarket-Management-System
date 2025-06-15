import { create } from "zustand";
import { api } from "@/lib/api";

export const useInventoryStore = create((set) => ({
  inventory: [],
  lowStockItems: [],
  inventoryProduct: [],
  inventoryLevelsByCategory: [],
  isLoading: false,
  error: null,

  fetchInventory: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/inventory");
      // console.log("Inventory Fetched", response.data);
      set({ inventory: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchLowStockItems: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/inventory/low-stock");
      // console.log("Low Stock Items Fetched", response.data);
      set({ lowStockItems: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateInventory: async (inventoryId, inventoryData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },



  fetchInventoryProduct: async() => {
    set({ isLoading: true });
    try {
      const response = await api.get("/inventory/products-with-inventory/");
      // console.log("Inventory Fetched", response.data);
      set({ inventoryProduct: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },


  getInventoryLevelsByCategory: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/inventory/inventory-levels-by-category");
      set({ inventoryLevelsByCategory: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  }

}));
