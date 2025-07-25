import { create } from "zustand";
import { api } from "@/lib/api";

export const useCategoryStore = create((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/category");
      set({ categories: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error
    }
  },

  addCategory: async (categoryData) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/category", categoryData);
      set((state) => ({
        categories: [...state.categories, response.data],
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw new Error(error.message);
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  deleteCategory: async (categoryId) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },
}));
