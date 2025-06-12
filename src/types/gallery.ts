import { Database } from './supabase';

type Post = Database['public']['Tables']['posts']['Row'];

export type GalleryPost = Post & {
  gallery_images: { image_url: string } | null;
};

export interface GalleryPostWithLike extends GalleryPost {
  liked: boolean;
}
