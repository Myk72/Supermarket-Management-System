import { create } from "zustand";

const mockSales = [
  {
    sale_id: 1,
    customer_id: 1,
    employee_id: 1,
    total_amount: 45.97,
    tax_amount: 3.67,
    discount_amount: 0,
    payment_method: "cash",
    sale_date: "2023-05-20T14:30:00",
  },
  {
    sale_id: 2,
    customer_id: 2,
    employee_id: 2,
    total_amount: 23.45,
    tax_amount: 1.87,
    discount_amount: 5.0,
    payment_method: "card",
    sale_date: "2023-05-20T10:15:00",
  },
  {
    sale_id: 3,
    customer_id: null,
    employee_id: 1,
    total_amount: 12.99,
    tax_amount: 1.04,
    discount_amount: 0,
    payment_method: "mobile_money",
    sale_date: "2023-05-19T16:45:00",
  },
  {
    sale_id: 4,
    customer_id: 3,
    employee_id: 2,
    total_amount: 78.5,
    tax_amount: 6.28,
    discount_amount: 10.0,
    payment_method: "card",
    sale_date: "2023-05-19T11:20:00",
  },
  {
    sale_id: 5,
    customer_id: 1,
    employee_id: 1,
    total_amount: 34.25,
    tax_amount: 2.74,
    discount_amount: 0,
    payment_method: "cash",
    sale_date: "2023-05-18T15:10:00",
  },
];

export const useSaleStore = create((set) => ({
  sales: [],
  currentSale: null,
  saleItems: [],
  isLoading: false,
  error: null,

  fetchSales: async () => {
    set({ isLoading: true });
    try {
      setTimeout(() => {
        set({ sales: mockSales, isLoading: false });
      }, 400);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createSale: async (saleData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  fetchSaleItems: async (saleId) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },
}));
