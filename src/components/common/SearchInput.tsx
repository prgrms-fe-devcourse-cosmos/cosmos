import { useEffect, useRef, useState } from 'react';
import {
  addRecentSearch,
  clearRecentSearches,
  getRecentSearches,
  removeRecentSearch,
} from '../../utils/recentSearch';
import { X, Search } from 'lucide-react';

type Props = {
  scope: string;
  value: string;
  setValue: (v: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  scope,
  value,
  setValue,
  onSearch,
  placeholder,
  className,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const shouldOpenDropdown = isFocused && recentSearches.length > 0;
  useEffect(() => {
    setRecentSearches(getRecentSearches(scope));
  }, []);

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    addRecentSearch(scope, trimmed);
    setRecentSearches(getRecentSearches(scope));
    setIsFocused(false);
  };

  return (
    <div
      ref={searchRef}
      className={`bg-[#141414] relative ${
        className ?? 'w-[170px] sm:w-[280px]'
      }`}
    >
      <div className="relative">
        {/* 검색 입력창 */}
        <input
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            setValue(v);
            if (!v.trim()) {
              onSearch(''); // 검색 초기화
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(value);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={`w-full border border-[#909090] pl-[42px] py-[6px] text-[14px] rounded-[8px] outline-none focus:outline-none hover:placeholder-white/80 ${
            shouldOpenDropdown
              ? 'border-b-0 rounded-bl-none rounded-br-none'
              : ''
          }`}
        />
        {/* 검색 아이콘 */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleSearch(value);
          }}
          className="absolute top-[10px] left-[16px] cursor-pointer"
        >
          <Search
            size={14}
            className={`${isFocused ? 'text-white' : 'text-[#909090]'}`}
          />
        </button>
      </div>
      {/* 최근 검색어 드롭다운 */}
      {shouldOpenDropdown && (
        <div
          className="absolute top-[100%] left-0 w-full 
        bg-[#141414] border-x border-b border-[#909090] 
        rounded-bl-[8px] rounded-br-[8px] px-4 pt-[12px] text-sm z-10"
        >
          <div className="flex justify-between items-center mb-[12px] px-0 sm:px-2 text-[#909090] text-[9px] sm:text-[10px]">
            <span>최근 검색</span>
            <button
              className="cursor-pointer hover:text-white/80"
              onMouseDown={() => {
                clearRecentSearches(scope);
                setRecentSearches([]);
              }}
            >
              전체 삭제
            </button>
          </div>
          <ul>
            {recentSearches.map((item) => (
              <li
                key={item}
                className="flex justify-between items-center p-1 mb-2
                 hover:bg-white/10 cursor-pointer rounded-[4px]"
              >
                <span
                  className="flex-1 truncate pr-2"
                  onMouseDown={() => {
                    setValue(item);
                    handleSearch(item);
                    setIsFocused(false);
                  }}
                >
                  {item}
                </span>
                <button
                  onMouseDown={() => {
                    removeRecentSearch(scope, item);
                    setRecentSearches(getRecentSearches(scope));
                  }}
                  className="text-[#909090] cursor-pointer flex-shrink-0"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
