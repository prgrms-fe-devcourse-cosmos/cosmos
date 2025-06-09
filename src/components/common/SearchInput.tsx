import { useEffect, useState } from "react";
import {
  addRecentSearch,
  clearRecentSearches,
  getRecentSearches,
  removeRecentSearch,
} from "../../utils/recentSearch";
import searchIcon from "../../assets/icons/search.svg";
import searchGrayIcon from "../../assets/icons/search_gray.svg";

type Props = {
  scope: string; // "films" | "gallery" | "talk"
  value: string;
  setValue: (v: string) => void;
  onSearch: (query: string) => void;
};

export default function SearchInput({
  scope,
  value,
  setValue,
  onSearch,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches(scope));
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    onSearch(query);
    addRecentSearch(scope, query);
    setRecentSearches(getRecentSearches(scope));
  };

  return (
    <div className="w-[280px] relative border border-blue-600">
      <input
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);
          if (!v.trim()) {
            onSearch(""); // 검색 초기화
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="영화 검색"
        className="w-full border border-[#909090] pl-[42px] py-[6px] text-[14px] rounded-[8px] outline-none focus:border-[#D0F700] hover:border-[#D0F700]"
      />
      <img
        src={isFocused ? searchIcon : searchGrayIcon}
        className="absolute top-1/2 left-[16px] -translate-y-1/2 w-[14px] h-[14px]"
      />
      {isFocused && recentSearches.length > 0 && (
        <div className="absolute top-[110%] left-0 w-full bg-[#141414] border border-[#D0F700] rounded-[8px] px-4 pt-[12px] text-sm z-10">
          <div className="flex justify-between items-center mb-[12px] px-2 text-[#909090] text-[10px]">
            <span>최근 검색</span>
            <button
              className="cursor-pointer hover:text-white"
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
                className="flex justify-between items-center p-1 mb-2 hover:bg-white/10 cursor-pointer"
              >
                <span
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
                  className="text-[#D0F700]"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
