import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import SearchInput from "../../common/SearchInput";
import { useEffect } from "react";
import TalkCard from "./TalkCard";
import { useTalkStore } from "../../../stores/talkStore";
import TalkCardSkeleton from "./TalkCardSkeleton";
import { useAuthStore } from "../../../stores/authStore";

export default function Talk() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // store
  const {
    talkPosts,
    fetchPosts,
    loading,
    searchQuery,
    setSearchQuery,
    resetAndFetchPosts,
  } = useTalkStore();

  // 게시글 불러오기
  useEffect(() => {
    fetchPosts();
  }, []);

  // 검색 처리 함수
  const handleSearch = (query: string) => {
    // 검색어를 Zustand 상태로 저장
    setSearchQuery(query);

    // 검색어에 맞춰 게시글 다시 불러오기
    resetAndFetchPosts();
  };

  return (
    <div>
      {/* 검색 + 게시글 등록 버튼 */}
      <div className="flex w-full justify-end mb-6  ">
        <div className="flex gap-2 w-full md:w-[50%] pr-1 md:pr-2 lg:pr-0 xl:pr-1 ml-2 md:pl-9 items-center">
          <SearchInput
            scope="talk"
            value={searchQuery}
            setValue={setSearchQuery}
            onSearch={handleSearch}
            placeholder="게시글 검색"
          />
          {/* 게시글 등록 버튼 */}
          <div className="group">
            <Button
              variant={isLoggedIn ? "hover_fill" : "disabled"}
              onClick={() => navigate("/lounge/talk/add")}
              className="font-[yapari]  text-xs lg:text-xs  whitespace-nowrap"
            >
              + Post
            </Button>
          </div>
        </div>
        {/* 검색 */}
      </div>
      {/* 전체 게시글 */}
      {/* 게시글 리스트 */}
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => <TalkCardSkeleton key={i} />)
      ) : talkPosts.length === 0 ? (
        <p className="text-center mt-10 text-gray-400">
          등록된 게시글이 없습니다.
        </p>
      ) : (
        talkPosts.map((post) => <TalkCard key={post.id} post={post} />)
      )}
    </div>
  );
}
