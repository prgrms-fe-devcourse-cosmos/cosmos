import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type ProfileType = {
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  email: string;
  id: string;
  updated_at: string | null;
  username: string;
  usercode: string;
} | null;

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
        name: "auth-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
