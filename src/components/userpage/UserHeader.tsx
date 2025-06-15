import React from "react";
import defaultImg from "../../assets/images/profile.svg";
import Button from "../common/Button";

export default function UserHeader({
  isOwner,
  userData,
  onEditClick,
}: {
  isOwner: boolean;
  userData: Profile;
  onEditClick: () => void;
}) {
  return (
    <div className="flex gap-2 md:gap-6 items-center">
      <img
        src={
          userData?.avatar_url && userData?.avatar_url.length > 0
            ? userData?.avatar_url
            : defaultImg
        }
        alt="profileImage"
        className="rounded-full size-22"
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-3 ml-3">
          <div className="text-white text-[28px] font-bold">
            {userData?.username}
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="text-white font-medium">88</div>
              <div className="text-[var(--gray-200)]">Following</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white font-medium">111</div>
              <div className="text-[var(--gray-200)]">Followers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white font-medium">9</div>
              <div className="text-[var(--gray-200)]">Posts</div>
            </div>
          </div>
        </div>
        <div>
          {isOwner ? (
            <Button variant="hover_fill" onClick={onEditClick}>
              Edit Profile
            </Button>
          ) : (
            <button className="absolute right-[3vw] md:right-[10vw] rounded-lg w-40 py-1 text-sm hover:font-medium text-[var(--primary-300)] hover:text-black hover:bg-[var(--primary-300)] font-yapari border border-[var(--primary-300)] cursor-pointer">
              + Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
