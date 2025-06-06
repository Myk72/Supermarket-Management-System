import { create } from "zustand";

const mockCustomers = [
  {
    customer_id: 1,
    name: "John Smith",
    phone: "555-123-4567",
    email: "john.smith@example.com",
    loyalty_points: 250,
    created_at: "2023-01-15T10:30:00",
  },
  {
    customer_id: 2,
    name: "Sarah Johnson",
    phone: "555-234-5678",
    email: "sarah.j@example.com",
    loyalty_points: 120,
    created_at: "2023-02-20T14:45:00",
  },
  {
    customer_id: 3,
    name: "Michael Brown",
    phone: "555-345-6789",
    email: "michael.b@example.com",
    loyalty_points: 75,
    created_at: "2023-03-10T09:15:00",
  },
  {
    customer_id: 4,
    name: "Emily Davis",
    phone: "555-456-7890",
    email: "emily.d@example.com",
    loyalty_points: 180,
    created_at: "2023-04-05T16:20:00",
  },
  {
    customer_id: 5,
    name: "David Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 6,
    name: "David Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 7,
    name: "David Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 8,
    name: "David Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 9,
    name: "David Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 10,
    name: "David Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 11,
    name: "David Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 12,
    name: "David Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 13,
    name: "David Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
];

export const useCustomerStore = create((set) => ({
  customers: [],
  isLoading: false,
  error: null,

  fetchCustomers: async () => {
    set({ isLoading: true });
    try {
      setTimeout(() => {
        set({ customers: mockCustomers, isLoading: false });
      }, 300);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCustomer: async (customerData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  updateCustomer: async (customerId, customerData) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },

  deleteCustomer: async (customerId) => {
    set({ isLoading: true });
    try {
    } catch (error) {}
  },


}));
