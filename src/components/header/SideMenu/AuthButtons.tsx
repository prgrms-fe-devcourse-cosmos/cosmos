import React from "react";
import supabase from "../../../utils/supabase";
import { useAuthStore } from "../../../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function AuthButtons({ isLoggedIn }: { isLoggedIn: boolean }) {
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  async function logoutHandler() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("로그아웃 오류 : ", error);
    } else {
      clearUser();
      sessionStorage.removeItem("auth-store");
      window.location.href = "/";
    }
  }
  return (
    <div className="text-[10px] w-full">
      {isLoggedIn ? (
        <div className="flex justify-center gap-4">
          <button className="cursor-pointer" onClick={() => navigate("/")}>
            MY PAGE
          </button>
          <button className="cursor-pointer" onClick={logoutHandler}>
            LOG OUT
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <button className="cursor-pointer" onClick={() => navigate("/login")}>
            JOIN
          </button>
        </div>
      )}
    </div>
  );
}
