import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import profileImage from "../../assets/profile.svg";
import userIcon from "../../assets/user.svg";
import logout from "../../assets/log-out.svg";
import light from "../../assets/lightMode.svg";
import dark from "../../assets/darkMode.svg";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 바깥 클릭을 감지하여 메뉴 상태 업데이트
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    // 바깥 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return (
      // 라우터와 같거나 라우터의 하위문서로가도 작동한다.
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <nav className="font-[yapari] text-white sticky top-0 z-50 border-b border-[#30363d]">
      <div className="flex items-center justify-between h-16 w-full px-20">
        <div
          className="flex-shrink-0 flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="ml-2 text-xl">COSMOS</span>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Daily Space", path: "/daily" },
              { name: "Lounge", path: "/lounge" },
              { name: "Cosmo Lab", path: "/lab" },
            ].map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors
                    ${
                      active
                        ? "text-[color:var(--primary-300)]"
                        : "text-[color:var(--white)] hover:text-[color:var(--primary-300)]"
                    }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {localStorage.getItem("sb-qwntelixvmmeluarhlrr-auth-token") ? (
          <div ref={menuRef}>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img
                src={
                  JSON.parse(
                    localStorage.getItem("sb-qwntelixvmmeluarhlrr-auth-token")!
                  ).user.user_metadata.avatar_url.length > 0
                    ? JSON.parse(
                        localStorage.getItem(
                          "sb-qwntelixvmmeluarhlrr-auth-token"
                        )!
                      ).user.user_metadata.avatar_url
                    : profileImage
                }
                alt="profileImage"
                className="rounded-full size-8"
              />
            </button>
            {menuOpen && (
              <div className="flex flex-col gap-4 fixed z-1 right-19 top-14 rounded-lg px-6 py-4 bg-[var(--bg-color)] border-[var(--gray-200)] border">
                <div className="flex flex-col gap-2.5 items-center">
                  <button className="flex gap-2 cursor-pointer">
                    <img src={userIcon} alt="" />
                    <span className="font-medium text-sm mt-1">마이페이지</span>
                  </button>
                  <button
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => {
                      setMenuOpen(false);
                      alert("로그아웃되었습니다.");
                      localStorage.removeItem(
                        "sb-qwntelixvmmeluarhlrr-auth-token"
                      );
                      navigate("/");
                    }}
                  >
                    <img src={logout} alt="" />
                    <span className="font-medium text-sm mt-1 text-[var(--red)]">
                      로그아웃
                    </span>
                  </button>
                </div>
                <div className="flex gap-3 justify-center">
                  <button className="cursor-pointer">
                    <img src={light} alt="" className="size-4" />
                  </button>
                  <button className="cursor-pointer">
                    <img src={dark} alt="" className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="py-2 px-4 border-1 hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-300)] text-xs rounded-lg cursor-pointer"
            onClick={() => navigate("/login")}
          >
            JOIN
          </button>
        )}
      </div>
    </nav>
  );
}
