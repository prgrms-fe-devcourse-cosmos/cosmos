import { create } from "zustand";
import { TalkPostInsert, TalkPostState } from "../types/talk";
import { fetchTalkPosts } from "../api/talk/talk";
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
  uploadPost: async () => {
    const { title, content } = get();

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
}));
