import { create } from "zustand";
const mockSuppliers = [
  {
    supplier_id: 1,
    name: "Fresh Farms Inc.",
    contact_phone: "555-123-4567",
    email: "contact@freshfarms.com",
    address: "123 Farm Road, Countryside",
  },
  {
    supplier_id: 2,
    name: "Bakery Supplies Co.",
    contact_phone: "555-234-5678",
    email: "info@bakerysupplies.com",
    address: "456 Flour Street, Bakersville",
  },
  {
    supplier_id: 3,
    name: "Dairy Delights",
    contact_phone: "555-345-6789",
    email: "orders@dairydelights.com",
    address: "789 Milk Road, Cowtown",
  },
  {
    supplier_id: 4,
    name: "Snack Masters",
    contact_phone: "555-456-7890",
    email: "sales@snackmasters.com",
    address: "101 Crisp Avenue, Munchville",
  },
  {
    supplier_id: 5,
    name: "Home Essentials",
    contact_phone: "555-567-8901",
    email: "support@homeessentials.com",
    address: "202 Clean Street, Sparkleton",
  },
];

export const useSupplierStore = create((set) => ({
  suppliers: [],
  isLoading: false,
  error: null,

  fetchSuppliers: async () => {
    set({ isLoading: true });
    try {
      setTimeout(() => {
        set({ suppliers: [], isLoading: false });
      }, 300);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addSupplier: async (supplierData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  updateSupplier: async (supplierId, supplierData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  deleteSupplier: async (supplierId) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },
}));
