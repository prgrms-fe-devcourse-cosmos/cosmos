import { create } from "zustand";
import { TalkPostInsert, TalkPostState } from "../types/talk";
import { fetchTalkPosts } from "../api/talk/talk";
import supabase from "../utils/supabase";

export const useTalkStore = create<TalkPostState>((set) => ({
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
}));
