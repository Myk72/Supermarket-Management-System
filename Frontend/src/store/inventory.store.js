import { create } from "zustand";

const mockInventory = [
  {
    inventory_id: 1,
    product_id: 1,
    quantity: 150,
    reorder_level: 30,
    last_restocked: "2023-05-15",
    location: "A1-S3",
  },
  {
    inventory_id: 2,
    product_id: 2,
    quantity: 75,
    reorder_level: 20,
    last_restocked: "2023-05-10",
    location: "B2-S1",
  },
  {
    inventory_id: 3,
    product_id: 3,
    quantity: 100,
    reorder_level: 25,
    last_restocked: "2023-05-12",
    location: "C3-S2",
  },
  {
    inventory_id: 4,
    product_id: 4,
    quantity: 5,
    reorder_level: 15,
    last_restocked: "2023-04-28",
    location: "D4-S4",
  },
  {
    inventory_id: 5,
    product_id: 5,
    quantity: 50,
    reorder_level: 10,
    last_restocked: "2023-05-05",
    location: "E5-S5",
  },
  {
    inventory_id: 6,
    product_id: 6,
    quantity: 200,
    reorder_level: 500,
    last_restocked: "2023-05-20",
    location: "F6-S6",
  },
  {
    inventory_id: 7,
    product_id: 7,
    quantity: 0,
    reorder_level: 5,
    last_restocked: "2023-04-15",
    location: "G7-S7",
  },
  {
    inventory_id: 8,
    product_id: 8,
    quantity: 300,
    reorder_level: 100,
    last_restocked: "2023-05-18",
    location: "H8-S8",
  },
];

export const useInventoryStore = create((set) => ({
  inventory: [],
  isLoading: false,
  error: null,

  fetchInventory: async () => {
    set({ isLoading: true });
    try {
      setTimeout(() => {
        set({ inventory: mockInventory, isLoading: false });
      }, 400);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateInventory: async (inventoryId, inventoryData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },
}));
