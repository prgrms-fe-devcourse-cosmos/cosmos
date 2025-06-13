import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import LoungeComment from "../LoungeComment";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import profileImage from "../../../assets/images/profile.svg";
import { useTalkStore } from "../../../stores/talkStore";

export default function TalkDetail() {
  const navigate = useNavigate();
  // useParams ID 받기
  const { id } = useParams();

  const { selectedPost, fetchPostById, loading, setSelectedPost } =
    useTalkStore();

  // 게시글 fetch
  useEffect(() => {
    if (id) {
      // number로 변환하여 전달
      fetchPostById(Number(id));
    }

    return () => {
      setSelectedPost(null); // 언마운트 시 상태 초기화
    };
  }, [id]);

  // 로딩 중
  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-400">
        게시글을 불러오는 중입니다...
      </p>
    );
  }

  // 게시글 못 찾은 경우
  if (!selectedPost) {
    return (
      <p className="text-center mt-10 text-red-500">
        게시글을 찾을 수 없습니다.
      </p>
    );
  }

  const { profiles, created_at, title, content, id: postId } = selectedPost;

  return (
    <div className="px-8 py-6 bg-[#141414]/80">
      <div className="wrapper">
        {/* 뒤로가기버튼 */}
        <div className="mb-8">
          <button
            type="button"
            className="font-yapari text-[#D0F700] py-4 cursor-pointer flex items-center gap-2 text-[14px]"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 text-[#D0F700] cursor-pointer" /> BACK
          </button>
        </div>
        {/* 유저정보 + 게시글 등록 날짜 + 팔로우버튼/메뉴버튼 */}
        <div className="flex justify-between items-start">
          <div className="flex gap-[22px] items-center">
            {/* 유저아이콘 */}
            <img
              src={profiles?.avatar_url || profileImage}
              alt="유저프로필"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            {/* 유저이름, 게시글 등록 날짜 */}
            <div>
              <h3 className="font-semibold">{profiles?.username}</h3>
              <p className="text-[#696969] font-light text-sm">
                {new Date(created_at).toLocaleString()}
              </p>
            </div>
          </div>
          {/* 팔로우버튼/메뉴버튼 */}
          <Button className="text-[12px] px-4 py-[5px]">+ FOLLOW</Button>
        </div>

        {/* 게시글 */}
        <section>
          {/* 제목 */}
          <h3 className="mt-7 mb-8 font-medium text-[20px]">{title}</h3>

          {/* 내용 */}
          <div className="mb-8">
            <p>{content}</p>
          </div>

          {/* 댓글 */}
          <LoungeComment />
        </section>
      </div>
    </div>
  );
}
