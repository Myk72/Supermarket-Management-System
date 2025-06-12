import { create } from "zustand";
import { api } from "@/lib/api";

const mockCustomers = [
  {
    customer_id: 1,
    firstName: "John",
    lastName: "Smith",
    phone: "555-123-4567",
    email: "john.smith@example.com",
    loyalty_points: 250,
    created_at: "2023-01-15T10:30:00",
  },
  {
    customer_id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "555-234-5678",
    email: "sarah.j@example.com",
    loyalty_points: 120,
    created_at: "2023-02-20T14:45:00",
  },
  {
    customer_id: 3,
    firstName: "Michael",
    lastName: "Brown",
    phone: "555-345-6789",
    email: "michael.b@example.com",
    loyalty_points: 75,
    created_at: "2023-03-10T09:15:00",
  },
  {
    customer_id: 4,
    firstName: "Emily",
    lastName: "Davis",
    phone: "555-456-7890",
    email: "emily.d@example.com",
    loyalty_points: 180,
    created_at: "2023-04-05T16:20:00",
  },
  {
    customer_id: 5,
    firstName: "David",
    lastName: "Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 6,
    firstName: "David",
    lastName: "Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 7,
    firstName: "David",
    lastName: "Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 8,
    firstName: "David",
    lastName: "Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 9,
    firstName: "David",
    lastName: "Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 10,
    firstName: "David",
    lastName: "Wilson",
    phone: "555-567-8901",
    email: "david.w@example.com",
    loyalty_points: 300,
    created_at: "2023-05-01T11:10:00",
  },
  {
    customer_id: 11,
    firstName: "David",
    lastName: "Wilson",
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
      const response = await api.get("/customer");
      console.log(response);
      set({ customers: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCustomer: async (customerData) => {
    set({ isLoading: true });
    try {
      console.log("here", customerData)
      const response = await api.post("/customer/register", customerData);
      console.log(response);
    } catch (error) {
      console.log(error)
      set({ error: error.message, isLoading: false });
    }
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
