import { create } from "zustand";
const PurchaseOrders = [
  {
    purchase_id: "1001",
    employee_name: "John Smith",
    employee_id: "EMP-001",
    supplier_name: "Global Supplies Inc.",
    order_date: "2023-05-15",
    amount: "1250.75",
    status: "Completed",
  },
  {
    purchase_id: "1002",
    employee_name: "Sarah Johnson",
    employee_id: "EMP-003",
    supplier_name: "Tech Parts Co.",
    order_date: "2023-06-22",
    amount: "875.50",
    status: "Pending",
  },
  {
    purchase_id: "1003",
    employee_name: "Michael Chen",
    employee_id: "EMP-007",
    supplier_name: "Office Essentials Ltd.",
    order_date: "2023-07-10",
    amount: "3420.00",
    status: "Processing",
  },
  {
    purchase_id: "1004",
    employee_name: "Emily Wilson",
    employee_id: "EMP-012",
    supplier_name: "Industrial Tools Corp.",
    order_date: "2023-08-05",
    amount: "1568.30",
    status: "Shipped",
  },
  {
    purchase_id: "1005",
    employee_name: "David Brown",
    employee_id: "EMP-009",
    supplier_name: "Quality Materials LLC",
    order_date: "2023-09-18",
    amount: "2105.90",
    status: "Cancelled",
  },
];

const PurchaseItems = [
  {
    purchase_item_id: 1,
    purchase_id: 1001,
    product_id: 5001,
    quantity: 2,
    cost_price: 125.5,
  },
  {
    purchase_item_id: 2,
    purchase_id: 1001,
    product_id: 5002,
    quantity: 3,
    cost_price: 45.75,
    total: 137.25,
  },
  {
    purchase_item_id: 3,
    purchase_id: 1002,
    product_id: 5003,
    quantity: 5,
    cost_price: 32.99,
  },
  {
    purchase_item_id: 4,
    purchase_id: 1003,
    product_id: 5004,
    quantity: 1,
    cost_price: 89.0,
  },
  {
    purchase_item_id: 5,
    purchase_id: 1004,
    product_id: 5005,
    quantity: 10,
    cost_price: 24.5,
  },
];

export const usePurchaseStore = create((set) => ({
  purchases: [],
  purchaseItems: [],
  loading: false,
  error: null,

  fetchPurchases: async () => {
    set({ loading: true });
    try {
      // Simulate an API call
      setTimeout(() => {
        set({
          purchases: PurchaseOrders,
          loading: false,
          error: null,
        });
      }, 500);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchPurchaseItems: async (purchaseId) => {
    set({ loading: true });
    try {
      setTimeout(() => {
        const items = PurchaseItems.filter(
          (item) => item.purchase_id === Number(purchaseId)
        );
        set({
          purchaseItems: items,
          loading: false,
          error: null,
        });
      }, 500);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
