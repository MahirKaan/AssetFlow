import { create } from 'zustand';

// Kullanıcı tipini tanımlıyoruz
interface User {
  id: string;
  name: string;
  email: string;
  role: 'technician' | 'engineer' | 'admin';
}

// Store'un (Hafızanın) tipini tanımlıyoruz
interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// Store'u oluşturuyoruz
export const useAuthStore = create<AuthState>(set => ({
  token: null,
  user: null,
  isAuthenticated: false,
  login: (token, user) => set({ token, user, isAuthenticated: true }),
  logout: () => set({ token: null, user: null, isAuthenticated: false }),
}));
