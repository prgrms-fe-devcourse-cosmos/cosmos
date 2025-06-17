import { MessageSquare } from 'lucide-react';
import { TalkPost } from '../../../types/talk';
import { useNavigate } from 'react-router-dom';
import TalkLikeButton from './TalkLikeButton';

export default function TalkCard({ post }: { post: TalkPost }) {
  const navigate = useNavigate();
  const profileImage = '/images/cosmos/alien.svg';

  // 날짜 포맷 추가
  function formatKoreanDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${day} ${time}`;
  }

  return (
    <>
      <div
        onClick={() => navigate(`/lounge/talk/${post.id}`)}
        className="px-9 py-7 md:py-8 border-l border-l-[#7A9100] mb-6 bg-[#141414]/80 cursor-pointer"
      >
        <div className="wrapper">
          {/* 유저 정보, 게시글 등록 시간 */}
          <div className="flex gap-4 md:gap-[22px] items-center">
            <img
              src={post.avatar_url || profileImage}
              alt="유저프로필"
              className="w-[36px] md:w-[40px] h-[36px] md:h-[40px] rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm md:text-[16px]">
                {post.username}
              </h3>
              <p className="text-[#696969] font-light text-[12px] md:text-sm">
                {formatKoreanDate(post.created_at!)}
              </p>
            </div>
          </div>
          {/* 게시글 제목 */}
          <h3 className="my-5 md:my-6 font-medium text-[13px] md:text-[16px]">
            {post.title}
          </h3>
          {/* 게시글 내용 + 댓글수 + 좋아요수 */}
          <div className="flex justify-between items-end gap-6">
            {/* 게시글 내용 */}
            <p className="font-light text-[11px] md:text-sm whitespace-pre-line line-clamp-3">
              {post.content}
            </p>
            {/* 댓글수 + 좋아요수 */}
            <div className="flex gap-3 md:gap-4">
              {/* 댓글수 */}
              <p className="flex gap-1 md:gap-2 items-center">
                <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-[13px] leading-none">
                  {post.comment_count}
                </span>
              </p>
              {/* 좋아요수 */}
              <p className="inline-flex items-center">
                <TalkLikeButton
                  postId={post.id!}
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
