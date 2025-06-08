import { create } from "zustand";
import { api } from "@/lib/api";

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  login: async (userData) => {
    const response = await api.post("/auth/login", userData);
    console.log(response)
    const id = response.data.id;
    const data = await api.get(`/users/${id}`);
    set({
      user: data.data,
      role: data.data.role,
      isAuthenticated: true,
    });
  },
  logout: () => set({ user: null, role: null, isAuthenticated: false}),
  
}));

export default useAuthStore;
