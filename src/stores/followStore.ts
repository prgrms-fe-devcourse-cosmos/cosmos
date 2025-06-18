import { create } from "zustand";
import { followUser, unfollowUser } from "../api/follow";
import supabase from "../utils/supabase";

type FollowState = {
  followingIds: string[];
  fetchFollowing: (userId: string) => Promise<void>;
  toggleFollow: (myId: string, targetId: string) => Promise<void>;
  isFollowing: (targetId: string) => boolean;
};

export const useFollowStore = create<FollowState>((set, get) => ({
  followingIds: [],
  fetchFollowing: async (userId) => {
    const { data, error } = await supabase
      .from("follows")
      .select("following_id")
      .eq("follower_id", userId);
    if (!error && data) {
      set({ followingIds: data.map((d) => d.following_id) });
    }
  },
  toggleFollow: async (myId, targetId) => {
    const isAlready = get().followingIds.includes(targetId);
    if (isAlready) {
      await unfollowUser(myId, targetId);
      set((state) => ({
        followingIds: state.followingIds.filter((id) => id !== targetId),
      }));
    } else {
      await followUser(myId, targetId);
      set((state) => ({
        followingIds: [...state.followingIds, targetId],
      }));
    }
  },
  isFollowing: (targetId) => {
    return get().followingIds.includes(targetId);
  },
}));
