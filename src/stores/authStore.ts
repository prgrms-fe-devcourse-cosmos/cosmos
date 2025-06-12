import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type AuthStore = {
  user: ProfileType;
  token: string | null;
  setUser: (user: ProfileType, token: string) => void;
  clearUser: () => void;
};

export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set) => ({
        user: null,
        token: null,
        setUser: (user, token: string) => set({ user, token }),
        clearUser: () => set({ user: null, token: null }),
      }),
      {
        name: 'auth-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
