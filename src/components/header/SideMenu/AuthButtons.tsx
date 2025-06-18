import supabase from "../../../utils/supabase";
import { useAuthStore } from "../../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../common/Modal";
import { CircleCheckBig } from "lucide-react";

export default function AuthButtons({
  isLoggedIn,
  toggleMenu,
}: {
  isLoggedIn: boolean;
  toggleMenu: () => void;
}) {
  const { userData, clearUser } = useAuthStore();
  const navigate = useNavigate();

  // 모달
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logOutHandler = () => {
    supabase.auth.signOut();
    clearUser();
    setShowLogoutModal(true);
    // alert('로그아웃되었습니다.');
    // navigate('/');
  };

  return (
    <div className="text-xs w-full">
      {isLoggedIn ? (
        <div className="flex justify-center gap-10">
          <button
            className="cursor-pointer hover:text-[color:var(--primary-300)]"
            onClick={() => {
              navigate(`/user/${userData?.usercode}`);
              toggleMenu();
            }}
          >
            MY PAGE
          </button>
          <button
            className="cursor-pointer hover:text-[color:var(--primary-300)]"
            onClick={logOutHandler}
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
      {showLogoutModal && (
        <Modal
          icon={<CircleCheckBig size={40} color="var(--primary-300)" />}
          title="로그아웃 완료"
          description="다음에 또 만나요"
          confirmButtonText="홈으로 가기"
          onConfirm={() => {
            setShowLogoutModal(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
}
