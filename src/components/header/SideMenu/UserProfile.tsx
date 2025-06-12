import React from "react";
import profileImage from "../../../assets/images/profile.svg";
import { ProfileType } from "../../../stores/authStore";

export default function UserProfile({ user }: { user: ProfileType }) {
  return (
    <div className="space-y-4 text-2xl">
      <img
        src={user?.avatar_url || profileImage}
        className="rounded-full size-12"
      />
      <div className="space-y-1">
        <p className="text-[color:var(--primary-300)]">WELCOME</p>
        <p>{user?.username}</p>
      </div>
    </div>
  );
}
