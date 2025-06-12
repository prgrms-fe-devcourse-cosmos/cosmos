import React from "react";
import profileImage from "../../../assets/images/profile.svg";
import { ProfileType } from "../../../stores/authStore";

export default function UserProfile({ user }: { user: ProfileType }) {
  return (
    <div className="space-y-4">
      <img
        src={user?.avatar_url || profileImage}
        className="rounded-full size-8"
      />
      <p>WELCOME,</p>
      <p className="font-[watermelonSalad]">{user?.username}</p>
    </div>
  );
}
