<<<<<<< HEAD
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type ProfileType = {
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  email: string;
  id: string;
  updated_at: string | null;
  username: string;
  usercode: string;
} | null;
=======
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
>>>>>>> origin/main

type AuthStore = {
  isLoggedIn: boolean;
  user: ProfileType;
  token: string | null;
  setUser: (user: ProfileType, token: string) => void;
  clearUser: () => void;
};

export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set) => ({
        isLoggedIn: false,
        user: null,
        token: null,
        setUser: (user, token: string) =>
          set({ user, token, isLoggedIn: !!user && !!token }),
        clearUser: () => set({ user: null, token: null, isLoggedIn: false }),
      }),
      {
        name: 'auth-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
