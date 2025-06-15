import { useState } from "react";
import RealtimeComments, { CommentType } from "./RealtimeComments";

export default function LoungeComment({
  postId,
  userId,
  comments,
  likeButton,
}: {
  postId: string;
  userId: string;
  comments: CommentType[] | null;
  likeButton?: React.ReactNode;
}) {
  const [commentCount, setCommentCount] = useState(comments?.length ?? 0);
  return (
    <div>
      <div className="wrapper">
        {/* 댓글 카운트 + 좋아요 */}
        <div className="flex justify-between">
          <h3 className="mb-7 text-[#D0F700] font-medium">
            COMMENTS ({commentCount})
          </h3>
          {/* 좋아요버튼 */}
          {likeButton}
        </div>

        <RealtimeComments
          params={{ id: postId }}
          userId={userId}
          serverComments={comments}
          onCommentCountChange={setCommentCount}
        />
      </div>
    </div>
  );
}
