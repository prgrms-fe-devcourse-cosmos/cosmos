import { LucideHeart, LucideMessageSquare } from "lucide-react";
import supabase from "../../utils/supabase";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function UserPostList({ posts }: { posts: Post[] | null }) {
  const [commentCounts, setCommentCounts] = useState<{ [key: number]: number }>(
    {}
  );

  // 날짜 포맷 함수
  const formatDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0];
  };

  // 중복 제거 및 최신순 정렬된 게시글 리스트
  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];
    const unique = posts.filter(
      (post, index, self) => self.findIndex((p) => p.id === post.id) === index
    );
    return unique.sort(
      (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
    );
  }, [posts]);

  // 댓글 수 불러오기
  useEffect(() => {
    const fetchCommentCounts = async () => {
      if (!filteredAndSortedPosts.length) return;

      const counts: { [key: number]: number } = {};

      const { data, error } = await supabase
        .from("comment")
        .select("post_id", { count: "exact", head: false });

      if (!error && data) {
        (data as { post_id: number }[]).forEach((comment) => {
          const postId = comment.post_id;
          counts[postId] = (counts[postId] || 0) + 1;
        });
        setCommentCounts(counts);
      }
    };

    fetchCommentCounts();
  }, [filteredAndSortedPosts]);

  return (
    <div className="flex flex-col gap-1 lg:gap-2 px-0 lg:px-[10px] py-4 lg:py-6">
      {filteredAndSortedPosts.length > 0 ? (
        filteredAndSortedPosts.map((post) => (
          <div className="flex justify-between px-1.5 py-1.5" key={post.id}>
            <div className="flex gap-3">
              {/* 게시글 제목 */}
              <span className="font-medium text-sm lg:text-[16px] max-w-[130px] md:max-w-[180px] lg:max-w-[280px] truncate">
                <Link
                  to={`/lounge/${post.post_type}/${post.id}`}
                  className="block overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {post.title}
                </Link>
              </span>
              {/* 댓글 갯수 */}
              <span className="flex gap-1 items-center text-xs text-[var(--gray-200)]">
                <LucideMessageSquare size={12} color="var(--gray-200)" />
                {commentCounts[post.id] ?? 0}
              </span>
            </div>

            <div className="flex items-center justify-between w-[45%] max-w-80">
              <div className="hidden md:flex text-sm justify-baseline items-center w-[15%] gap-1.5">
                <LucideHeart size={12} />
                <span>{post.like_count}</span>
              </div>
              <div className="text-xs md:text-sm text-center w-[45%]">
                {post.post_type === "talk" ? "Talk" : "Gallery"}
              </div>
              <div className="text-xs md:text-sm text-[var(--gray-200)] text-end">
                {formatDate(post.created_at)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-[var(--gray-200)] my-5">
          작성글이 없습니다.
        </div>
      )}
    </div>
  );
}
