import { create } from "zustand";

const mockProducts = [
  {
    product_id: 1,
    barcode: "8901234567890",
    name: "Organic Apples",
    category_id: 1,
    price: 2.99,
    cost_price: 1.5,
    supplier_id: 1,
    status: "active",
  },
  {
    product_id: 2,
    barcode: "7890123456789",
    name: "Whole Wheat Bread",
    category_id: 2,
    price: 3.49,
    cost_price: 1.75,
    supplier_id: 2,
    status: "active",
  },
  {
    product_id: 3,
    barcode: "6789012345678",
    name: "Fresh Milk 1L",
    category_id: 3,
    price: 1.99,
    cost_price: 1.2,
    supplier_id: 3,
    status: "active",
  },
  {
    product_id: 4,
    barcode: "5678901234567",
    name: "Chocolate Bar",
    category_id: 4,
    price: 1.25,
    cost_price: 0.75,
    supplier_id: 4,
    status: "out_of_stock",
  },
  {
    product_id: 5,
    barcode: "4567890123456",
    name: "Laundry Detergent",
    category_id: 5,
    price: 8.99,
    cost_price: 5.5,
    supplier_id: 5,
    status: "active",
  },
  {
    product_id: 6,
    barcode: "3456789012345",
    name: "Organic Bananas",
    category_id: 1,
    price: 0.99,
    cost_price: 0.5,
    supplier_id: 1,
    status: "active",
  },
  {
    product_id: 7,
    barcode: "2345678901234",
    name: "Almond Milk 1L",
    category_id: 3,
    price: 2.49,
    cost_price: 1.5,
    supplier_id: 3,
    status: "active",
  },
  {
    product_id: 8,
    barcode: "1234567890123",
    name: "Granola Bars",
    category_id: 4,
    price: 3.99,
    cost_price: 2.5,
    supplier_id: 4,
    status: "active",
  },
];

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      setTimeout(() => {
        set({ products: mockProducts, isLoading: false });
      }, 500);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  updateProduct: async (productId, productData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  deleteProduct: async (productId) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },
}));
