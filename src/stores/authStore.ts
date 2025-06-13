import { UserMetadata } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AuthStore = {
  isLoggedIn: boolean;
  id: string | null;
  access_token: string | null;
  userData: UserMetadata | null;
  setUser: (id: string, token: string, userData: UserMetadata) => void;
  clearUser: () => void;
};

export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set) => ({
        isLoggedIn: false,
        id: null,
        access_token: null,
        userData: null,
        setUser: (id, token, data) =>
          set({
            isLoggedIn: true,
            id: id,
            access_token: token,
            userData: data,
          }),
        clearUser: () =>
          set({
            isLoggedIn: false,
            id: null,
            access_token: null,
            userData: null,
          }),
      }),
      { name: 'auth-store' }
    )
  )
);
