import { create } from 'zustand';

interface UserStore {
  uid: string | null;
  setUid: (uid: string) => void;
  clearUid: () => void;
}

export const userStore = create<UserStore>((set) => ({
  uid: null,
  setUid: (uid) => set({ uid }),
  clearUid: () => set({ uid: null }),
}));
