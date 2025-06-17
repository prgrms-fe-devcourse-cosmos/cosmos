import React, { useRef, useState } from "react";
import defaultImg from "../../assets/images/profile.svg";
import imageUploaderIcon from "../../assets/images/image-uploader.svg";
import { resetImage, updateImage } from "../../api/user/profile";
import Dropdown, { DropdownItem } from "../common/Dropdown";
import { Image, User } from "lucide-react";

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

  const handleResetProfileImage = async () => {
    try {
      const updated = await resetImage(userId);
      setImageUrl(updated.avatar_url || "");
    } catch (e) {
      console.error("기본 이미지 변경 실패 : ", e);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await updateImage(file, userId);
      setImageUrl(url);
    } catch (e) {
      console.error("이미지 업로드 실패 : ", e);
    }
  };

  const items: DropdownItem[] = [
    {
      icon: <Image size={16} />,
      label: "이미지 업로드",
      onClick: () => {
        fileInputRef.current?.click();
        setShowImgDropdown(false);
      },
    },
        {
      icon: <User size={16} />,
      label: "기본 이미지로 변경",
      onClick: () => {
        handleResetProfileImage();
        setShowImgDropdown(false);
      },
    },
  ];

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
          <div className="absolute top-2 -right-42 z-20">
            <Dropdown items={items} size="image" />
          </div>
        )}
      </div>
    </div>
  );
}
