import { create } from 'zustand';
import supabase from '../utils/supabase';
import { Database } from '../types/supabase';

type PostInsert = Database['public']['Tables']['posts']['Insert'];
type GalleryImageInsert =
  Database['public']['Tables']['gallery_images']['Insert'];

interface GalleryPostState {
  imageFile: File | null;
  title: PostInsert['title'];
  content: PostInsert['content'];
  setImageFile: (file: File | null) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  uploadPost: () => Promise<boolean>;
}

export const useGalleryPostStore = create<GalleryPostState>((set, get) => ({
  imageFile: null,
  title: '',
  content: '',
  setImageFile: (file) => set({ imageFile: file }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),

  uploadPost: async () => {
    const { title, content, imageFile } = get();

    if (!imageFile) {
      alert('이미지를 선택해주세요.');
      return false;
    }

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      alert('로그인이 필요합니다.');
      return false;
    }

    const profileId = session.user.id;
    const fileName = `${profileId}/${Date.now()}-${imageFile.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: imageFile.type,
      });

    if (uploadError || !uploadData) {
      alert('이미지 업로드에 실패했습니다.');
      return false;
    }

    const imageUrl = supabase.storage
      .from('gallery-images')
      .getPublicUrl(uploadData.path).data.publicUrl;

    const newPost: PostInsert = {
      title,
      content,
      post_type: 'gallery',
      profile_id: profileId,
    };

    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert([newPost])
      .select()
      .single();

    if (postError || !postData) {
      console.error(postError);
      alert('게시글 등록에 실패했습니다.');
      return false;
    }

    const newImage: GalleryImageInsert = {
      post_id: postData.id,
      image_url: imageUrl,
    };

    const { error: imageError } = await supabase
      .from('gallery_images')
      .insert([newImage]);

    if (imageError) {
      alert('이미지 URL 저장 실패');
      return false;
    }

    alert('게시글이 성공적으로 등록되었습니다.');
    return true;
  },
}));
