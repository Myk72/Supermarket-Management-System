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
    discount: 0,
    tax:15,
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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
    tax:15,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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
    tax:15,
    discount: 0,
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    product_id: 4,
    barcode: "5678901234567",
    name: "Chocolate Bar",
    category_id: 4,
    price: 1.25,
    cost_price: 0.75,
    supplier_id: 4,
    discount: 30,
    status: "out_of_stock",
    tax:15,
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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
    tax:15,
    discount: 12,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    product_id: 6,
    barcode: "3456789012345",
    name: "Organic Bananas",
    category_id: 1,
    price: 0.99,
    cost_price: 0.5,
    supplier_id: 1,
    discount: 0,
    status: "active",
    tax:15,
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    product_id: 7,
    barcode: "2345678901234",
    name: "Almond Milk 1L",
    category_id: 3,
    price: 2.49,
    cost_price: 1.5,
    supplier_id: 3,
    discount: 0,
    tax:15,
    status: "active",
    image:
      "https://i0.wp.com/stephanieleenutrition.com/wp-content/uploads/2022/06/Untitled-design-8-e1654793763569.png?resize=1170%2C578&ssl=1",
  },
  {
    product_id: 8,
    barcode: "1234567890123",
    name: "Granola Bars",
    category_id: 4,
    price: 3.99,
    cost_price: 2.5,
    discount: 0,
    supplier_id: 4,
    tax:15,
    status: "active",
    image:
      "https://www.allrecipes.com/thmb/h33pPUtDyjUbgvEDUKFQSfLl81o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-11382-chewy-granola-bars-ddmfs-3x4-d1603280d6f5475783aa2aacbf98574c.jpg",
  },
  {
    product_id: 9,
    barcode: "8901234567890",
    name: "Organic Apples",
    category_id: 1,
    price: 2.99,
    cost_price: 1.5,
    supplier_id: 1,
    discount: 0,
    status: "active",
    tax:15,
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    product_id: 12,
    barcode: "7890123456789",
    name: "Whole Wheat Bread",
    category_id: 2,
    price: 3.49,
    cost_price: 1.75,
    supplier_id: 2,
    discount: 20,
    status: "active",
    tax:15,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    product_id: 13,
    barcode: "6789012345678",
    name: "Fresh Milk 1L",
    category_id: 3,
    price: 1.99,
    cost_price: 1.2,
    supplier_id: 3,
    discount: 0,
    status: "active",
    tax:15,
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    product_id: 14,
    barcode: "5678901234567",
    name: "Chocolate Bar",
    category_id: 4,
    price: 1.25,
    cost_price: 0.75,
    supplier_id: 4,
    discount: 30,
    status: "out_of_stock",
    tax:15,
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    product_id: 24,
    barcode: "5678901234567",
    name: "Chocolate Bar",
    category_id: 4,
    price: 1.25,
    cost_price: 0.75,
    supplier_id: 4,
    discount: 30,
    status: "out_of_stock",
    tax:15,
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    product_id: 34,
    barcode: "5678901234567",
    name: "Chocolate Bar",
    category_id: 4,
    price: 1.25,
    cost_price: 0.75,
    supplier_id: 4,
    status: "out_of_stock",
    discount: 30,
    tax:15,
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    product_id: 44,
    barcode: "5678901234567",
    name: "Chocolate Bar",
    category_id: 4,
    price: 1.25,
    cost_price: 0.75,
    supplier_id: 4,
    status: "out_of_stock",
    discount: 30,
    tax:15,
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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
