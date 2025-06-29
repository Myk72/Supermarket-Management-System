import { create } from "zustand";
import { api } from "@/lib/api";

export const useProductStore = create((set) => ({
  products: [],
  product: null,
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/product");
      console.log("Products Fetched", response.data);
      set({ products: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchProductById: async (productId) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/product/${parseInt(productId)}`);
      // console.log("Product Fetched", product);
      set({ product: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addProduct: async (productData, image) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      console.log(image);

      formData.append("barcode", productData.barcode);
      formData.append("name", productData.name);
      formData.append("category_id", parseInt(productData.category_id));
      formData.append("price", parseFloat(productData.price));
      formData.append("cost_price", parseFloat(productData.cost_price));
      formData.append("supplier_id", parseInt(productData.supplier_id));
      formData.append("status", productData.status || "active");
      formData.append("image", image);

      const response = await api.post(`/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      set((state) => ({
        products: [...state.products, response.data],
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      console.error("Product upload failed:", error);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  updateProduct: async (productId, productData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  deleteProduct: async (productId) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(`/product/${parseInt(productId)}`);
      // console.log("Product Deleted", response.data);
      set((state) => ({
        products: state.products.filter(
          (product) => product.product_id !== productId
        ),
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      console.error("Product deletion failed:", error);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  addDiscount: async (product_id, data) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/product/${product_id}/discount`, data);
      console.log("Discount Added", response.data);
      return response.data;
    } catch (error) {
      console.error("Discount addition failed:", error);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
}));
