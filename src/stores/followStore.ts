import { create } from "zustand";
import { persist } from "zustand/middleware";
import supabase from "../utils/supabase";

interface FollowStore {
  FollowList: string[] | null;
  UserList: Profile[] | null;
  setFollowList: (userDataId: string) => void;
  setUserList: (FollowList: string[]) => void;
  clearLists: () => void;
}

export const useFollowingStore = create(
  persist<FollowStore>(
    (set) => ({
      FollowList: null,
      UserList: null,
      refresh: 1,
      setFollowList: async (userDataId) => {
        const { data } = await supabase
          .from("follows")
          .select("following_id")
          .match({ follower_id: userDataId });
        if (data) {
          set({ FollowList: data.map((item) => item.following_id) });
        }
      },
      setUserList: async (FollowList) => {
        const { data } = await supabase.from("profiles").select("*");
        if (data) {
          set({
            UserList: data.filter((item) => FollowList.includes(item.id)),
          });
        }
      },
      clearLists: () => set({ FollowList: null, UserList: null }),
    }),
    { name: "following-store" }
  )
);

export const useFollowerStore = create(
  persist<FollowStore>(
    (set) => ({
      FollowList: null,
      UserList: null,
      setFollowList: async (userDataId) => {
        const { data } = await supabase
          .from("follows")
          .select("follower_id")
          .match({ following_id: userDataId });
        if (data) {
          set({ FollowList: data.map((item) => item.follower_id) });
        }
      },
      setUserList: async (FollowList) => {
        const { data } = await supabase.from("profiles").select("*");
        if (data) {
          set({
            UserList: data.filter((item) => FollowList.includes(item.id)),
          });
        }
      },
      clearLists: () => set({ FollowList: null, UserList: null }),
    }),
    { name: "follower-store" }
  )
);
