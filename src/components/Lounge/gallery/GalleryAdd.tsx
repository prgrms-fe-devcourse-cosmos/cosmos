import Button from '../../common/Button';
import backIcon from '../../../assets/icons/back.svg';
import postimage from '../../../assets/images/post.svg';
import { useRef, useState } from 'react';

export default function GalleryAdd() {
  const [imagePreview, setImagePreview] = useState(postimage);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-[768px] h-[824px] bg-[rgba(20,20,20,0.8)] flex flex-col gap-6 p-6 pl-8">
      <Button variant="back" onClick={() => window.history.back()}>
        <img src={backIcon} alt="뒤로가기" className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="w-[704px] text-[var(--white)]">
        <div>
          <h1 className="w-full h-[24px] font-bold text-xl mb-10 text-center">
            게시글 작성
          </h1>
        </div>
        <div className="w-full h-[561px]flex flex-col">
          <div
            className="w-full h-[240px] mb-7 rounded-[10px]"
            onClick={handleImageClick}
          >
            {/* 이미지 */}
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
          <div className="w-full h-[86px] bg-black mb-7 text-base">
            <h2 className="mb-4">제목</h2>
            <input
              type="text"
              placeholder="제목"
              className="w-full h-[50px] border border-[var(--primary-300)] rounded-[8px] p-5 focus:outline-none"
            />
          </div>
          <div className="w-full h-[169px] bg-black mb-7 text-base ">
            <h2 className="mb-4">본문</h2>
            <textarea
              placeholder="본문"
              className="w-full h-[133px] border border-[var(--primary-300)] rounded-[8px] p-5 focus:outline-none resize-none"
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
          <Button variant="neon_filled" className="text-xs w-[90px] h-[38px]">
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
}
