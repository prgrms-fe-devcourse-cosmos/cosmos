import Button from "../../common/Button";
import backIcon from "../../../assets/icons/back.svg";
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

export default function GalleryDetail() {
  const { postid } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<GalleryPost | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
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
    navigate(`/lounge/gallery/edit/${postid}`);
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

  return (
    <div className="w-[768px] min-h-[1120px] bg-[rgba(20,20,20,0.8)] flex flex-col gap-6 p-6 pl-8">
      <Button variant="back" onClick={() => window.history.back()}>
        <img src={backIcon} alt="뒤로가기" className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="w-[715px] min-h-[164px] flex flex-col">
        <div className="w-full h-[79px]">
          <div className="w-full h-[52px] flex justify-start items-center">
            {/* 프로필 */}
            <div className="flex items-center gap-3">
              <img
                src={profile?.avatar_url || profileimage}
                alt="프로필"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="flex flex-col justify-center h-full">
                <span className="font-medium text-lg">{profile?.username}</span>
                <span className="text-lg text-[#696969]">
                  {formatDateTime(post.created_at)}
                </span>
              </div>
            </div>
            <Menu
              onEdit={handleEdit}
              onDelete={handleDelete}
              className="ml-auto self-start mt-[-35px]"
            />
          </div>
        </div>

        <div className="w-[704px]">
          <div className="w-full min-h-[79px] text-[var(--white)] mt-3">
            {/* 제목 */}
            <div className="w-full min-h-[24px] mb-5">
              <h3 className="text-xl font-medium break-words">{post.title}</h3>
            </div>

            {/* 내용 */}
            <div className="w-full min-h-[19px]">
              <p className="text-base break-words whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-[470px] my-10">
          <img
            src={post.gallery_images?.image_url || textimage}
            alt={post.title}
            className="w-full h-full"
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
