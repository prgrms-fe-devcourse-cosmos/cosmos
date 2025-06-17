import React, { useRef, useState } from 'react';
import imageUploaderIcon from '../../assets/images/image-uploader.svg';
import { resetImage, updateImage } from '../../api/user/profile';

export default function EditProfileImage({
  imageUrl,
  setImageUrl,
  userId,
}: {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  userId: string;
}) {
  const [showImgDropdown, setShowImgDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultImg = '/images/cosmos/alien.svg';

  const handleResetProfileImage = async () => {
    try {
      const updated = await resetImage(userId);
      setImageUrl(updated.avatar_url || '');
    } catch (e) {
      console.error('기본 이미지 변경 실패 : ', e);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await updateImage(file, userId);
      setImageUrl(url);
    } catch (e) {
      console.error('이미지 업로드 실패 : ', e);
    }
  };

  return (
    <div className="relative w-40 flex justify-center">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <img
        src={imageUrl || defaultImg}
        className="rounded-full size-40 object-cover "
      />
      <div className="absolute bottom-0 right-0 translate-x-0 translate-y-0">
        <div className="size-10 relative z-10">
          <img
            src={imageUploaderIcon}
            className="cursor-pointer"
            onClick={() => setShowImgDropdown(true)}
          />
        </div>
        {showImgDropdown && (
          <ul className="absolute  top-2 -right-38  bg-[color:var(--grey-600)] text-[color:var] rounded-[10px] shadow z-20 text-sm border-1 text-left ">
            <li
              className="px-4 py-3 hover:bg-[#444] cursor-pointer rounded-tl-[10px] rounded-tr-[10px]"
              onClick={() => {
                handleResetProfileImage();
                setShowImgDropdown(false);
              }}
            >
              기본 이미지로 변경
            </li>
            <li
              className="px-4 py-3 hover:bg-[#444] cursor-pointer rounded-bl-[10px] rounded-br-[10px]"
              onClick={() => {
                fileInputRef.current?.click();
                setShowImgDropdown(false);
              }}
            >
              사진 업로드
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
