import { create } from "zustand";
import supabase from "../utils/supabase";
import { Profile } from "../types/type";

interface ProfileStore {
  profile: Profile | null;
  fetchProfile: (id: string) => Promise<void>;
}

export const usercodeStore = create<ProfileStore>((set) => ({
  profile: null,
  fetchProfile: async (id: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("프로필 가져오기 실패:", error.message);
      set({ profile: null });
    } else {
      set({ profile: data });
    }
  },
}));
