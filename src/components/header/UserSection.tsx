import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../../public/images/alien.svg";
import userIcon from "../../assets/images/user.svg";
import logoutIcon from "../../assets/images/log-out.svg";
import ThemeToggle from "./ThemeToggle";
import { useAuthStore } from "../../stores/authStore";
import supabase from "../../utils/supabase";

export default function UserSection() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, userData, setUser, clearUser } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as HTMLElement)
    ) {
      setMenuOpen(false);
    }
  }

  async function loginCheck() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session.user.id);
      if (profile) {
        setUser(data.session.access_token, profile[0]);
      }
    } else if (error) console.log("getSession() 오류:", error);
    else clearUser();
  }

  useEffect(() => {
    loginCheck();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        if (
          event === "SIGNED_IN" &&
          session?.user.email &&
          !session?.user.user_metadata.usercode
        ) {
          const new_usercode = Math.random()
            .toString(16)
            .replace("0.", session?.user.email.substring(0, 3));
          const { error } = await supabase.auth.updateUser({
            data: { usercode: new_usercode },
          });
          if (error) console.log("Auth Usercode 업데이트 실패:", error);
          else {
            const { error } = await supabase
              .from("profiles")
              .update({ usercode: new_usercode })
              .eq("id", session.user.id);
            if (error) console.log("Profile Usercode 업데이트 실패:", error);
            else loginCheck();
          }
        }
      }, 0);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuRef]);

  const logOutHandler = () => {
    setMenuOpen(false);
    supabase.auth.signOut();
    clearUser();
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <div ref={menuRef} className="h-full flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <img
                src={userData?.avatar_url || profileImage}
                alt=""
                className="cursor-pointer size-6 rounded-full aspect-square object-cover object-center"
              />
            </button>

            {menuOpen && (
              <div className="flex flex-col fixed z-1 right-10 xl:right-20 top-14 rounded-lg px-6 py-4 bg-[var(--bg-color)] border-[var(--gray-200)] border">
                <div className="flex flex-col gap-2.5 items-center">
                  <Link
                    className="flex gap-2 items-center cursor-pointer"
                    to={`/user/${userData?.usercode}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <img src={userIcon} alt="" />
                    <span className="font-medium text-sm">마이페이지</span>
                  </Link>
                  <button
                    type="button"
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={logOutHandler}
                  >
                    <img src={logoutIcon} alt="" />
                    <span className="font-medium text-sm mt-1 text-[var(--red)]">
                      로그아웃
                    </span>
                  </button>
                </div>
                <div className="flex w-full justify-center mt-4">
                  <ThemeToggle />
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {!isLoggedIn && (
        <button
          className="py-2 px-4 border-1 hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-300)] text-xs rounded-lg cursor-pointer"
          onClick={() => navigate("/login")}
        >
          JOIN
        </button>
      )}
    </>
  );
}
