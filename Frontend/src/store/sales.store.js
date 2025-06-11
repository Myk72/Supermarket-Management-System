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
    employee_id: 3,
    total_amount: 12.99,
    tax_amount: 1.04,
    discount_amount: 0,
    payment_method: "mobile_money",
    sale_date: "2023-05-19T16:45:00",
  },
  {
    sale_id: 4,
    customer_id: 4,
    employee_id: 4,
    total_amount: 78.5,
    tax_amount: 6.28,
    discount_amount: 10.0,
    payment_method: "card",
    sale_date: "2023-05-19T11:20:00",
  },
  {
    sale_id: 5,
    customer_id: 5,
    employee_id: 5,
    total_amount: 34.25,
    tax_amount: 2.74,
    discount_amount: 0,
    payment_method: "cash",
    sale_date: "2023-05-18T15:10:00",
  },
  {
    sale_id: 6,
    customer_id: null,
    employee_id: 2,
    total_amount: 156.89,
    tax_amount: 12.55,
    discount_amount: 15.0,
    payment_method: "card",
    sale_date: "2023-05-18T12:30:00",
  },
  {
    sale_id: 7,
    customer_id: 3,
    employee_id: 1,
    total_amount: 67.23,
    tax_amount: 5.38,
    discount_amount: 3.5,
    payment_method: "mobile_money",
    sale_date: "2023-05-17T17:20:00",
  },
  {
    sale_id: 8,
    customer_id: 6,
    employee_id: 4,
    total_amount: 289.99,
    tax_amount: 23.2,
    discount_amount: 25.0,
    payment_method: "card",
    sale_date: "2023-05-17T09:45:00",
  },
  {
    sale_id: 9,
    customer_id: null,
    employee_id: 5,
    total_amount: 42.1,
    tax_amount: 3.37,
    discount_amount: 0,
    payment_method: "cash",
    sale_date: "2023-05-16T14:15:00",
  },
  {
    sale_id: 10,
    customer_id: 7,
    employee_id: 3,
    total_amount: 98.75,
    tax_amount: 7.9,
    discount_amount: 8.0,
    payment_method: "mobile_money",
    sale_date: "2023-05-16T11:05:00",
  },
  {
    sale_id: 11,
    customer_id: 8,
    employee_id: 2,
    total_amount: 54.3,
    tax_amount: 4.34,
    discount_amount: 0,
    payment_method: "card",
    sale_date: "2023-05-15T16:50:00",
  },
  {
    sale_id: 12,
    customer_id: null,
    employee_id: 1,
    total_amount: 210.45,
    tax_amount: 16.84,
    discount_amount: 12.5,
    payment_method: "cash",
    sale_date: "2023-05-15T13:25:00",
  },
  {
    sale_id: 13,
    customer_id: 9,
    employee_id: 4,
    total_amount: 76.8,
    tax_amount: 6.14,
    discount_amount: 5.0,
    payment_method: "mobile_money",
    sale_date: "2023-05-14T10:40:00",
  },
  {
    sale_id: 14,
    customer_id: 10,
    employee_id: 5,
    total_amount: 132.6,
    tax_amount: 10.61,
    discount_amount: 10.0,
    payment_method: "card",
    sale_date: "2023-05-14T09:15:00",
  },
  {
    sale_id: 15,
    customer_id: null,
    employee_id: 3,
    total_amount: 28.95,
    tax_amount: 2.32,
    discount_amount: 0,
    payment_method: "cash",
    sale_date: "2023-05-13T18:30:00",
  },
];

const mockSaleItems = [
  {
    sale_item_id: 1,
    sale_id: 1,
    product_id: 101,
    quantity: 2,
    unit_price: 12.99,
    subtotal: 25.98
  },
  {
    sale_item_id: 88,
    sale_id: 1,
    product_id: 102,
    quantity: 2,
    unit_price: 12.99,
    subtotal: 25.98
  },
  {
    sale_item_id: 86,
    sale_id: 1,
    product_id: 103,
    quantity: 2,
    unit_price: 12.99,
    subtotal: 25.98
  },
  {
    sale_item_id: 2,
    sale_id: 1,
    product_id: 205,
    quantity: 1,
    unit_price: 24.50,
    subtotal: 24.50
  },
  {
    sale_item_id: 3,
    sale_id: 2,
    product_id: 102,
    quantity: 3,
    unit_price: 8.75,
    subtotal: 26.25
  },
  {
    sale_item_id: 4,
    sale_id: 2,
    product_id: 301,
    quantity: 1,
    unit_price: 15.00,
    subtotal: 15.00
  },
  {
    sale_item_id: 5,
    sale_id: 3,
    product_id: 103,
    quantity: 5,
    unit_price: 5.99,
    subtotal: 29.95
  },
  {
    sale_item_id: 6,
    sale_id: 4,
    product_id: 202,
    quantity: 2,
    unit_price: 19.99,
    subtotal: 39.98
  },
  {
    sale_item_id: 7,
    sale_id: 4,
    product_id: 302,
    quantity: 1,
    unit_price: 32.50,
    subtotal: 32.50
  },
  {
    sale_item_id: 8,
    sale_id: 5,
    product_id: 104,
    quantity: 1,
    unit_price: 45.00,
    subtotal: 45.00
  },
  {
    sale_item_id: 9,
    sale_id: 6,
    product_id: 203,
    quantity: 4,
    unit_price: 7.25,
    subtotal: 29.00
  },
  {
    sale_item_id: 10,
    sale_id: 7,
    product_id: 303,
    quantity: 2,
    unit_price: 12.49,
    subtotal: 24.98
  },
  {
    sale_item_id: 11,
    sale_id: 8,
    product_id: 105,
    quantity: 3,
    unit_price: 9.99,
    subtotal: 29.97
  },
  {
    sale_item_id: 12,
    sale_id: 9,
    product_id: 204,
    quantity: 1,
    unit_price: 27.75,
    subtotal: 27.75
  },
  {
    sale_item_id: 13,
    sale_id: 10,
    product_id: 304,
    quantity: 2,
    unit_price: 14.95,
    subtotal: 29.90
  },
  {
    sale_item_id: 14,
    sale_id: 10,
    product_id: 106,
    quantity: 1,
    unit_price: 18.50,
    subtotal: 18.50
  },
  {
    sale_item_id: 15,
    sale_id: 10,
    product_id: 201,
    quantity: 3,
    unit_price: 6.25,
    subtotal: 18.75
  }
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
      const id = Number(saleId)
      setTimeout(() => {
        const items = mockSaleItems.filter(item => item.sale_id === id);
        set({ saleItems: items , isLoading: false });
      }, 400);
    } catch (error) {}
  },
}));
