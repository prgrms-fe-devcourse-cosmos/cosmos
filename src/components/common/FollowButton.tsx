import { useEffect, useState } from "react";
import Button from "./Button";
import { useAuthStore } from "../../stores/authStore";
import { followUser, getFollowStatus, unfollowUser } from "../../api/follow";
import { twMerge } from "tailwind-merge";

type Props = {
  followingId: string; // 내가 팔로우할 사람의 ID
  className?: string; // tailwind CSS 스타일
};

export default function FollowButton({ followingId, className }: Props) {
  // 현재 로그인한 사용자 정보 가져오기
  const currentUser = useAuthStore((state) => state.userData);

  // 현재 팔로우 중인지 여부
  const [isFollowing, setIsFollowing] = useState(false);

  // 버튼 클릭 중 로딩 상태
  const [loading, setLoading] = useState(false);

  // 자신인지 확인 (자기 자신은 팔로우x)
  const isMyself = currentUser?.id === followingId;

  // 컴포넌트 마운트 시, 팔로우 상태 확인
  useEffect(() => {
    const fetchFollow = async () => {
      // 로그인 하지 않았거나 자기자신이면 패스
      if (!currentUser?.id || isMyself) return;

      try {
        // 현재 사용자가 해당 유저를 팔로우 중인지 확인
        const status = await getFollowStatus(currentUser.id, followingId);
        setIsFollowing(status);
      } catch (err) {
        console.error("팔로우 상태 불러오기 실패:", err);
      }
    };

    fetchFollow();
  }, [currentUser?.id, followingId]);

  // 팔로우 토글 버튼
  const toggleFollow = async () => {
    // 로그인하지 않은 경우 경고창
    if (!currentUser?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 자기 자신이면 아무 동작 없음
    if (isMyself || loading) return;

    setLoading(true);

    try {
      if (isFollowing) {
        // 현재 팔로우중이면 언팔
        await unfollowUser(currentUser.id, followingId);
        setIsFollowing(false);
      } else {
        // 팔로우 중이 아니면 팔로우 추가
        await followUser(currentUser.id, followingId);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("팔로우 토글 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 자기 자신이면 버튼 숨김 ( = 메뉴 보여주기)
  if (isMyself) return null;

  return (
    <Button
      className={twMerge(
        "text-[8px] sm:text-[10px] lg:text-xs w-25 h-8 sm:w-29 lg:w-33 px-4 py-[5px]",
        className
      )}
      onClick={toggleFollow}
      disabled={loading}
    >
      {isFollowing ? "UNFOLLOW" : "FOLLOW"}
    </Button>
  );
}
