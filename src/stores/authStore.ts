import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthStore = {
  isLoggedIn: boolean;
  access_token: string | null;
  userData: Profile | null;
  setUser: (token: string, userData: Profile) => void;
  clearUser: () => void;
};

export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set) => ({
        isLoggedIn: false,
        access_token: null,
        userData: null,
        setUser: (token, data) =>
          set({
            isLoggedIn: true,
            access_token: token,
            userData: data,
          }),
        clearUser: () =>
          set({
            isLoggedIn: false,
            access_token: null,
            userData: null,
          }),
      }),
      { name: "auth-store" }
    )
  )
);
