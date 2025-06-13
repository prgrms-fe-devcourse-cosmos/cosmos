import { MessageSquare, Heart } from "lucide-react";
import { TalkPost } from "../../../types/talk";
import profileImage from "../../../assets/images/profile.svg";
import { NavLink } from "react-router-dom";

export default function TalkCard({ post }: { post: TalkPost }) {
  return (
    <NavLink to={`${post.id}`} key={post.id}>
      <div className="px-9 py-8 border-l border-l-[#7A9100] mb-6 bg-[#141414]/80">
        <div className="wrapper">
          {/* 유저 정보, 게시글 등록 시간 */}
          <div className="flex gap-[22px] items-center">
            <img
              src={post.profiles.avatar_url || profileImage}
              alt="유저프로필"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            {/* <div className="w-[40px] h-[40px] bg-amber-900 rounded-full"></div> */}
            <div>
              <h3 className="font-semibold">{post.profiles.username}</h3>
              <p className="text-[#696969] font-light text-sm">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          {/* 게시글 제목 */}
          <h3 className="my-6 font-medium">{post.title}</h3>
          {/* 게시글 내용 + 댓글수 + 좋아요수 */}
          <div className="flex justify-between items-end">
            {/* 게시글 내용 */}
            <p className="font-light text-sm whitespace-pre-line">
              {post.content}
            </p>
            {/* 댓글수 + 좋아요수 */}
            <div className="flex gap-4">
              {/* 댓글수 */}
              <p className="inline-flex items-center">
                <MessageSquare size={16} />
                <span className="ml-2 text-[13px]">10</span>
              </p>
              {/* 좋아요수 */}
              <p className="inline-flex items-center">
                <Heart size={15} className="text-[#D0F700]" />
                <span className="ml-2 text-[13px]">{post.like_count}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
