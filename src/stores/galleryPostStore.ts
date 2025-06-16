import { create } from 'zustand';
import supabase from '../utils/supabase';
import { Database } from '../types/supabase';

type PostInsert = Database['public']['Tables']['posts']['Insert'];
type PostUpdate = Database['public']['Tables']['posts']['Update'];
type GalleryImageInsert =
  Database['public']['Tables']['gallery_images']['Insert'];

interface GalleryPostState {
  imageFile: File | null;
  title: PostInsert['title'];
  content: PostInsert['content'];
  setImageFile: (file: File | null) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  reset: () => void;
  uploadPost: () => Promise<boolean>;

  // 수정모드
  loadPostById: (postId: number | string) => Promise<{
    id: number;
    title: string;
    content: string;
    imageUrl: string | null;
  } | null>;
  updatePost: (postId: number | string) => Promise<boolean>;
}

export const useGalleryPostStore = create<GalleryPostState>((set, get) => ({
  imageFile: null,
  title: '',
  content: '',
  setImageFile: (file) => set({ imageFile: file }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  reset: () => set({ imageFile: null, title: '', content: '' }),

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

    // 파일이름 안전하게 생성
    const getSafeFileName = (file: File) => {
      const extension = file.name.split('.').pop();
      const baseName = file.name
        .split('.')
        .slice(0, -1)
        .join('.')
        .replace(/[^\w\d_-]/g, ''); // 한글, 특수문자 제거
      return `${Date.now()}-${baseName}.${extension}`;
    };

    const fileName = `${postData.id}/${getSafeFileName(imageFile)}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false,
        contentType: imageFile.type,
      });

    if (uploadError || !uploadData) {
      console.error(uploadError);
      await supabase.from('posts').delete().eq('id', postData.id);
      alert('이미지 업로드에 실패했습니다.');
      return false;
    }

    const imageUrl = supabase.storage
      .from('gallery-images')
      .getPublicUrl(uploadData.path).data.publicUrl;

    try {
      await fetch(imageUrl);
    } catch (e) {
      console.warn('CDN warm-up 실패:', e);
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

  loadPostById: async (postId) => {
    // 포스트 테이블에서 post 조회
    const { data: postData, error: postError } = await supabase
      .from('posts')
      .select('id, title, content')
      .eq('id', Number(postId))
      .single();

    if (postError || !postData) {
      console.error(postError);
      return null;
    }

    // 이미지 테이블에서 이미지 URL 조회
    const { data: imageData, error: imageError } = await supabase
      .from('gallery_images')
      .select('image_url')
      .eq('post_id', Number(postId))
      .single();

    if (imageError) {
      console.error(imageError);
      return null;
    }

    return {
      id: postData.id,
      title: postData.title,
      content: postData.content,
      imageUrl: imageData?.image_url || null,
    };
  },

  updatePost: async (postId) => {
    const { title, content, imageFile } = get();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      alert('로그인이 필요합니다.');
      return false;
    }

    // 게시글 내용 업데이트
    const updateData: PostUpdate = {
      title,
      content,
    };

    const { error: updateError } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', Number(postId));

    if (updateError) {
      console.error(updateError);
      alert('게시글 수정에 실패했습니다.');
      return false;
    }

    if (imageFile) {
      // 이미지 변경 시 업로드
      const fileName = `${postId}/${Date.now()}-${imageFile.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: true,
          contentType: imageFile.type,
        });

      if (uploadError || !uploadData) {
        console.error(uploadError);
        alert('이미지 업로드에 실패했습니다.');
        return false;
      }

      const imageUrl = supabase.storage
        .from('gallery-images')
        .getPublicUrl(uploadData.path).data.publicUrl;

      // 이미지 테이블에 이미지 URL 업데이트
      const { data: existingImage, error: existingImageError } = await supabase
        .from('gallery_images')
        .select('post_id')
        .eq('post_id', Number(postId))
        .single();

      if (existingImageError) {
        console.error(existingImageError);
        console.log(postId);
        alert('기존 이미지 조회에 실패했습니다.');
        return false;
      }

      if (existingImage) {
        // 기존 이미지 업데이트
        const { error: imageUpdateError } = await supabase
          .from('gallery_images')
          .update({ image_url: imageUrl })
          .eq('post_id', Number(postId));

        if (imageUpdateError) {
          console.log(postId);
          console.log(imageUrl);
          alert('이미지 URL 수정 실패');
          return false;
        }
      } else {
        // 기존 이미지 없으면 새로 삽입
        const newImage: GalleryImageInsert = {
          post_id: Number(postId),
          image_url: imageUrl,
        };
        const { error: imageInsertError } = await supabase
          .from('gallery_images')
          .insert([newImage]);

        if (imageInsertError) {
          alert('이미지 URL 저장 실패');
          return false;
        }
      }
    }

    alert('게시글이 성공적으로 수정되었습니다.');
    return true;
  },
}));
