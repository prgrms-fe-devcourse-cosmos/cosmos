import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import SearchInput from "../../common/SearchInput";
import { useEffect } from "react";
import TalkCard from "./TalkCard";
import { useTalkStore } from "../../../stores/talkStore";
import TalkCardSkeleton from "./TalkCardSkeleton";

export default function Talk() {
  const navigate = useNavigate();

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
      <div className="flex justify-end mb-6">
        {/* 검색 */}
        <SearchInput
          scope="talk"
          value={searchQuery}
          setValue={setSearchQuery}
          onSearch={handleSearch}
          placeholder="게시글 검색"
        />
        {/* 게시글 등록 버튼 */}
        <Button
          variant="neon_filled"
          onClick={() => navigate("/lounge/talk/add")}
          className="font-medium text-sm ml-2 h-[35px]"
        >
          + POST
        </Button>
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
