import React, { useRef, useState } from "react";
import defaultImg from "../../assets/images/profile.svg";
import imageUploaderIcon from "../../assets/images/image-uploader.svg";

export default function EditProfileImage({
  userData,
}: {
  userData: ProfileType;
}) {
  const [showImgDropdown, setShowImgDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResetProfileImage = async () => {};
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
        src={userData?.avatar_url || defaultImg}
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
          <ul className="absolute bottom-[-100px] top-10 -right-35 w-[160px] bg-[color:var(--grey-600)] text-[color:var] rounded-[10px] shadow z-20 text-sm">
            <li
              className="px-4 py-2 hover:bg-[#444] cursor-pointer rounded-tl-[10px] rounded-tr-[10px]"
              onClick={() => {
                handleResetProfileImage();
                setShowImgDropdown(false);
              }}
            >
              기본 이미지로 변경
            </li>
            <li
              className="px-4 py-2 hover:bg-[#444] cursor-pointer rounded-bl-[10px] rounded-br-[10px]"
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
