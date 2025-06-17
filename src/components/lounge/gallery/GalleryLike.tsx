import { useEffect, useState, ReactNode } from 'react';
import {
  checkUserLike,
  addLike,
  removeLike,
  getLikesCount,
} from '../../../api/gallery/gallerylike';
import Modal from '../../common/Modal';
import { useNavigate } from 'react-router-dom';
import { CircleAlert } from 'lucide-react';

interface GalleryLikeProps {
  postId: number;
  profileId: string;
  IconLiked: ReactNode;
  IconNotLiked: ReactNode;
  initialLiked?: boolean | null;
  initialCount?: number | null;
  disabled?: boolean;
  onToggle?: (likesCount: number, liked: boolean) => void;
}

export default function GalleryLike({
  postId,
  profileId,
  IconLiked,
  IconNotLiked,
  initialLiked = null,
  initialCount = null,
  onToggle,
}: GalleryLikeProps) {
  // 초기값을 initialLiked와 initialCount로 설정
  const [liked, setLiked] = useState(initialLiked ?? false);
  const [likesCount, setLikesCount] = useState(initialCount ?? 0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  // initialLiked와 initialCount가 변경될 때 상태 업데이트
  useEffect(() => {
    setLiked(initialLiked ?? false);
    setLikesCount(initialCount ?? 0);
  }, [initialLiked, initialCount]);

  useEffect(() => {
    // 초기값이 제공되었으면 서버 호출을 건너뛰기
    if (
      (initialLiked !== null &&
        initialLiked !== undefined &&
        initialCount !== null &&
        initialCount !== undefined) ||
      !profileId
    ) {
      setIsInitialLoading(false);
      return;
    }

    let isCancelled = false;

    async function loadInitialData() {
      try {
        setIsInitialLoading(true);

        const [isLiked, count] = await Promise.all([
          checkUserLike(postId, profileId),
          getLikesCount(postId),
        ]);

        if (!isCancelled) {
          setLiked(isLiked);
          setLikesCount(count);
        }
      } catch (error) {
        console.error('Failed to load like data:', error);
      } finally {
        if (!isCancelled) {
          setIsInitialLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isCancelled = true;
    };
  }, [postId, profileId, initialLiked, initialCount]);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!profileId) {
      setShowLoginModal(true);
      return;
    }

    if (isToggling || isInitialLoading) return;

    setIsToggling(true);

    const prevLiked = liked;
    const prevCount = likesCount;

    const newLiked = !prevLiked;
    const newCount = prevCount + (newLiked ? 1 : -1);

    // 낙관적 업데이트
    setLiked(newLiked);
    setLikesCount(newCount);
    if (onToggle) onToggle(newCount, newLiked);

    try {
      const success = prevLiked
        ? await removeLike(postId, profileId)
        : await addLike(postId, profileId);

      if (!success) {
        // API 실패 시 원상복구
        setLiked(prevLiked);
        setLikesCount(prevCount);
        if (onToggle) onToggle(prevCount, prevLiked);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // 에러 발생 시 원상복구
      setLiked(prevLiked);
      setLikesCount(prevCount);
      if (onToggle) onToggle(prevCount, prevLiked);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleLike}
        className={`flex items-center gap-2 transition-opacity ${
          isToggling || !profileId
            ? 'opacity-100'
            : 'opacity-100 cursor-pointer'
        }`}
        disabled={isToggling}
      >
        {liked ? IconLiked : IconNotLiked}
        <span className="pt-[2px]">{likesCount}</span>
      </button>

      {showLoginModal && (
        <Modal
          icon={<CircleAlert size={40} color="#EF4444" />}
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
