import supabase from '../../utils/supabase';
import { GalleryPost } from '../../types/gallery';

export async function GalleryPosts(): Promise<GalleryPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      content,
      created_at,
      profile_id,
      gallery_images (
        image_url
      )
    `
    )
    .eq('post_type', 'gallery');

  if (error || !data) {
    console.error('Error fetching gallery posts:', error);
    return [];
  }

  return data as GalleryPost[];
}
