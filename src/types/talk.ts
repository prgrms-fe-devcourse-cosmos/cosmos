// export type TalkPost = {
//   id: number;
//   title: string;
//   content: string;
//   created_at: string;
//   like_count: number;
//   profiles: {
//     username: string;
//     avatar_url?: string;
//   };
// };
export type TalkPost = {
  id: number;
  created_at: string;
  title: string;
  content: string;
  profile_id: string;
  updated_at: string | null;
  post_type: string;
  like_count: number | null; // ✅ null 허용
  profiles: {
    username: string;
    avatar_url: string | null;
  };
};
