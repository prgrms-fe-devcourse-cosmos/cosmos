import { Heart, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../../stores/authStore";
import {
  checkUserLike,
  addLike,
  removeLike,
  getLikesCount,
} from "../../../api/gallery/gallerylike";
import Modal from "../../common/Modal";

interface TalkLikeButtonProps {
  postId: number;
  initialCount?: number | null;
}

export default function TalkLikeButton({
  postId,
  initialCount = null,
}: TalkLikeButtonProps) {
  const user = useAuthStore((state) => state.userData);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount ?? 0);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const userId = user.id;
    let isCancelled = false;

    async function fetchInitialLike() {
      setIsLoading(true);
      try {
        const [isLiked, count] = await Promise.all([
          checkUserLike(postId, userId),
          getLikesCount(postId),
        ]);
        if (!isCancelled) {
          setLiked(isLiked);
          setLikeCount(count);
        }
      } catch (error) {
        console.error("초기 좋아요 조회 실패:", error);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchInitialLike();

    return () => {
      isCancelled = true;
    };
  }, [postId, user]);

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (isToggling || isLoading) return;

    setIsToggling(true);

    const prevLiked = liked;
    const prevCount = likeCount;

    const newLiked = !prevLiked;
    const newCount = prevCount + (newLiked ? 1 : -1);

    setLiked(newLiked);
    setLikeCount(newCount);

    try {
      const success = prevLiked
        ? await removeLike(postId, user.id)
        : await addLike(postId, user.id);

      if (!success) {
        alert("좋아요 처리 중 오류가 발생했습니다.");
        setLiked(prevLiked);
        setLikeCount(prevCount);
      }
    } catch (error) {
      console.error("좋아요 토글 실패:", error);
      setLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="flex gap-1 md:gap-2 items-center cursor-pointer"
        disabled={isLoading || isToggling}
      >
        <Heart
          className="text-[#D0F700] w-3 h-3 md:w-4 md:h-4"
          fill={liked ? "#D0F700" : "none"}
        />
        <span className="text-[10px] md:text-[13px] leading-none">
          {likeCount}
        </span>
      </button>

      {showLoginModal && (
        <Modal
          icon={<CircleAlert size={32} color="var(--red)" />}
          title="로그인이 필요한 서비스입니다."
          description="로그인 후 이용해주세요."
          confirmButtonText="LOGIN"
          cancelButtonText="BACK"
          onConfirm={() => {
            setShowLoginModal(false);
            navigate('/login');
          }}
          onCancel={() => {
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}