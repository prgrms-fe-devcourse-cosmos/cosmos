import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import { addTalkPost } from "../../../api/talk/talk";

export default function TalkAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [profileId, setProfileId] = useState<string | null>(null);

  // cancel 버튼 클릭 시 폼에 입력된 내용들 초기화
  const reset = () => {
    setTitle("");
    setContent("");
  };

  // 로그인한 유저 profile_id 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("사용자 정보를 가져오는 데 실패:", error);
        return;
      }
      setProfileId(data.user?.id ?? null);
    };

    fetchUser();
  }, []);

  // 게시글 등록
  const handleSave = async () => {
    if (!profileId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await addTalkPost(title, content, profileId);
      navigate("/lounge/talk"); // 작성 후 게시판으로 이동
    } catch (err) {
      console.error("게시글 등록 실패:", err);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  const isEmpty = title.trim() !== "" && content.trim() !== "";

  return (
    <div className="px-8 py-6 bg-[#141414]/80 rounded-[8px]">
      <form className="wrapper">
        {/* 뒤로가기 */}
        <div className="mb-8">
          <button
            className="font-yapari text-[#D0F700] py-4 cursor-pointer flex items-center gap-2 text-[14px]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 text-[#D0F700] cursor-pointer" /> BACK
          </button>
        </div>
        {/* 게시물 작성 */}
        <h2 className="font-bold text-[20px] text-center mb-8">게시물 작성</h2>
        {/* 제목입력 */}
        <div className="mb-8">
          <p className="mb-2">제목</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="제목을 작성해주세요"
            className="border border-[#909090] focus:outline-none w-full px-6 py-[12px] rounded-[8px]"
          />
        </div>
        {/* 내용입력 */}
        <div className="mb-8">
          <p className="mb-2">본문</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 작성해주세요"
            className="w-full h-[390px] resize-none border border-[#909090] focus:outline-none focus:border-[] px-6 py-[12px] rounded-[8px]"
          />
        </div>
        {/* 취소, 저장버튼 */}
        <div className="flex justify-center gap-6">
          <Button variant="dark_line" onClick={reset}>
            CANCEL
          </Button>
          <Button
            variant={isEmpty ? "neon_filled" : "disabled"}
            onClick={handleSave}
          >
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
}
