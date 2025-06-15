import textimage from "../../../assets/images/default-logo.svg";
import profileimage from "../../../assets/images/profile.svg";
import Menu from "../../common/Menu";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GalleryPost } from "../../../types/gallery";
import { GalleryPosts } from "../../../api/gallery/gallerypost";
import supabase from "../../../utils/supabase";
import GalleryDetailSkeleton from "./GalleryDetailSkeleton";
import LoungeComment from "../../common/LoungeComment";
import { CommentType } from "../../common/RealtimeComments";
import { fetchCommentsByPostId } from "../../../api/comments";
import TalkLikeButton from "../talk/TalkLikeButton";
import FollowButton from "../../common/FollowButton";
import { useAuthStore } from "../../../stores/authStore";
import { ArrowLeft } from "lucide-react";

export default function GalleryDetail() {
  const { postid } = useParams();
  const navigate = useNavigate();
  const userData = useAuthStore((state) => state.userData);
  const [post, setPost] = useState<GalleryPost | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setCurrentUserId(user?.id ?? null);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!postid) return;

    const getComments = async () => {
      try {
        const comments = await fetchCommentsByPostId(parseInt(postid));
        setComments(comments);
      } catch (e) {
        console.error("gallery get Comments failed: ", e);
        setComments(null);
      }
    };
    getComments();
  }, [postid]);

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await GalleryPosts();
      const target = posts.find((p) => p.id === Number(postid));
      setPost(target ?? null);

      // 프로필 정보 가져오기
      if (target) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", target.profile_id)
          .single();

        if (error) {
          console.error("프로필 로드 실패:", error.message);
        } else {
          setProfile(data);
        }
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };

    fetchPost();
  }, [postid]);

  if (!post) {
    return;
  }

  if (isLoading) {
    return <GalleryDetailSkeleton />;
  }

  const handleEdit = () => {
    if (!postid) {
      alert("게시글 ID가 없습니다.");
      return;
    }
    navigate(`/lounge/gallery/${postid}/edit`);
  };

  const handleDelete = async () => {
    if (!postid) return;

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      // 스토리지에서 해당 post_id 폴더의 모든 파일 삭제
      const { data: fileList, error: listError } = await supabase.storage
        .from("gallery-images")
        .list(postid, {
          limit: 100,
          offset: 0,
        });

      if (listError) {
        console.error("파일 목록 조회 실패:", listError);
      } else if (fileList && fileList.length > 0) {
        // 파일이 있으면 삭제
        const filePaths = fileList.map((file) => `${postid}/${file.name}`);
        const { error: deleteStorageError } = await supabase.storage
          .from("gallery-images")
          .remove(filePaths);

        if (deleteStorageError) {
          console.error("스토리지 파일 삭제 실패:", deleteStorageError);
        }
      }

      // likes 삭제
      const { error: likesError } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", Number(postid));

      if (likesError) throw likesError;

      // gallery_images 삭제
      const { error: imagesError } = await supabase
        .from("gallery_images")
        .delete()
        .eq("post_id", Number(postid));

      if (imagesError) throw imagesError;

      // posts 삭제
      const { error: postError } = await supabase
        .from("posts")
        .delete()
        .eq("id", Number(postid));

      if (postError) throw postError;

      alert("게시글이 삭제되었습니다.");
      navigate("/lounge/gallery");
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  function formatDateTime(datetimeString: string) {
    const date = new Date(datetimeString);
    const formattedDate = `${date.getFullYear()}년 ${String(
      date.getMonth() + 1
    ).padStart(2, "0")}월 ${String(date.getDate()).padStart(2, "0")}일`;
    const formattedTime = date.toLocaleTimeString("ko-KR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  }

  const isOwner = userData?.id === post.profile_id;

  return (
    <div className="w-full min-h-fit bg-[rgba(20,20,20,0.8)] flex flex-col gap-6 p-4 sm:p-6 md:px-8">
      {/* 뒤로가기버튼 */}
      <div className="mb-1 sm:mb-3">
        <button
          type="button"
          className="font-yapari text-[#D0F700] py-4 cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 text-[#D0F700] cursor-pointer" /> BACK
        </button>
      </div>

      <div className="w-full max-w-[715px] mx-auto flex flex-col gap-6">
        {/* 프로필 영역 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={profile?.avatar_url || profileimage}
              alt="프로필"
              className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] rounded-full"
            />
            <div className="flex flex-col justify-center">
              <span className="font-medium text-sm sm:text-base lg:text-lg">
                {profile?.username}
              </span>
              <span className="text-xs sm:text-sm lg:text-lg text-[var(--gray-300)]">
                {formatDateTime(post.created_at)}
              </span>
            </div>
          </div>

          <div className="mt-1">
            {isOwner ? (
              <Menu
                onEdit={handleEdit}
                onDelete={handleDelete}
                className="-mt-2 -mr-4"
              />
            ) : (
              <FollowButton followingId={post.profile_id} />
            )}
          </div>
        </div>

        {/* 제목 + 내용 */}
        <div className="text-[var(--white)]">
          <h3 className="text-xl font-medium mb-4 break-words">{post.title}</h3>
          <p className="text-base whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>

        {/* 이미지 */}
        <div className="w-full aspect-[4/3] sm:aspect-[5/4] md:aspect-[3/2] lg:aspect-[16/9] flex justify-center items-center overflow-hidden">
          <img
            src={post.gallery_images?.image_url || textimage}
            alt={post.title}
            className="w-full h-full object-fill"
          />
        </div>
        <LoungeComment
          postId={postid!}
          userId={currentUserId!}
          comments={comments}
          likeButton={
            <TalkLikeButton postId={post.id!} initialCount={post.like_count} />
          }
        />
      </div>
    </div>
  );
}
