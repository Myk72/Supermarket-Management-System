import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  role: null, // 'manager', 'stocker', 'cashier'
  token: null,
  login: (userData) => set({ 
    user: userData.user,
    role: "manager",
  }),
  logout: () => set({ user: null, role: null, token: null }),
}));

export default useAuthStore;