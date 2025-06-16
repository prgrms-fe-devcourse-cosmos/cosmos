import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import { LucideHeart, LucideMessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function FollowerPostList({ posts }: { posts: Post[] | null }) {
  function converter(date: string) {
    const dateInput = new Date(date);
    const newDate = dateInput.toISOString();
    return newDate.substring(0, newDate.indexOf("T"));
  }

  return (
    <div className="flex flex-col gap-2">
      {posts &&
        posts.length > 0 &&
        posts
          .filter((item, index) => {
            return (
              posts.findIndex((e) => {
                return item.id === e.id;
              }) === index
            );
          })
          .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
          .map((post) => {
            const [commentCount, setCommentCount] = useState(0);
            useEffect(() => {
              supabase
                .from("comment")
                .select("*")
                .eq("post_id", post.id)
                .then((data) => setCommentCount(data.data!.length));
            }, [post]);
            return (
              <div className="flex justify-between" key={post.id}>
                <div className="flex gap-2">
                  <span>
                    <Link to={`/lounge/${post.post_type}/${post.id}`}>
                      {post.title}
                    </Link>
                  </span>
                  <span className="flex gap-1 items-center text-[12px] text-[var(--gray-200)]">
                    <LucideMessageSquare size="12" color="var(--gray-200)" />
                    {commentCount}
                  </span>
                </div>
                <div className="flex items-center justify-between w-[45%] max-w-80">
                  <div className="flex text-sm justify-baseline items-center w-[15%] gap-1.5">
                    <span>
                      <LucideHeart size={12} />
                    </span>
                    <span>{post.like_count}</span>
                  </div>
                  <div className="text-sm text-center w-[45%]">
                    {post.post_type === "talk" ? "Talk" : "Gallery"}
                  </div>
                  <div className="text-sm text-[var(--gray-200)] text-end">
                    {converter(post.created_at)}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}
