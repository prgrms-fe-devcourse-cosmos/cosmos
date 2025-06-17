import { useState } from 'react';
import { CommentType } from './RealtimeComments';
import { useNavigate } from 'react-router-dom';

export default function Comment({
  comment,
  isSender,
  onDelete,
  onUpdate,
}: {
  comment: CommentType;
  isSender: boolean;
  onDelete: () => void;
  onUpdate: (updatedContent: string) => void;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState<string>(comment.content);

  const navigate = useNavigate();
  const defaultAvatar = '/images/cosmos/alien.svg';

  const handleSaveUpdate = () => {
    if (!updatedContent.trim()) return;
    onUpdate(updatedContent.trim());
    setIsEditMode(false);
  };

  const handleCancelUpdate = () => {
    setUpdatedContent(comment.content);
    setIsEditMode(false);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  };

  return (
    <div className="px-2 mb-2">
      <div className="wrapper">
        {/* 유저정보 + 댓글 등록 날짜 + 수정 삭제 */}
        <div className="flex justify-between">
          {/* 유저정보 + 날짜 */}
          <div className="flex gap-4 items-center">
            {/* 유저아이콘 */}
            <img
              src={comment.profiles?.avatar_url || defaultAvatar}
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => {
                if (comment.profiles?.usercode) {
                  navigate(`/user/${comment.profiles.usercode}`);
                }
              }}
            />
            {/* 유저이름 + 날짜 */}
            <div>
              <h3 className="font-medium text-[13px] lg:text-[15px]">
                {comment.profiles?.username}
              </h3>
              <p className="text-[#696969] font-light text-[12px]">
                {formatDate(comment.created_at)}
              </p>
            </div>
          </div>

          {/* 수정/삭제 */}
          {isSender ? (
            <div className="text-[#909090] text-[12px]">
              {isEditMode ? (
                <>
                  <button
                    className="mr-2 md:mr-4 cursor-pointer hover:text-white "
                    onClick={handleSaveUpdate}
                  >
                    저장
                  </button>
                  <button
                    className="cursor-pointer hover:text-white"
                    onClick={handleCancelUpdate}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="mr-2 md:mr-4 cursor-pointer hover:text-white "
                    onClick={() => setIsEditMode(true)}
                  >
                    수정
                  </button>
                  <button
                    className="cursor-pointer hover:text-white"
                    onClick={onDelete}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* 댓글 내용 */}
        {isEditMode ? (
          <div className="w-full px-2 py-4">
            <input
              type="text"
              placeholder="댓글을 입력해주세요."
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              className="transition-all focus:outline-none border border-[color:var(--gray-300)] rounded-md px-3 py-2 text-sm md:text-[16px] w-full"
            />
          </div>
        ) : (
          <div className="w-full px-2 py-4 text-xs md:text-sm">
            {comment.content}
          </div>
        )}
      </div>
    </div>
  );
}
