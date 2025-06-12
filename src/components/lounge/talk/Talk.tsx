import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import SearchInput from "../../common/SearchInput";
import { useState } from "react";
import TalkCard from "./TalkCard";

export default function Talk() {
  const navigate = useNavigate();
  // 검색 상태 정의
  const [searchInput, setSearchInput] = useState("");

  // 검색 처리 함수
  const handleSearch = (query: string) => {
    console.log("Talk 검색 실행:", query);
    // 나중에 api 호출이나 zustand 사용
  };

  return (
    <div>
      {/* 검색 + 게시글 등록 버튼 */}
      <div className="flex justify-end mb-6">
        {/* 검색 */}
        <SearchInput
          scope="talk"
          value={searchInput}
          setValue={setSearchInput}
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
      <TalkCard />
      <TalkCard />
    </div>
  );
}
