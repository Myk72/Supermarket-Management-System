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
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCategory: async (categoryData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
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
