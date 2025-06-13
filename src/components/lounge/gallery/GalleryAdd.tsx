import Button from '../../common/Button';
import backIcon from '../../../assets/icons/back.svg';
import postimage from '../../../assets/images/post.svg';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGalleryPostStore } from '../../../stores/galleryPostStore';

type GalleryAddProps = {
  mode?: 'edit' | 'add';
};

export default function GalleryAdd({ mode = 'add' }: GalleryAddProps) {
  const { postId } = useParams<{ postId?: string }>();
  const isEditMode = Boolean(postId);

  const [imagePreview, setImagePreview] = useState(postimage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const {
    setImageFile,
    setTitle,
    setContent,
    uploadPost,
    updatePost,
    imageFile,
    title,
    content,
    reset,
    loadPostById,
  } = useGalleryPostStore();

  const isFormValid = isEditMode
    ? Boolean(title && content)
    : Boolean(imageFile && title && content);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
      setImageFile(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    let success = false;
    if (isEditMode && postId) {
      success = await updatePost(postId);
    } else {
      success = await uploadPost();
    }
    if (success) {
      navigate('/lounge/gallery');
    }
  };

  useEffect(() => {
    reset();
    setImagePreview(postimage);

    if (isEditMode && postId) {
      // 수정모드면 기존 게시글 데이터 불러와서 세팅
      loadPostById(postId).then((post) => {
        if (post) {
          setTitle(post.title);
          setContent(post.content);
          if (post.imageUrl) {
            setImagePreview(post.imageUrl);
            setImageFile(null); // 이미지 변경 안하면 새 파일이 없음
          }
        } else {
          // 없는 postId면 목록으로 리다이렉트
          navigate('/lounge/gallery');
        }
      });
    }
  }, [
    isEditMode,
    postId,
    reset,
    setTitle,
    setContent,
    setImageFile,
    loadPostById,
    navigate,
  ]);

  return (
    <div className="w-[768px] h-[824px] bg-[rgba(20,20,20,0.8)] flex flex-col gap-6 p-6 pl-8">
      <Button variant="back" onClick={() => window.history.back()}>
        <img src={backIcon} alt="뒤로가기" className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="w-[704px] text-[var(--white)]">
        <div>
          <h1 className="w-full h-[24px] font-bold text-xl mb-10 text-center">
            게시글 {mode === 'edit' ? '수정' : '작성'}
          </h1>
        </div>
        <div className="w-full h-[561px] flex flex-col">
          <div
            className="w-full h-[240px] mb-7 rounded-[10px]"
            onClick={handleImageClick}
          >
            <img
              src={imagePreview}
              alt="이미지넣기"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="w-full h-[86px] mb-7 text-base">
            <h2 className="mb-4">제목</h2>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full h-[50px] border border-[var(--primary-300)] rounded-[8px] p-5 focus:outline-none"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="w-full h-[169px] mb-7 text-base ">
            <h2 className="mb-4">본문</h2>
            <textarea
              placeholder="본문을 입력하세요."
              className="w-full h-[133px] border border-[var(--primary-300)] rounded-[8px] p-5 focus:outline-none resize-none"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
        </div>
        <div className="w-full h-[38px] flex items-center justify-between px-58">
          <Button
            variant="dark_line"
            className="text-sm w-[119px] h-[33px]"
            onClick={() => window.history.back()}
          >
            CANCEL
          </Button>
          <Button
            variant={isFormValid ? 'neon_filled' : 'disabled'}
            className="text-xs w-[90px] h-[38px]"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
}
