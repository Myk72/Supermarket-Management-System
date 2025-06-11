import { create } from "zustand";
const dummySuppliers = [
  {
    supplier_id: 1001,
    name: "Fresh Produce Co.",
    phone: "+1 (555) 123-4567",
    email: "contact@freshproduce.com",
    address: "123 Farm Rd, California, USA",
    total_purchases: 42,
    created_at: "2022-03-15T08:00:00Z",
    status: "Active",
  },
  {
    supplier_id: 1002,
    name: "Quality Meats Ltd.",
    phone: "+1 (555) 234-5678",
    email: "sales@qualitymeats.com",
    address: "456 Butcher St, Texas, USA",
    total_purchases: 28,
    created_at: "2021-11-22T10:30:00Z",
    status: "Active",
  },
  {
    supplier_id: 1003,
    name: "Dairy Delights",
    phone: "+1 (555) 345-6789",
    email: "info@dairydelights.com",
    address: "789 Milk Ave, Wisconsin, USA",
    total_purchases: 15,
    created_at: "2023-01-05T09:15:00Z",
    status: "Active",
  },
  {
    supplier_id: 1004,
    name: "Bakery Essentials",
    phone: "+1 (555) 456-7890",
    email: "orders@bakeryessentials.com",
    address: "321 Flour St, New York, USA",
    total_purchases: 33,
    created_at: "2020-08-30T14:20:00Z",
    status: "Inactive",
  },
  {
    supplier_id: 1005,
    name: "Organic Spices Inc.",
    phone: "+1 (555) 567-8901",
    email: "support@organicspices.com",
    address: "654 Spice Ln, Oregon, USA",
    total_purchases: 19,
    created_at: "2023-05-10T11:45:00Z",
    status: "Active",
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
        set({ suppliers: dummySuppliers, isLoading: false });
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
