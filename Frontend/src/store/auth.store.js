import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,
      email: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post("/auth/login", userData, {
            withCredentials: true,
          });
          // console.log(response);
          const id = response.data.id;
          const data = await api.get(`/users/${id}`);

          set({
            user: data.data,
            role: data.data.role,
            isAuthenticated: true,
            email: data.data.email,
            loading: false,
          });

          return response;
        } catch (error) {
          set({
            loading: false,
            error: error.response ? error.response.data : "An error occurred",
          });
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await api.post("/auth/logout", null, { withCredentials: true });
          set({
            user: null,
            role: null,
            email: null,
            isAuthenticated: false,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error: error.response ? error.response.data : "An error occurred",
          });
          throw error;
        }
      },

      forgotpassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post("/auth/forgot-password", { email });
          set({ loading: false });
          return response;
        } catch (error) {
          set({
            loading: false,
            error: error.response ? error.response.data : "An error occurred",
          });
          throw error;
        }
      },

      changePassword: async (old_password, new_password, id) => {
        set({ loading: true });
        try {
          const response = await api.patch(`/auth/change-password/${id}`, {
            old_password,
            new_password,
          });
          set({ loading: false });
          return response;
        } catch (error) {
          set({
            loading: false,
            error: error.response ? error.response.data : "An error occurred",
          });
          throw error;
        }
      },

      updateProfile: async (id, data) => {
        set({ loading: true });
        try {
          const response = await api.put(`/users/${id}`, data);
          return response.data;
        } catch (error) {
          set({
            loading: false,
            error: error.response ? error.response.data : "An error occurred",
          });
          throw error;
        }
      },

      checkauth: async () => {
        set({ loading: true, error: null });
        try {
          const response = await api.get("/auth/check-auth", {
            withCredentials: true,
          });
          if (response.data && response.data.user) {
            set({
              user: response.data.user,
              role: response.data.user.role,
              email: response.data.email,
              isAuthenticated: true,
              loading: false,
            });
          } else {
            set({ isAuthenticated: false, loading: false });
          }
        } catch (error) {
          set({
            loading: false,
            isAuthenticated: false,
            error: error.response ? error.response.data : "An error occurred",
          });
          throw error;
        }
      },
    }),
    {
      name: "storage",
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        email: state.email,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
