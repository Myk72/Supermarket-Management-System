import { create } from "zustand";
import { api } from "@/lib/api";

export const usePurchaseStore = create((set) => ({
  purchases: [],
  purchaseItems: [],
  loading: false,
  error: null,

  fetchPurchases: async () => {
    set({ loading: true, purchaseItems: [], error: null });
    try {
      const response = await api.get("/purchase");
      console.log(response);
      set({ purchases: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchPurchaseItems: async (purchaseId) => {
    set({ loading: true });
    try {
      const response = await api.get(`/purchase/${purchaseId}`);
      console.log(response);
      set({ purchaseItems: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addPurchase: async (data, cart) => {
    set({ loading: true });
    const newData = {
      supplier_id: data.supplier_id,
      employee_id: data.employee_id,
      total_cost: cart.reduce(
        (sum, item) => sum + item.quantity * item.cost_price,
        0
      ),
      expected_date: data.expected_date,
      note: data.note,
      items: cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        cost_price: item.cost_price,
      })),
    };

    try {
      console.log(newData, "here");
      const response = await api.post("/purchase", newData);
      console.log(response);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },



  updatePurchase: async (purchaseId, operation) => {
    set({ loading: true });
    try {
      const response = await api.put(`/purchase/checkin/${purchaseId}/${operation}`);
      console.log(response);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
