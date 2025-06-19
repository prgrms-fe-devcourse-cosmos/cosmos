export type Profile = {
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  email: string;
  id: string;
  updated_at: string | null;
  usercode: string | null;
  username: string;
};

export type Post = {
  content: string;
  created_at: string;
  id: number;
  like_count: number | null;
  post_type: string;
  profile_id: string;
  title: string;
  updated_at: string | null;
};

export type Follow = {
  created_at: string;
  follower_id: string;
  following_id: string;
};
