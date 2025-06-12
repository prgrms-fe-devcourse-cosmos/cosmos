import { useEffect, useState } from 'react';
import searchIcon from '../../../assets/icons/search.svg';
import searchGrayIcon from '../../../assets/icons/search_gray.svg';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import GalleryCard from './GalleryCard';
import { GalleryPosts } from '../../../api/gallery/gallerypost';
import { GalleryPost } from '../../../types/gallery';
import GalleryCardSkeleton from './GalleryCardSkeleton';
import { useAuthStore } from '../../../stores/authStore';

export default function Gallery() {
  const isLoggedIn = useAuthStore((state) => !!state.user);
  const [isFocused, setIsFocused] = useState(false);
  const [sortBy, setSortBy] = useState<string>('like.desc');
  const [originalPosts, setOriginalPosts] = useState<GalleryPost[]>([]);
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await GalleryPosts();
      setOriginalPosts(fetchedPosts);
      const initialSorted = sortPosts(fetchedPosts, sortBy);
      setPosts(initialSorted);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (originalPosts.length === 0) return;
    const sorted = sortPosts(originalPosts, sortBy);
    setPosts(sorted);
  }, [sortBy, originalPosts]);

  const sortPosts = (data: GalleryPost[], sort: string) => {
    return [...data].sort((a, b) => {
      if (sort === 'like.desc') {
        return (b.like_count ?? 0) - (a.like_count ?? 0);
      } else if (sort === 'release_date.desc') {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
      return 0;
    });
  };

  const handleSortClick = (sortValue: string) => {
    setSortBy(sortValue);
  };

  const handlePostUpdate = (updatedPost: GalleryPost) => {
    const updatedPosts = originalPosts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    setOriginalPosts(updatedPosts);
  };

  return (
    <>
      <div className="flex justify-between mb-[24px] items-center">
        <ul className="flex ml-2 gap-4 text-[13px] font-medium">
          <li
            className={`cursor-pointer ${
              sortBy === 'like.desc' ? 'text-[#D0F700]' : ''
            }`}
            onClick={() => handleSortClick('like.desc')}
          >
            좋아요순
          </li>
          <li
            className={`cursor-pointer ${
              sortBy === 'release_date.desc' ? 'text-[#D0F700]' : ''
            }`}
            onClick={() => handleSortClick('release_date.desc')}
          >
            최신순
          </li>
        </ul>

        <div className="flex items-center">
          <div className="w-[280px] relative">
            <input
              type="text"
              placeholder="게시글 검색"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full border border-[#909090] pl-[42px] py-[6px] text-[14px] rounded-[8px] outline-none focus:border-[#D0F700] hover:border-[#D0F700]"
            />
            <img
              src={isFocused ? searchIcon : searchGrayIcon}
              alt="검색아이콘"
              className="absolute top-1/2 left-[16px] -translate-y-1/2 w-[14px] h-[14px]"
            />
          </div>
          <Button
            variant={isLoggedIn ? 'neon_filled' : 'disabled'}
            onClick={() => navigate('/lounge/gallery/add')}
            className="font-[yapari] font-medium text-sm ml-2 h-[34px]"
          >
            + Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-[54px] gap-y-[88px] mb-[50px]">
        {isLoading
          ? Array.from({ length: 2 }).map((_, idx) => (
              <GalleryCardSkeleton key={idx} />
            ))
          : posts.map((post) => {
              if (!post.gallery_images) return null;
              return (
                <GalleryCard
                  key={post.id}
                  post={post}
                  onLikeToggle={handlePostUpdate}
                />
              );
            })}
      </div>
    </>
  );
}
