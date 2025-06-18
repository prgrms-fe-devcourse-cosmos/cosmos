import { useEffect, useState } from "react";
import Button from "./Button";
import { useAuthStore } from "../../stores/authStore";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { CircleAlert } from "lucide-react";
import { useFollowStore } from "../../stores/followStore";

type Props = {
  followingId: string; // 내가 팔로우할 사람의 ID
  className?: string; // tailwind CSS 스타일
  onFollowChange?: ((newStatus: boolean) => void) | undefined;
};

export default function FollowButton({
  followingId,
  className,
  onFollowChange,
}: Props) {
  // 현재 로그인한 사용자 정보 가져오기
  const currentUser = useAuthStore((state) => state.userData);

  // 현재 팔로우 중인지 여부
  const { isFollowing, toggleFollow, fetchFollowing } = useFollowStore();

  // 버튼 클릭 중 로딩 상태
  const [loading, setLoading] = useState(false);

  // 자신인지 확인 (자기 자신은 팔로우x)
  const isMyself = currentUser?.id === followingId;
  const followed = isFollowing(followingId);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시, 팔로우 상태 확인
  useEffect(() => {
    if (currentUser?.id) {
      fetchFollowing(currentUser.id);
    }
  }, [currentUser?.id]);

  // 팔로우 토글 버튼
  const toggle = async () => {
    // 로그인하지 않은 경우 경고창
    if (!currentUser?.id) {
      setShowLoginModal(true);
      return;
    }

    // 자기 자신이면 아무 동작 없음
    if (isMyself || loading) return;

    setLoading(true);

    try {
      await toggleFollow(currentUser.id, followingId);
      onFollowChange?.(!followed);
    } catch (err) {
      console.error("팔로우 토글 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 자기 자신이면 버튼 숨김 ( = 메뉴 보여주기)
  if (isMyself) return null;

  return (
    <>
      <Button
        className={twMerge(
          "text-[7px] rounded-[4px] px-1 md:px-2 py-1 min-w-21",
          className
        )}
        onClick={toggle}
        disabled={loading}
        variant={followed ? "neon_outline" : "neon_filled"}
      >
        {followed ? "UNFOLLOW" : "FOLLOW"}
      </Button>
      {showLoginModal && (
        <Modal
          icon={<CircleAlert size={40} color="#EF4444" />}
          title="로그인이 필요한 서비스입니다."
          description="로그인 후 이용해주세요."
          cancelButtonText="뒤로가기"
          confirmButtonText="로그인"
          onCancel={() => {
            setShowLoginModal(false);
          }}
          onConfirm={() => {
            setShowLoginModal(false);
            navigate("/login");
          }}
        />
      )}
    </>
  );
}
