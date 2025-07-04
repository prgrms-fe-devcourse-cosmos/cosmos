import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import {
  addLike,
  checkUserLike,
  getLikesCount,
  removeLike,
} from '../../api/gallery/gallerylike';
import { Heart } from 'lucide-react';

interface Props {
  postId: number;
  initialCount?: number | null;
}
export default function PostLikeButton({ postId, initialCount = null }: Props) {
  // 로그인한 사용자 정보
  const user = useAuthStore((state) => state.userData);

  // 상태 정의
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount ?? 0);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  // 초기 좋아요 상태 조회
  useEffect(() => {
    // 로그인 안 됐으면 로딩 종료
    if (!user) {
      setIsLoading(false);
      return;
    }

    const userId = user.id;
    // 언마운트 상태 확인용
    let isCancelled = false;

    async function fetchInitialLike() {
      setIsLoading(true);
      try {
        const [isLiked, count] = await Promise.all([
          // 사용자가 좋아요 눌렀는지 확인
          checkUserLike(postId, userId),
          // 전체 좋아요 수 가져오기
          getLikesCount(postId),
        ]);
        if (!isCancelled) {
          // 좋아요 상태 저장
          setLiked(isLiked);
          // 좋아요 수 저장
          setLikeCount(count);
        }
      } catch (error) {
        console.error('초기 좋아요 조회 실패:', error);
      } finally {
        if (!isCancelled) {
          // 로딩 종료
          setIsLoading(false);
        }
      }
    }

    fetchInitialLike();

    return () => {
      isCancelled = true;
    };
  }, [postId, user]);

  // 좋아요 토글
  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 상세페이지로 이동 방지
    e.stopPropagation();

    // 로그인 안 된 사용자는 좋아요 못 누르게
    if (!user) {
      return;
    }

    // 중복 클릭 또는 로딩중이면 리턴
    if (isToggling || isLoading) return;

    // 클릭 처리 중 상태 설정
    setIsToggling(true);

    // 이전 상태 기억
    const prevLiked = liked;
    const prevCount = likeCount;

    // 낙관적 처리
    const newLiked = !prevLiked;
    const newCount = prevCount + (newLiked ? 1 : -1);

    setLiked(newLiked);
    setLikeCount(newCount);

    try {
      const success = prevLiked
        ? await removeLike(postId, user.id)
        : await addLike(postId, user.id);

      if (!success) {
        // 실패 시 롤백
        setLiked(prevLiked);
        setLikeCount(prevCount);
      }
    } catch (error) {
      // 예외 처리
      console.error('좋아요 토글 실패:', error);
      setLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      // 클릭 처리 완료
      setIsToggling(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex gap-2 items-center cursor-pointer"
      disabled={isLoading || isToggling}
    >
      <Heart
        className="text-[#D0F700] w-3 h-3  md:w-4 md:h-4"
        fill={liked ? '#D0F700' : 'none'}
      />
      <span className="pt-1 text-xs md:text-sm leading-none">{likeCount}</span>
    </button>
  );
}
