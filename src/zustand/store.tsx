// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (account: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (account, password) => {
        set({ loading: true, error: null });

        try {
          // 👇 Replace this with your real API call
          const response = await fakeLoginApi(account, password);
          set({
            isAuthenticated: true,
            user: response.user,
            token: response.token,
            loading: false,
          });
        } catch (err: any) {
          set({
            error: err.message || 'Đăng nhập thất bại',
            loading: false,
          });
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: 'auth-storage', // lưu vào localStorage
    }
  )
);

const fakeLoginApi = async (account: string, password: string) => {
  return new Promise<{ user: User; token: string }>((resolve, reject) => {
    setTimeout(() => {
      if (account === 'admin' && password === '123456') {
        resolve({
          user: {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
          },
          token: 'fake-jwt-token-123',
        });
      } else {
        reject(new Error('Tài khoản hoặc mật khẩu không đúng'));
      }
    }, 1000);
  });
};
