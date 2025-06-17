import { useNavigate } from "react-router-dom";
import heartfilledIcon from "../../../assets/icons/filled_heart.svg";
import GalleryLike from "./GalleryLike";
import supabase from "../../../utils/supabase";
import { GalleryPost, GalleryPostWithLike } from "../../../types/gallery";
import { useAuthStore } from "../../../stores/authStore";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface GalleryCardProps {
  post: GalleryPost;
  onLikeToggle: (updatedPost: GalleryPostWithLike) => void;
}

export default function GalleryCard({ post, onLikeToggle }: GalleryCardProps) {
  const navigate = useNavigate();
  const uid = useAuthStore((state) => state.userData?.id) ?? "";
  const thumbnail = post.gallery_images?.image_url || "";
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      if (!post.profile_id) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", post.profile_id)
        .single();

      if (error) {
        console.error("유저 이름 불러오기 오류:", error);
        return;
      }

      setUsername(data?.username ?? "");
    };

    fetchUsername();
  }, [post.profile_id]);

  return (
    <>
      <div
        onClick={() => navigate(`/lounge/gallery/${post.id}`)}
        className="w-full h-full lg:w-[356px] flex flex-col cursor-pointer  transform transition duration-300 hover:shadow-lg hover:scale-[1.02]"
      >
        <div className="w-full h-[227px] overflow-hidden">
          <img
            src={thumbnail}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="pt-[21px] pb-[21px] px-[16px] flex flex-col justify-between gap-[4px] text-[var(--white)] 
        bg-[rgba(255,255,255,0.09)] border-r-[1px] border-b-[1px] border-l-[1px] border-[rgba(255,255,255,0.1)]"
        >
          <h3 className="text-white text-[13px] sm:text-[16px] truncate font-medium">
            {post.title}
          </h3>
          <p className="text-xs md:text-sm truncate">Photo by. {username}</p>
          <div className="flex justify-between">
            <p className="text-[10px] md:text-xs text-[#909090] pt-[1px]">
              {new Date(post.created_at).toLocaleDateString("ko-KR")}
            </p>
            <div className="text-[10px] flex gap-2 items-center">
              <GalleryLike
                postId={post.id}
                profileId={uid || ""}
                initialLiked={post.liked}
                initialCount={post.like_count}
                IconLiked={
                  <img
                    src={heartfilledIcon}
                    alt="좋아요됨"
                    className="w-[10px] sm:w-3 h-[10px] sm:h-3"
                  />
                }
                IconNotLiked={
                  <div>
                    <Heart className="w-[10px] sm:w-3 h-[10px] sm:h-3 text-[color:var(--primary-300)]" />
                  </div>
                }
                onToggle={(updatedLikeCount, liked) => {
                  onLikeToggle({
                    ...post,
                    like_count: updatedLikeCount,
                    liked,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
