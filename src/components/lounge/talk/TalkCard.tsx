import { MessageSquare } from "lucide-react";
import { TalkPost } from "../../../types/talk";
import profileImage from "../../../assets/images/profile.svg";
import { useNavigate } from "react-router-dom";
import TalkLikeButton from "./TalkLikeButton";
import { useEffect, useState } from "react";
import { fetchTalkCommentCount } from "../../../api/talk/talk";

export default function TalkCard({ post }: { post: TalkPost }) {
  const navigate = useNavigate();

  // 댓글 수 부분
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    const loadCommentCount = async () => {
      const count = await fetchTalkCommentCount(post.id);
      setCommentCount(count);
    };
    loadCommentCount();
  }, [post.id]);

  // 날짜 포맷 추가
  function formatKoreanDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${day} ${time}`;
  }

  return (
    <>
      <div
        onClick={() => navigate(`/lounge/talk/${post.id}`)}
        className="px-9 py-8 border-l border-l-[#7A9100] mb-6 bg-[#141414]/80"
      >
        <div className="wrapper">
          {/* 유저 정보, 게시글 등록 시간 */}
          <div className="flex gap-[22px] items-center">
            <img
              src={post.profiles.avatar_url || profileImage}
              alt="유저프로필"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{post.profiles.username}</h3>
              <p className="text-[#696969] font-light text-sm">
                {formatKoreanDate(post.created_at)}
              </p>
            </div>
          </div>
          {/* 게시글 제목 */}
          <h3 className="my-6 font-medium">{post.title}</h3>
          {/* 게시글 내용 + 댓글수 + 좋아요수 */}
          <div className="flex justify-between items-end">
            {/* 게시글 내용 */}
            <p className="font-light text-sm whitespace-pre-line line-clamp-3">
              {post.content}
            </p>
            {/* 댓글수 + 좋아요수 */}
            <div className="flex gap-4">
              {/* 댓글수 */}
              <p className="inline-flex items-center">
                <MessageSquare size={16} />
                <span className="ml-2 text-[13px]">{commentCount}</span>
              </p>
              {/* 좋아요수 */}
              <p className="inline-flex items-center">
                <TalkLikeButton
                  postId={post.id}
                  initialCount={post.like_count}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
