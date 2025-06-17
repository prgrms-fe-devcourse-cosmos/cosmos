import Button from "../../common/Button";
import postimage from "../../../assets/images/post.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGalleryPostStore } from "../../../stores/galleryPostStore";
import LoadingSpinner from "../../common/LoadingSpinner";
import TextArea from "../../common/TextArea";

type GalleryAddProps = {
  mode?: "edit" | "add";
};

export default function GalleryAdd({ mode = "add" }: GalleryAddProps) {
  const { postId } = useParams<{ postId?: string }>();
  const isEditMode = Boolean(postId);

  const [imagePreview, setImagePreview] = useState(postimage);
  const [isLoading, setIsLoading] = useState(false);
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
      navigate("/lounge/gallery");
    }
  };

  useEffect(() => {
    const load = async () => {
      reset();
      setImagePreview(postimage);

      if (isEditMode && postId) {
        setIsLoading(true);
        const post = await loadPostById(postId);
        if (post) {
          setTitle(post.title);
          setContent(post.content);
          if (post.imageUrl) {
            setImagePreview(post.imageUrl);
            setImageFile(null);
          }
        } else {
          navigate("/lounge/gallery");
        }
        setIsLoading(false);
      }
    };

    load();
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

  if (isEditMode && isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-[824px] bg-[rgba(20,20,20,0.8)] flex flex-col gap-6 p-6 pl-8">
      <div className="group mb-2">
        <Button
          variant="back"
          className="text-xs lg:text-base"
          onClick={() => navigate(-1)}
        >
          BACK
        </Button>
      </div>

      <div className="text-[var(--white)] w-full max-w-[704px]">
        <h1 className="w-full font-bold text-xl mb-10 text-center">
          게시글 {mode === "edit" ? "수정" : "작성"}
        </h1>

        <div className="w-full flex flex-col">
          <div
            className="w-full h-[240px] mb-7 rounded-[10px]"
            onClick={handleImageClick}
          >
            <img
              src={imagePreview}
              alt="이미지넣기"
              className="w-full h-full object-cover lg:object-contain"
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
              className="w-full h-[50px] border border-[var(--gray-200)] rounded-[8px] p-5 focus:outline-none focus:border-[var(--primary-300)]"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="w-full h-[169px] mb-7 text-base">
            <h2 className="mb-4">본문</h2>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="scrollbar-hide"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 md:gap-6">
          <div className="group px-6">
            <Button
              variant="back"
              className="text-xs lg:text-base"
              onClick={() => navigate(-1)}
            >
              CANCEL
            </Button>
          </div>
          <Button
            variant={isFormValid ? "neon_filled" : "disabled"}
            className="text-sm md:text-[16px] px-5 md:px-6"
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
