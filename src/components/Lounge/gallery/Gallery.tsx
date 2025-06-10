import { useState } from 'react';
import searchIcon from '../../../assets/icons/search.svg';
import searchGrayIcon from '../../../assets/icons/search_gray.svg';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import GalleryCard from './GalleryCard';

export default function Gallery() {
  const [isFocused, setIsFocused] = useState(false);

  const [sortBy, setSortBy] = useState<string>('');

  const navigate = useNavigate();

  const handleSortClick = (sortValue: string) => {
    setSortBy(sortValue);
  };

  return (
    <>
      <div className="flex justify-between mb-[24px] items-center">
        {/* 정렬 필터 */}
        <ul className="flex ml-2 gap-4 text-[13px] font-medium">
          <li
            className={`cursor-pointer ${
              sortBy === 'vote_average.desc' ? 'text-[#D0F700]' : ''
            }`}
            onClick={() => handleSortClick('vote_average.desc')}
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
        {/* 검색창 */}
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
            variant="neon_filled"
            onClick={() => navigate('/lounge/gallery/add')}
            className="font-[yapari] font-medium text-sm ml-2"
          >
            + Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-[54px] gap-y-[88px] mb-[50px]">
        <GalleryCard />
        <GalleryCard />
      </div>
    </>
  );
}
