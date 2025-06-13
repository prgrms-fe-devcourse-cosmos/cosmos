import { create } from "zustand";
import { TalkPostInsert, TalkPostState } from "../types/talk";
import {
  addTalkPostLike,
  fetchTalkPosts,
  getTalkPostLike,
  removeTalkPostLike,
} from "../api/talk/talk";
import supabase from "../utils/supabase";

export const useTalkStore = create<TalkPostState>((set, get) => ({
  // 게시글 조회용
  talkPosts: [],
  loading: false,
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  fetchPosts: async () => {
    set({ loading: true });
    try {
      const data = await fetchTalkPosts();
      set({ talkPosts: data, loading: false });
    } catch (err) {
      console.error("talk 게시글 불러오기 실패:", err);
      set({ loading: false });
    }
  },
  setPosts: (posts) => set({ talkPosts: posts }),
  // 게시글 등록용
  title: "",
  content: "",
  setTitle: (title: string) => set({ title }),
  setContent: (content: string) => set({ content }),
  reset: () => set({ title: "", content: "" }),
  uploadPost: async (title: string, content: string) => {
    // const { title, content } = get();

    // 로그인 확인
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return { success: false, message: "로그인이 필요합니다." };
    }

    const profileId = session.user.id;

    const newPost: TalkPostInsert = {
      title,
      content,
      post_type: "talk",
      profile_id: profileId,
    };

    try {
      set({ loading: true });

      const { data, error } = await supabase
        .from("posts")
        .insert([newPost])
        .select()
        .single();

      // 게시글 등록 요청
      // 자꾸 Failed to fetch 오류뜨는데 DB에 데이터 들어감;
      if (error?.message?.includes("Failed to fetch")) {
        console.log("응답 실패지만 게시글 삽입은 성공");
        return { success: true, message: "게시글이 등록되었습니다." };
      }

      // 게시글 등록 실패
      if (error || !data) {
        return { success: false, message: "게시글 등록에 실패했습니다." };
      }

      // 게시글 등록 성공
      return { success: true, message: "게시글이 성공적으로 등록되었습니다." };
    } catch (e) {
      console.error("예외 발생:", e);
      return { success: false, message: "예외 발생했습니다." };
    } finally {
      set({ loading: false });
    }
  },
  // 게시글 상세 보기
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
  fetchPostById: async (id: number) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`*, profiles(id, username, avatar_url)`)
        .eq("id", id)
        .eq("post_type", "talk")
        .single();

      if (error || !data) {
        console.error("게시글 상세 불러오기 실패:", error);
        set({ selectedPost: null });
      } else {
        set({ selectedPost: data });
      }
    } catch (err) {
      console.error("예외 발생:", err);
    } finally {
      set({ loading: false });
    }
  },
  // 게시글 수정
  updatePost: async (id, title, content) => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return { success: false, message: "로그인이 필요합니다." };
    }

    try {
      const { data, error } = await supabase
        .from("posts")
        .update({
          title,
          content,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("post_type", "talk")
        .select()
        .single();

      if (error || !data) {
        return { success: false, message: "게시글 수정에 실패했습니다." };
      }

      return { success: true, message: "게시글이 성공적으로 수정되었습니다." };
    } catch (err) {
      console.error("수정 실패:", err);
      return { success: false, message: "예외가 발생했습니다." };
    }
  },
  // 게시글 좋아요
  likedPostIds: [],
  likedLoading: false,
  // 특정 게시물의 좋아요 여부
  checkLikeStatus: async (postId: number, userId: string) => {
    set({ likedLoading: true });
    try {
      const liked = await getTalkPostLike(postId, userId);
      if (liked) {
        set((state) => {
          // 중복 방지
          if (state.likedPostIds.includes(postId))
            return { likedLoading: false };
          return {
            likedPostIds: [...state.likedPostIds, postId],
            likedLoading: false,
          };
        });
      } else {
        set({ likedLoading: false });
      }
    } catch (err) {
      console.log("좋아요 상태 확인 실패 : ", err);
      set({ likedLoading: false });
    }
  },
  // 게시글 좋아요 토글
  toggleLike: async (postId: number, userId: string) => {
    const { likedPostIds } = get();
    const isLiked = likedPostIds.includes(postId);

    // 낙관적 업데이트
    const optimisticLikedPostIds = isLiked
      ? likedPostIds.filter((id) => id !== postId)
      : [...likedPostIds, postId];

    set({ likedPostIds: optimisticLikedPostIds });

    try {
      if (isLiked) {
        const { error } = await removeTalkPostLike(postId, userId);
        // 실패하면 롤백
        if (error) throw error;
      } else {
        const { error } = await addTalkPostLike(postId, userId);
        if (error) throw error;
      }
    } catch (err) {
      console.error("좋아요 토글 실패, 롤백:", err);

      // 서버 요청 실패 시 상태 되돌림
      set({ likedPostIds });
    }
  },
}));
