import { useEffect, useState, ReactNode } from 'react';
import {
  checkUserLike,
  addLike,
  removeLike,
  getLikesCount,
} from '../../../api/gallerylike';

interface GalleryLikeProps {
  postId: number;
  profileId: string;
  IconLiked: ReactNode;
  IconNotLiked: ReactNode;
  disabled?: boolean;
}

export default function GalleryLike({
  postId,
  profileId,
  IconLiked,
  IconNotLiked,
}: GalleryLikeProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
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
  }, [postId, profileId]);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!profileId) {
      alert('비로그인은 좋아요버튼을 누를수없습니다.');
      return;
    }

    if (isToggling || isInitialLoading) return;

    setIsToggling(true);

    const prevLiked = liked;
    const prevCount = likesCount;

    // 낙관적 업데이트
    setLiked(!prevLiked);
    setLikesCount(prevCount + (prevLiked ? -1 : 1));

    try {
      const success = prevLiked
        ? await removeLike(postId, profileId)
        : await addLike(postId, profileId);

      if (!success) {
        // API 실패 시 원상복구
        setLiked(prevLiked);
        setLikesCount(prevCount);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // 에러 발생 시 원상복구
      setLiked(prevLiked);
      setLikesCount(prevCount);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center gap-2 transition-opacity ${
        isToggling || !profileId ? 'opacity-100' : 'opacity-100 cursor-pointer'
      }`}
      disabled={isToggling}
    >
      {liked ? IconLiked : IconNotLiked}
      <span>{likesCount}</span>
    </button>
  );
}
