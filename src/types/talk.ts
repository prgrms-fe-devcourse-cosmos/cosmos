export type TalkPost = {
  id: number | null;
  created_at: string | null;
  title: string | null;
  content: string | null;
  profile_id: string | null;
  updated_at: string | null;
  post_type: string | null;
  like_count: number | null;
  username: string | null;
  avatar_url: string | null;
  comment_count: number | null;
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
  uploadPost: (title: string, content: string) => Promise<UploadPostResult>;
  // 게시글 상세 보기
  selectedPost: TalkPost | null;
  setSelectedPost: (post: TalkPost | null) => void;
  fetchPostById: (id: number) => Promise<void>;
  // 게시글 수정
  updatePost: (
    id: number,
    title: string,
    content: string
  ) => Promise<{ success: boolean; message: string }>;
  // 게시글 검색
  page: number;
  hasMore: boolean;
  loadMorePosts: () => Promise<void>;
  resetAndFetchPosts: () => Promise<void>;
}

// talk post insert
export interface TalkPostInsert {
  title: string;
  content: string;
  post_type: "talk";
  profile_id: string;
}
