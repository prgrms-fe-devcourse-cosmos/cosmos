import React from "react";
import supabase from "../../../utils/supabase";
import { useAuthStore } from "../../../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function AuthButtons({
  isLoggedIn,
  toggleMenu,
}: {
  isLoggedIn: boolean;
  toggleMenu: () => void;
}) {
  const user = useAuthStore((state) => state.user);
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
    <div className="text-xs w-full">
      {isLoggedIn ? (
        <div className="flex justify-center gap-10">
          <button
            className="cursor-pointer hover:text-[color:var(--primary-300)]"
            onClick={() => {
              navigate(`/user/${user?.usercode}`);
              toggleMenu();
            }}
          >
            MY PAGE
          </button>
          <button
            className="cursor-pointer hover:text-[color:var(--primary-300)]"
            onClick={logoutHandler}
          >
            LOG OUT
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <button
            className="cursor-pointer hover:text-[color:var(--primary-300)]"
            onClick={() => {
              navigate("/login");
              toggleMenu();
            }}
          >
            JOIN
          </button>
        </div>
      )}
    </div>
  );
}
