import { create } from "zustand";
import { api } from "@/lib/api";

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (userData) => {
    const response = await api.post("/auth/login", userData);
    console.log(response);
    const id = response.data.id;
    const data = await api.get(`/users/${id}`);
    set({
      user: data.data,
      role: data.data.role,
      isAuthenticated: true,
    });
  },
  logout: () => set({ user: null, role: null, isAuthenticated: false }),

  forgotpassword: async (email) => {
    console.log(email);
    const response = await api.post("/auth/forgot-password", { email });
    return response;
  },

  changePassword: async (old_password, new_password, id) => {
    // console.log(user, "here");
    const response = await api.patch(`/auth/change-password/${id}`, {
      old_password,
      new_password,
    });
    return response;
  },

  updateProfile: async (id, data) => {
    set({ loading: true });
    try {
      const response = await api.put(`/users/${id}`, data);
      return response.data
    } catch (error) {
      set({
        loading: false,
        error: error.response ? error.response.data : "An error occurred",
      });
      throw error;
    }
  },
}));

export default useAuthStore;
