export type TalkPost = {
  id: number;
  created_at: string;
  title: string;
  content: string;
  profile_id: string;
  updated_at: string | null;
  post_type: string;
  like_count: number | null;
  profiles: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
};

// 게시글 등록용
type UploadPostResult = {
  success: boolean;
  message: string;
};

export interface TalkPostState {
  // 게시글 조회
  talkPosts: TalkPost[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchPosts: () => Promise<void>;
  setPosts: (posts: TalkPost[]) => void;
  // 게시글 등록
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  reset: () => void;
  uploadPost: () => Promise<UploadPostResult>;
  // 게시글 상세 보기
  selectedPost: TalkPost | null;
  setSelectedPost: (post: TalkPost | null) => void;
  fetchPostById: (id: number) => Promise<void>;
}

// talk post insert
export interface TalkPostInsert {
  title: string;
  content: string;
  post_type: "talk";
  profile_id: string;
}
