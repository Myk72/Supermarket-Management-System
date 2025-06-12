import { create } from "zustand";
import { api } from "@/lib/api";

const mockCategories = [
  { category_id: 1, name: "Fruits & Vegetables", description: "Fresh produce" },
  { category_id: 2, name: "Bakery", description: "Bread and baked goods" },
  {
    category_id: 3,
    name: "Dairy",
    description: "Milk, cheese, and other dairy products",
  },
  {
    category_id: 4,
    name: "Snacks",
    description: "Chips, candy, and other snacks",
  },
  {
    category_id: 5,
    name: "Household",
    description: "Cleaning supplies and household items",
  },
];

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
